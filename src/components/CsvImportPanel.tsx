import React, { useState, useRef } from 'react';
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
} from 'lucide-react';
import { AuditTransaction, LeakageCategory } from './TransactionAuditSuite';

interface CsvImportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTransactions: (newDeals: AuditTransaction[], brokerageLabel?: string) => void;
}

const SAMPLE_CSV_TEMPLATE = `Property Address,City State,Closing Date,Agent Name,Split Plan,Sale Price,Commission %,Expected Payout,Actual Wire,Issue Category,Audit Note
"1042 Mockingbird Ln","Austin, TX","2026-11-05","Claire Bennett","80/20 (Capped)",720000,3.0,21600,17280,"Post-Cap / Split Overpayment","Agent reached annual cap; 20% split was deducted in error."
"3390 Collins Ave #8A","Miami Beach, FL","2026-11-02","Devon Brooks","Outbound Referral (25%)",880000,3.0,6600,0,"Uncollected Referral Fee","Signed 25% referral agreement closed; incoming wire overdue."
"512 Camelback Rd","Phoenix, AZ","2026-10-29","Hannah Lin","85/15 Team Split",615000,2.75,14376,12150,"CD / Settlement Underpayment","Escrow disbursed 2.32% instead of 2.75% per executed DA."
"890 Peachtree St","Atlanta, GA","2026-10-26","Tyler Grant","80/20 Standard",495000,3.0,11880,11880,"Verified Clean","Settlement reconciled cleanly against DA."`;

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export const CsvImportPanel: React.FC<CsvImportPanelProps> = ({
  isOpen,
  onClose,
  onImportTransactions,
}) => {
  const [rawCsv, setRawCsv] = useState<string>('');
  const [brokerageName, setBrokerageName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Zed-Automation-Sample-Closings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setRawCsv(text);
      }
    };
    reader.readAsText(file);
  };

  const handleProcessCsv = () => {
    setError(null);
    const lines = rawCsv
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      setError('Please upload a CSV file or paste at least 1 header row and 1 deal row.');
      return;
    }

    const parsedDeals: AuditTransaction[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 7) continue;

      const propertyAddress = cols[0] || `Imported Property #${i}`;
      const cityState = cols[1] || 'Austin, TX';
      const closingDate = cols[2] || new Date().toISOString().split('T')[0];
      const agentName = cols[3] || 'Roster Agent';
      const splitPlan = cols[4] || '80/20 Standard';
      const salePrice = Number(cols[5]?.replace(/[^0-9.-]+/g, '')) || 500000;
      const commissionRate = Number(cols[6]?.replace(/[^0-9.-]+/g, '')) || 3.0;
      const grossGci = Math.round(salePrice * (commissionRate / 100));

      const expectedNetPayout =
        cols[7] !== undefined && cols[7] !== ''
          ? Number(cols[7].replace(/[^0-9.-]+/g, ''))
          : Math.round(grossGci * 0.8);

      const actualWireReceived =
        cols[8] !== undefined && cols[8] !== ''
          ? Number(cols[8].replace(/[^0-9.-]+/g, ''))
          : expectedNetPayout;

      const leakageAmount = Math.max(0, expectedNetPayout - actualWireReceived);

      const rawCategory = cols[9] as LeakageCategory;
      const validCategories: LeakageCategory[] = [
        'Post-Cap / Split Overpayment',
        'Uncollected Referral Fee',
        'CD / Settlement Underpayment',
        'Verified Clean',
      ];

      const category: LeakageCategory =
        leakageAmount === 0
          ? 'Verified Clean'
          : validCategories.includes(rawCategory)
          ? rawCategory
          : 'CD / Settlement Underpayment';

      const auditNote =
        cols[10] ||
        (leakageAmount > 0
          ? `CSV Audit flagged a $${leakageAmount.toLocaleString()} discrepancy between expected DA payout and actual wire.`
          : 'CSV import verified: settlement wire matches expected payout.');

      parsedDeals.push({
        id: `CSV-${1000 + i}`,
        propertyAddress,
        cityState,
        closingDate,
        agentName,
        splitPlan,
        salePrice,
        commissionRate,
        grossGci,
        expectedNetPayout,
        actualWireReceived,
        leakageAmount,
        category,
        status: leakageAmount > 0 ? 'Flagged' : 'Clean',
        auditNote,
        sourceSystem: 'CSV Batch Import',
      });
    }

    if (parsedDeals.length === 0) {
      setError('No valid transaction rows could be parsed. Try downloading our sample CSV template first.');
      return;
    }

    onImportTransactions(parsedDeals, brokerageName.trim() || undefined);
    setRawCsv('');
    setFileName(null);
    onClose();
  };

  return (
    <div className="mb-8 p-6 rounded-2xl bg-[#111520] border border-emerald-500/30 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Batch Back-Office CSV Importer</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Upload SkySlope, Dotloop, Brokermint, or Excel Closings (.CSV)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download Sample CSV</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Brokerage / Client Label (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Summit Realty Group — Q4 Audit"
              value={brokerageName}
              onChange={(e) => setBrokerageName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/15 hover:border-emerald-500/50 rounded-2xl p-6 text-center cursor-pointer bg-[#080A0F]/60 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">
              {fileName ? fileName : 'Click to select a .CSV closing export'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              100% client-side processing — your data never leaves your browser
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRawCsv(SAMPLE_CSV_TEMPLATE)}
            className="w-full py-2 px-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Load Sample Brokerage CSV Data into Editor</span>
          </button>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Raw CSV Preview / Paste Export Directly
          </label>
          <textarea
            rows={7}
            value={rawCsv}
            onChange={(e) => setRawCsv(e.target.value)}
            placeholder="Paste CSV rows here or click 'Load Sample Brokerage CSV Data' on the left..."
            className="w-full flex-1 p-3.5 rounded-xl bg-[#080A0F] border border-white/10 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
          />

          {error && (
            <div className="mt-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleProcessCsv}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Scan & Import Transactions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
