import React, { useState, useMemo, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Plus,
  Download,
  CheckCircle2,
  AlertTriangle,
  Eye,
  X,
  ArrowUpRight,
  FileSpreadsheet,
  Sparkles,
  Check,
  Upload,
  FileText,
  Building2,
  RotateCcw,
} from 'lucide-react';
import { CsvImportPanel } from './CsvImportPanel';
import { PdfReportDialog } from './PdfReportDialog';

export type LeakageCategory =
  | 'Post-Cap / Split Overpayment'
  | 'Uncollected Referral Fee'
  | 'CD / Settlement Underpayment'
  | 'Verified Clean';

export interface AuditTransaction {
  id: string;
  propertyAddress: string;
  cityState: string;
  closingDate: string;
  agentName: string;
  splitPlan: string;
  salePrice: number;
  commissionRate: number;
  grossGci: number;
  expectedNetPayout: number;
  actualWireReceived: number;
  leakageAmount: number;
  category: LeakageCategory;
  status: 'Flagged' | 'Recovered' | 'Clean';
  auditNote: string;
  sourceSystem: string;
}

export interface BrokerageWorkspace {
  id: string;
  name: string;
  state: string;
  crm: string;
  transactions: AuditTransaction[];
}

const DEFAULT_WORKSPACES: BrokerageWorkspace[] = [
  {
    id: 'ws-lone-star',
    name: 'Lone Star Premier Realty (Sample)',
    state: 'TX',
    crm: 'SkySlope + Follow Up Boss',
    transactions: [
      {
        id: 'TX-9041',
        propertyAddress: '742 Evergreen Terrace',
        cityState: 'Austin, TX',
        closingDate: '2026-10-28',
        agentName: 'Sarah Jenkins',
        splitPlan: '80/20 (Capped Oct 12)',
        salePrice: 685000,
        commissionRate: 3.0,
        grossGci: 20550,
        expectedNetPayout: 20550,
        actualWireReceived: 16440,
        leakageAmount: 4110,
        category: 'Post-Cap / Split Overpayment',
        status: 'Flagged',
        auditNote:
          'Agent hit $18,000 annual brokerage cap on Oct 12. Title company still deducted 20% house split ($4,110) on the Closing Disclosure.',
        sourceSystem: 'SkySlope + ALTA CD',
      },
      {
        id: 'TX-9038',
        propertyAddress: '1904 Brickell Ave #14B',
        cityState: 'Miami, FL',
        closingDate: '2026-10-24',
        agentName: 'Marcus Vance',
        splitPlan: 'Outbound Referral (25%)',
        salePrice: 920000,
        commissionRate: 3.0,
        grossGci: 27600,
        expectedNetPayout: 6900,
        actualWireReceived: 0,
        leakageAmount: 6900,
        category: 'Uncollected Referral Fee',
        status: 'Flagged',
        auditNote:
          'Signed referral agreement executed Aug 14 with receiving Miami brokerage. Property closed 21 days ago; referral wire never arrived.',
        sourceSystem: 'Follow Up Boss + Referral Log',
      },
      {
        id: 'TX-9032',
        propertyAddress: '8820 E Pinnacle Peak Rd',
        cityState: 'Scottsdale, AZ',
        closingDate: '2026-10-19',
        agentName: 'Elena Rostova',
        splitPlan: '85/15 Team Split',
        salePrice: 1150000,
        commissionRate: 2.75,
        grossGci: 31625,
        expectedNetPayout: 26881,
        actualWireReceived: 23431,
        leakageAmount: 3450,
        category: 'CD / Settlement Underpayment',
        status: 'Flagged',
        auditNote:
          'Disbursement Authorization (DA) listed 2.75% listing commission, but escrow funded at 2.45% due to unapproved seller credit reduction.',
        sourceSystem: 'Brokermint + Title Wire',
      },
      {
        id: 'TX-9027',
        propertyAddress: '415 Peachtree Battle Ave',
        cityState: 'Atlanta, GA',
        closingDate: '2026-10-15',
        agentName: 'David Thorne',
        splitPlan: '80/20 Standard',
        salePrice: 540000,
        commissionRate: 3.0,
        grossGci: 16200,
        expectedNetPayout: 12960,
        actualWireReceived: 12960,
        leakageAmount: 0,
        category: 'Verified Clean',
        status: 'Clean',
        auditNote:
          'Settlement statement matches Disbursement Authorization and agent split tier to the penny.',
        sourceSystem: 'Dotloop + Bank Feed',
      },
      {
        id: 'TX-9021',
        propertyAddress: '2310 Cedar Springs Rd',
        cityState: 'Dallas, TX',
        closingDate: '2026-10-11',
        agentName: 'Jessica Chen',
        splitPlan: 'Outbound Referral (30%)',
        salePrice: 610000,
        commissionRate: 3.0,
        grossGci: 18300,
        expectedNetPayout: 5490,
        actualWireReceived: 0,
        leakageAmount: 5490,
        category: 'Uncollected Referral Fee',
        status: 'Flagged',
        auditNote:
          'Relocation buyer closed on MLS #20491822. Receiving agent did not attach W-9 / referral invoice at closing table.',
        sourceSystem: 'MLS Sync + Referral Tracker',
      },
      {
        id: 'TX-9014',
        propertyAddress: '1180 S Beverly Glen Blvd',
        cityState: 'Los Angeles, CA',
        closingDate: '2026-10-06',
        agentName: 'Ryan Callahan',
        splitPlan: '90/10 Top Producer',
        salePrice: 1420000,
        commissionRate: 2.5,
        grossGci: 35500,
        expectedNetPayout: 31950,
        actualWireReceived: 29820,
        leakageAmount: 2130,
        category: 'Post-Cap / Split Overpayment',
        status: 'Flagged',
        auditNote:
          '6% franchise royalty fee was charged twice on both the gross GCI and net team split.',
        sourceSystem: 'LoneWolf + CD Audit',
      },
      {
        id: 'TX-9009',
        propertyAddress: '509 Lake Shore Dr',
        cityState: 'Chicago, IL',
        closingDate: '2026-10-02',
        agentName: 'Sarah Jenkins',
        splitPlan: '80/20 Standard',
        salePrice: 475000,
        commissionRate: 2.75,
        grossGci: 13063,
        expectedNetPayout: 10450,
        actualWireReceived: 10450,
        leakageAmount: 0,
        category: 'Verified Clean',
        status: 'Clean',
        auditNote: 'All wire amounts, admin fees, and split tiers reconciled.',
        sourceSystem: 'SkySlope + Bank Feed',
      },
    ],
  },
  {
    id: 'ws-coastal-luxury',
    name: 'Coastal Luxury Group (Sample)',
    state: 'FL',
    crm: 'Dotloop + KVCore',
    transactions: [
      {
        id: 'FL-4410',
        propertyAddress: '2800 N Ocean Blvd',
        cityState: 'Fort Lauderdale, FL',
        closingDate: '2026-11-01',
        agentName: 'Victoria Sterling',
        splitPlan: '90/10 Luxury Tier',
        salePrice: 1850000,
        commissionRate: 3.0,
        grossGci: 55500,
        expectedNetPayout: 49950,
        actualWireReceived: 44400,
        leakageAmount: 5550,
        category: 'Post-Cap / Split Overpayment',
        status: 'Flagged',
        auditNote:
          'Escrow applied legacy 80/20 split instead of renewed 90/10 tier effective Q4.',
        sourceSystem: 'Dotloop + Wire Feed',
      },
      {
        id: 'FL-4404',
        propertyAddress: '614 Banyan Rd',
        cityState: 'Naples, FL',
        closingDate: '2026-10-22',
        agentName: 'Carlos Mendez',
        splitPlan: 'Outbound Referral (30%)',
        salePrice: 1290000,
        commissionRate: 2.5,
        grossGci: 32250,
        expectedNetPayout: 9675,
        actualWireReceived: 0,
        leakageAmount: 9675,
        category: 'Uncollected Referral Fee',
        status: 'Flagged',
        auditNote:
          'Snowbird referral closed with partner brokerage; incoming check never logged.',
        sourceSystem: 'KVCore Referral Log',
      },
      {
        id: 'FL-4398',
        propertyAddress: '920 Las Olas Cir',
        cityState: 'Fort Lauderdale, FL',
        closingDate: '2026-10-14',
        agentName: 'Victoria Sterling',
        splitPlan: '90/10 Luxury Tier',
        salePrice: 960000,
        commissionRate: 3.0,
        grossGci: 28800,
        expectedNetPayout: 25920,
        actualWireReceived: 25920,
        leakageAmount: 0,
        category: 'Verified Clean',
        status: 'Clean',
        auditNote: 'DA and wire match 100%.',
        sourceSystem: 'Dotloop + Wire Feed',
      },
    ],
  },
];

const STORAGE_KEY = 'zed_automation_audit_workspaces_v25';

interface TransactionAuditSuiteProps {
  onOpenAsyncModal: (prefillLeakage?: number) => void;
}

export const TransactionAuditSuite: React.FC<TransactionAuditSuiteProps> = ({
  onOpenAsyncModal,
}) => {
  const [workspaces, setWorkspaces] = useState<BrokerageWorkspace[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to default workspaces
    }
    return DEFAULT_WORKSPACES;
  });

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(
    DEFAULT_WORKSPACES[0].id
  );
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTx, setSelectedTx] = useState<AuditTransaction | null>(null);
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [showCsvImporter, setShowCsvImporter] = useState<boolean>(false);
  const [showPdfReport, setShowPdfReport] = useState<boolean>(false);
  const [showNewClientForm, setShowNewClientForm] = useState<boolean>(false);
  const [newBrokerageName, setNewBrokerageName] = useState<string>('');
  const [newBrokerageState, setNewBrokerageState] = useState<string>('TX');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaces));
    } catch {
      // Ignore storage quota errors
    }
  }, [workspaces]);

  const activeWorkspace = useMemo(() => {
    return (
      workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0]
    );
  }, [workspaces, activeWorkspaceId]);

  const transactions = activeWorkspace.transactions;

  const updateActiveTransactions = (
    updater: (prev: AuditTransaction[]) => AuditTransaction[]
  ) => {
    setWorkspaces((prev) =>
      prev.map((ws) =>
        ws.id === activeWorkspace.id
          ? { ...ws, transactions: updater(ws.transactions) }
          : ws
      )
    );
  };

  // Simulator form state
  const [simAddress, setSimAddress] = useState('1450 Ocean Blvd, Boca Raton, FL');
  const [simPrice, setSimPrice] = useState('750000');
  const [simRate, setSimRate] = useState('3.0');
  const [simExpectedSplit, setSimExpectedSplit] = useState('85');
  const [simActualPaid, setSimActualPaid] = useState('16200');
  const [simIssueType, setSimIssueType] = useState<LeakageCategory>(
    'Post-Cap / Split Overpayment'
  );

  const metrics = useMemo(() => {
    const totalVolume = transactions.reduce((sum, tx) => sum + tx.salePrice, 0);
    const totalGci = transactions.reduce((sum, tx) => sum + tx.grossGci, 0);
    const flaggedLeakage = transactions
      .filter((tx) => tx.status === 'Flagged')
      .reduce((sum, tx) => sum + tx.leakageAmount, 0);
    const recoveredAmount = transactions
      .filter((tx) => tx.status === 'Recovered')
      .reduce((sum, tx) => sum + tx.leakageAmount, 0);
    const flaggedCount = transactions.filter((tx) => tx.status === 'Flagged').length;

    return {
      totalVolume,
      totalGci,
      flaggedLeakage,
      recoveredAmount,
      flaggedCount,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.cityState.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'FLAGGED') return tx.status === 'Flagged';
      if (activeFilter === 'SPLIT')
        return tx.category === 'Post-Cap / Split Overpayment';
      if (activeFilter === 'REFERRAL')
        return tx.category === 'Uncollected Referral Fee';
      if (activeFilter === 'CD')
        return tx.category === 'CD / Settlement Underpayment';
      return true;
    });
  }, [transactions, activeFilter, searchQuery]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  const handleMarkRecovered = (id: string) => {
    updateActiveTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: 'Recovered' } : tx))
    );
    if (selectedTx && selectedTx.id === id) {
      setSelectedTx({ ...selectedTx, status: 'Recovered' });
    }
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrokerageName.trim()) return;
    const newId = `ws-${Date.now()}`;
    const created: BrokerageWorkspace = {
      id: newId,
      name: newBrokerageName.trim(),
      state: newBrokerageState.trim() || 'US',
      crm: 'SkySlope / CSV Import',
      transactions: [...DEFAULT_WORKSPACES[0].transactions.slice(0, 3)],
    };
    setWorkspaces((prev) => [created, ...prev]);
    setActiveWorkspaceId(newId);
    setNewBrokerageName('');
    setShowNewClientForm(false);
  };

  const handleResetDemoData = () => {
    setWorkspaces(DEFAULT_WORKSPACES);
    setActiveWorkspaceId(DEFAULT_WORKSPACES[0].id);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleAddSimulatedDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Math.max(50000, Number(simPrice) || 500000);
    const rate = Math.max(0.5, Math.min(10, Number(simRate) || 3));
    const splitPct = Math.max(10, Math.min(100, Number(simExpectedSplit) || 80));
    const actualPaid = Math.max(0, Number(simActualPaid) || 0);

    const grossGci = Math.round(price * (rate / 100));
    const expectedNetPayout = Math.round(grossGci * (splitPct / 100));
    const leakageAmount = Math.max(0, expectedNetPayout - actualPaid);

    const parts = simAddress.split(',');
    const addressLine = parts[0]?.trim() || simAddress;
    const cityStateLine = parts.slice(1).join(',').trim() || 'Miami, FL';

    const newTx: AuditTransaction = {
      id: `TX-${Math.floor(9050 + Math.random() * 900)}`,
      propertyAddress: addressLine,
      cityState: cityStateLine,
      closingDate: new Date().toISOString().split('T')[0],
      agentName: 'Simulated Agent',
      splitPlan: `${splitPct}/${100 - splitPct} Custom Tier`,
      salePrice: price,
      commissionRate: rate,
      grossGci,
      expectedNetPayout,
      actualWireReceived: actualPaid,
      leakageAmount,
      category: leakageAmount > 0 ? simIssueType : 'Verified Clean',
      status: leakageAmount > 0 ? 'Flagged' : 'Clean',
      auditNote:
        leakageAmount > 0
          ? `Simulated audit flagged a $${leakageAmount.toLocaleString()} variance between expected payout (${formatCurrency(
              expectedNetPayout
            )}) and settlement wire (${formatCurrency(actualPaid)}).`
          : 'Simulated transaction payout matches expected split structure.',
      sourceSystem: 'Live Sandbox Simulator',
    };

    updateActiveTransactions((prev) => [newTx, ...prev]);
    setShowSimulator(false);
    setSelectedTx(newTx);
  };

  const handleImportCsvDeals = (
    importedDeals: AuditTransaction[],
    brokerageLabel?: string
  ) => {
    if (brokerageLabel) {
      const newId = `ws-${Date.now()}`;
      const newWs: BrokerageWorkspace = {
        id: newId,
        name: brokerageLabel,
        state: 'US',
        crm: 'CSV Batch Import',
        transactions: importedDeals,
      };
      setWorkspaces((prev) => [newWs, ...prev]);
      setActiveWorkspaceId(newId);
    } else {
      updateActiveTransactions((prev) => [...importedDeals, ...prev]);
    }
  };

  const handleDownloadCsv = () => {
    const headers = [
      'Transaction ID',
      'Property Address',
      'City/State',
      'Closing Date',
      'Agent',
      'Split Plan',
      'Sale Price',
      'Gross GCI',
      'Expected Payout',
      'Actual Wire',
      'Leaked Amount',
      'Issue Category',
      'Status',
    ];

    const rows = transactions.map((tx) => [
      tx.id,
      `"${tx.propertyAddress}"`,
      `"${tx.cityState}"`,
      tx.closingDate,
      `"${tx.agentName}"`,
      `"${tx.splitPlan}"`,
      tx.salePrice,
      tx.grossGci,
      tx.expectedNetPayout,
      tx.actualWireReceived,
      tx.leakageAmount,
      `"${tx.category}"`,
      tx.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${activeWorkspace.name.replace(/[^a-z0-9]/gi, '-')}-Audit-Report.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="audit-engine"
      className="py-24 bg-[#080A0F] border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zed Audit Suite v2.5 • Full Client-Side Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Live CD/ALTA & Referral Leakage Detector
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-base">
              Switch between sample brokerages, import your own SkySlope/Dotloop CSV batch, simulate custom deal math, or generate an Executive PDF Report—zero login required.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setShowCsvImporter(!showCsvImporter);
                setShowSimulator(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-sm font-medium transition-colors"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Import CSV</span>
            </button>
            <button
              onClick={() => {
                setShowSimulator(!showSimulator);
                setShowCsvImporter(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Simulate Deal</span>
            </button>
            <button
              onClick={() => setShowPdfReport(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>PDF Report</span>
            </button>
            <button
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Brokerage / Client Workspace Selector Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-[#111520] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>Active Brokerage Profile:</span>
            </div>
            <select
              value={activeWorkspace.id}
              onChange={(e) => setActiveWorkspaceId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#080A0F] border border-white/15 text-sm font-medium text-white focus:outline-none focus:border-indigo-500"
            >
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name} ({ws.state}) — {ws.transactions.length} Deals
                </option>
              ))}
            </select>
            <span className="hidden md:inline-block text-xs text-slate-500 font-mono">
              Stack: {activeWorkspace.crm}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowNewClientForm(!showNewClientForm)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Brokerage Profile</span>
            </button>
            <button
              type="button"
              onClick={handleResetDemoData}
              title="Reset sample workspaces"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Inline New Brokerage Form */}
        {showNewClientForm && (
          <form
            onSubmit={handleCreateWorkspace}
            className="mb-6 p-4 rounded-xl bg-[#111520] border border-indigo-500/30 flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="text"
              required
              placeholder="Enter Brokerage or Team Name (e.g. Compass Austin Team)"
              value={newBrokerageName}
              onChange={(e) => setNewBrokerageName(e.target.value)}
              className="flex-1 w-full px-3.5 py-2 rounded-lg bg-[#080A0F] border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              maxLength={4}
              placeholder="State (TX)"
              value={newBrokerageState}
              onChange={(e) => setNewBrokerageState(e.target.value.toUpperCase())}
              className="w-full sm:w-24 px-3.5 py-2 rounded-lg bg-[#080A0F] border border-white/10 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Create Workspace
            </button>
          </form>
        )}

        {/* Batch CSV Importer Panel */}
        <CsvImportPanel
          isOpen={showCsvImporter}
          onClose={() => setShowCsvImporter(false)}
          onImportTransactions={handleImportCsvDeals}
        />

        {/* Inline Deal Simulator Form */}
        {showSimulator && (
          <form
            onSubmit={handleAddSimulatedDeal}
            className="mb-8 p-6 rounded-2xl bg-[#111520] border border-indigo-500/30 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                Test Custom Closing Disclosure vs. Expected Payout
              </h3>
              <button
                type="button"
                onClick={() => setShowSimulator(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Property & City/State
                </label>
                <input
                  type="text"
                  value={simAddress}
                  onChange={(e) => setSimAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080A0F] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Sale Price ($)
                </label>
                <input
                  type="number"
                  value={simPrice}
                  onChange={(e) => setSimPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080A0F] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Commission %
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={simRate}
                  onChange={(e) => setSimRate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080A0F] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Expected Split %
                </label>
                <input
                  type="number"
                  value={simExpectedSplit}
                  onChange={(e) => setSimExpectedSplit(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080A0F] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Actual Wire Paid ($)
                </label>
                <input
                  type="number"
                  value={simActualPaid}
                  onChange={(e) => setSimActualPaid(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080A0F] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Leakage Vector:</span>
                <select
                  value={simIssueType}
                  onChange={(e) =>
                    setSimIssueType(e.target.value as LeakageCategory)
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#080A0F] border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Post-Cap / Split Overpayment">
                    Post-Cap / Split Overpayment
                  </option>
                  <option value="Uncollected Referral Fee">
                    Uncollected Referral Fee
                  </option>
                  <option value="CD / Settlement Underpayment">
                    CD / Settlement Underpayment
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors"
              >
                Run Instant Audit Check →
              </button>
            </div>
          </form>
        )}

        {/* Top KPI Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-[#111520] border border-white/10">
            <div className="text-xs font-mono uppercase text-slate-400">
              Audited Closing Volume
            </div>
            <div className="mt-2 text-2xl font-bold font-mono text-white">
              {formatCurrency(metrics.totalVolume)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Across {transactions.length} closed transactions
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#111520] border border-white/10">
            <div className="text-xs font-mono uppercase text-slate-400">
              Total Gross GCI Reviewed
            </div>
            <div className="mt-2 text-2xl font-bold font-mono text-slate-200">
              {formatCurrency(metrics.totalGci)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Verified against DA & ALTA statements
            </div>
          </div>

          <div className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20">
            <div className="text-xs font-mono uppercase text-rose-400 flex items-center justify-between">
              <span>Active Commission Leakage</span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono text-rose-400">
              -{formatCurrency(metrics.flaggedLeakage)}
            </div>
            <div className="mt-1 text-xs text-rose-300/70">
              Flagged across {metrics.flaggedCount} unresolved files
            </div>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="text-xs font-mono uppercase text-emerald-400 flex items-center justify-between">
              <span>Recovered in Sandbox</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono text-emerald-400">
              +{formatCurrency(metrics.recoveredAmount)}
            </div>
            <div className="mt-1 text-xs text-emerald-300/70">
              Click "Inspect Math" below to recover
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-t-2xl bg-[#111520] border border-b-0 border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: `All Deals (${transactions.length})` },
              {
                id: 'FLAGGED',
                label: `Flagged Leaks (${
                  transactions.filter((t) => t.status === 'Flagged').length
                })`,
              },
              { id: 'SPLIT', label: 'Split / Cap Errors' },
              { id: 'REFERRAL', label: 'Uncollected Referrals' },
              { id: 'CD', label: 'CD Shortfalls' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search address, agent, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#080A0F] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Interactive Transactions Table */}
        <div className="overflow-x-auto rounded-b-2xl bg-[#111520] border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400 bg-black/20">
                <th className="py-3.5 px-4">Deal ID & Property</th>
                <th className="py-3.5 px-4">Agent & Split Tier</th>
                <th className="py-3.5 px-4 text-right">Expected Payout</th>
                <th className="py-3.5 px-4 text-right">Actual Wire</th>
                <th className="py-3.5 px-4">Audit Finding</th>
                <th className="py-3.5 px-4 text-right">Variance</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-indigo-400">
                        {tx.id}
                      </span>
                      <span className="font-medium text-white">
                        {tx.propertyAddress}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {tx.cityState} • Closed {tx.closingDate}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-slate-200 font-medium">
                      {tx.agentName}
                    </div>
                    <div className="text-xs text-slate-500">{tx.splitPlan}</div>
                  </td>

                  <td className="py-4 px-4 text-right font-mono text-slate-300">
                    {formatCurrency(tx.expectedNetPayout)}
                  </td>

                  <td className="py-4 px-4 text-right font-mono text-slate-300">
                    {formatCurrency(tx.actualWireReceived)}
                  </td>

                  <td className="py-4 px-4">
                    {tx.status === 'Flagged' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {tx.category}
                      </span>
                    )}
                    {tx.status === 'Recovered' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Recovered ({tx.category})
                      </span>
                    )}
                    {tx.status === 'Clean' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-500/10 text-slate-400 border border-white/10">
                        <Check className="w-3.5 h-3.5" />
                        Verified Clean
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right font-mono font-semibold">
                    {tx.leakageAmount > 0 ? (
                      <span
                        className={
                          tx.status === 'Recovered'
                            ? 'text-emerald-400 line-through opacity-75'
                            : 'text-rose-400'
                        }
                      >
                        -{formatCurrency(tx.leakageAmount)}
                      </span>
                    ) : (
                      <span className="text-slate-500">$0</span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedTx(tx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Math</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Async Conversion Callout inside Tool */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#111520] to-indigo-500/10 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Want Us to Run This Exact Audit on Your Last 90 Days of Closings?
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              No 30-minute Zoom sales calls. Drop an anonymized CSV export from SkySlope, Dotloop, or Brokermint and receive your written discrepancy report via Email or Text within 24 hours.
            </p>
          </div>
          <button
            onClick={() => onOpenAsyncModal(metrics.flaggedLeakage)}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            <span>Request Free 90-Day Written Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Executive PDF / Written Report Modal */}
      <PdfReportDialog
        isOpen={showPdfReport}
        onClose={() => setShowPdfReport(false)}
        brokerageName={activeWorkspace.name}
        transactions={transactions}
        onRequestAsyncFullAudit={onOpenAsyncModal}
      />

      {/* Line-by-Line Audit Inspection Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-[#111520] border border-white/15 p-6 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-indigo-400">
                  AUDIT FILE #{selectedTx.id} • {selectedTx.sourceSystem}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedTx.propertyAddress}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedTx.cityState} • Agent: {selectedTx.agentName} (
                  {selectedTx.splitPlan})
                </p>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 space-y-3 font-mono text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Contract Sale Price:</span>
                <span className="text-white">
                  {formatCurrency(selectedTx.salePrice)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">
                  Gross Commission ({selectedTx.commissionRate}%):
                </span>
                <span className="text-white">
                  {formatCurrency(selectedTx.grossGci)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">
                  Expected Brokerage/Agent Payout:
                </span>
                <span className="text-emerald-400">
                  {formatCurrency(selectedTx.expectedNetPayout)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">
                  Actual Settlement / Wire Received:
                </span>
                <span className="text-slate-200">
                  {formatCurrency(selectedTx.actualWireReceived)}
                </span>
              </div>
              <div className="flex justify-between py-2.5 px-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-300 font-semibold">
                  Net Detected Discrepancy:
                </span>
                <span className="text-rose-400 font-bold">
                  -{formatCurrency(selectedTx.leakageAmount)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-slate-300 mb-6">
              <div className="text-xs font-mono uppercase text-slate-500 mb-1">
                Automated Audit Engine Diagnosis
              </div>
              {selectedTx.auditNote}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium"
              >
                Close
              </button>
              {selectedTx.status === 'Flagged' && (
                <button
                  onClick={() => handleMarkRecovered(selectedTx.id)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Flag & Mark as Recovered</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
