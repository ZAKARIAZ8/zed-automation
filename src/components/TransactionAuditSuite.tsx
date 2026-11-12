import React, { useState } from 'react';
import {
  Download,
  PlusCircle,
  Search,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  X,
  FileSpreadsheet,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  AuditedTransaction,
  INITIAL_TRANSACTIONS,
  calculateAuditKpiSummary,
  createSimulatedTransaction,
  generateAuditCsvContent,
  formatCurrency,
} from '../utils/commissionCalculator';

type FilterTabKey =
  | 'all'
  | 'flagged'
  | 'split_cap'
  | 'uncollected_referral'
  | 'underpaid_cd';

interface TransactionAuditSuiteProps {
  onOpenAuditModal: () => void;
}

export const TransactionAuditSuite: React.FC<TransactionAuditSuiteProps> = ({
  onOpenAuditModal,
}) => {
  const [transactions, setTransactions] = useState<AuditedTransaction[]>(
    INITIAL_TRANSACTIONS
  );
  const [activeFilter, setActiveFilter] = useState<FilterTabKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedTxId, setInspectedTxId] = useState<string | null>(null);
  const [csvDownloaded, setCsvDownloaded] = useState<boolean>(false);

  // "+ Simulate Your Own Deal" inline form state
  const [simProperty, setSimProperty] = useState<string>('3100 McKinney Ave #8A, Dallas TX');
  const [simAgent, setSimAgent] = useState<string>('Brandon Cole');
  const [simSalePrice, setSimSalePrice] = useState<string>('850000');
  const [simCommPercent, setSimCommPercent] = useState<string>('2.75');
  const [simSplitPercent, setSimSplitPercent] = useState<string>('80');
  const [simActualPayout, setSimActualPayout] = useState<string>('19800');
  const [simError, setSimError] = useState<string>('');
  const [simCount, setSimCount] = useState<number>(0);

  const kpi = calculateAuditKpiSummary(transactions);

  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === 'flagged' && tx.status !== 'flagged') return false;
    if (
      activeFilter === 'split_cap' &&
      !(tx.issueCategory === 'split_cap' && tx.status === 'flagged')
    )
      return false;
    if (
      activeFilter === 'uncollected_referral' &&
      !(tx.issueCategory === 'uncollected_referral' && tx.status === 'flagged')
    )
      return false;
    if (
      activeFilter === 'underpaid_cd' &&
      !(tx.issueCategory === 'underpaid_cd' && tx.status === 'flagged')
    )
      return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.propertyAddress.toLowerCase().includes(q) ||
        tx.cityState.toLowerCase().includes(q) ||
        tx.agentName.toLowerCase().includes(q) ||
        tx.issueBadgeText.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const inspectedTransaction =
    transactions.find((t) => t.id === inspectedTxId) || null;

  const handleMarkAsRecovered = (id: string) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              status: 'recovered',
              leakedAmount: 0,
              issueBadgeText: `RECOVERED (+${formatCurrency(tx.originalLeakedAmount)} CREDITED)`,
            }
          : tx
      )
    );
  };

  const handleSimulateDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(simSalePrice.replace(/[^0-9.]/g, ''));
    const numericComm = Number(simCommPercent.replace(/[^0-9.]/g, ''));
    const numericSplit = Number(simSplitPercent.replace(/[^0-9.]/g, ''));
    const numericActual = Number(simActualPayout.replace(/[^0-9.]/g, ''));

    if (!simProperty.trim() || !numericPrice || numericPrice < 50000) {
      setSimError('Please enter a valid property address and sale price ($50,000+).');
      return;
    }

    setSimError('');
    const newTx = createSimulatedTransaction(
      {
        propertyName: simProperty,
        agentName: simAgent || 'Brokerage Agent',
        salePrice: numericPrice,
        commissionPercent: numericComm || 2.75,
        expectedSplitPercent: numericSplit || 80,
        actualPayoutReceived: numericActual || 0,
      },
      simCount
    );

    setTransactions((prev) => [newTx, ...prev]);
    setSimCount((c) => c + 1);
    setActiveFilter('all');
    setInspectedTxId(newTx.id);
  };

  const handleDownloadCsv = () => {
    const csvContent = generateAuditCsvContent(transactions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'zed-automation-brokerage-audit-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCsvDownloaded(true);
    setTimeout(() => setCsvDownloaded(false), 4000);
  };

  const handleResetSandbox = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setActiveFilter('all');
    setSearchQuery('');
    setInspectedTxId(null);
  };

  const filterTabs: { key: FilterTabKey; label: string }[] = [
    { key: 'all', label: `All Transactions (${kpi.countsByCategory.all})` },
    { key: 'flagged', label: `Flagged Leaks (${kpi.countsByCategory.flagged})` },
    { key: 'split_cap', label: `Split/Cap Errors (${kpi.countsByCategory.split_cap})` },
    {
      key: 'uncollected_referral',
      label: `Uncollected Referrals (${kpi.countsByCategory.uncollected_referral})`,
    },
    {
      key: 'underpaid_cd',
      label: `Underpaid CD (${kpi.countsByCategory.underpaid_cd})`,
    },
  ];

  return (
    <section
      id="auditor"
      className="py-20 bg-[#080A0F] border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Section Header + Export CSV Button */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span>Interactive Module 02 · Live Transaction &amp; CD/ALTA Audit Suite</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-mono">Zero-Latency Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Line-by-Line Closing Disclosure &amp; Deal Sheet Auditor
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Inspect how our engine cross-references SkySlope, Follow Up Boss, and Brokermint deal sheets against title company ALTA wires and MLS closing records. Click any deal to inspect the audit math or simulate your own closing below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleResetSandbox}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#111520] hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Sandbox</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>
                {csvDownloaded
                  ? 'Audit CSV Downloaded ✓'
                  : 'Download Sample Audit Report (CSV)'}
              </span>
            </button>
          </div>
        </div>

        {/* Top KPI Bar (Dynamically calculated from the table below) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#111520] border border-white/10">
            <span className="text-xs text-slate-400 block">Audited Volume</span>
            <div
              data-testid="kpi-audited-volume"
              className="text-2xl font-extrabold font-mono text-white mt-1"
            >
              {formatCurrency(kpi.auditedVolume)}
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-1 block">
              Across {transactions.length} closed MLS transactions
            </span>
          </div>

          <div className="p-5 rounded-xl bg-[#111520] border border-white/10">
            <span className="text-xs text-slate-400 block">Total GCI Reviewed</span>
            <div
              data-testid="kpi-total-gci"
              className="text-2xl font-extrabold font-mono text-white mt-1"
            >
              {formatCurrency(kpi.totalGciReviewed)}
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-1 block">
              Gross commission ledger verified
            </span>
          </div>

          <div className="p-5 rounded-xl bg-[#111520] border border-rose-500/30">
            <span className="text-xs text-rose-300 font-medium block">
              Flagged Leakage Found
            </span>
            <div
              data-testid="kpi-flagged-leakage"
              className="text-2xl font-extrabold font-mono text-rose-400 mt-1"
            >
              {formatCurrency(kpi.flaggedLeakageFound)}{' '}
              <span className="text-xs font-normal text-slate-300">
                (Across {kpi.flaggedDealsCount} Deals)
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
              {kpi.recoveredAmountTotal > 0
                ? `+${formatCurrency(kpi.recoveredAmountTotal)} Marked Recovered`
                : 'Click "Inspect Audit Math" to recover'}
            </span>
          </div>

          <div className="p-5 rounded-xl bg-[#111520] border border-emerald-500/30">
            <span className="text-xs text-slate-400 block">Audit Status</span>
            <div className="text-base font-bold font-mono text-emerald-400 mt-1.5">
              Live Sandbox Mode (Interactive)
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-1.5 block">
              ALTA / SkySlope / FUB Engine Ready
            </span>
          </div>
        </div>

        {/* "+ Simulate Your Own Deal" Inline Feature */}
        <div className="rounded-2xl bg-[#111520] border border-white/10 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+ Simulate Your Own Deal (Instant Discrepancy Check)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Enter any recent closing to see the Audit Engine calculate expected GCI, compare against actual wire payout, and flag discrepancies in the live table.
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-300">
              Expected GCI Preview:{' '}
              {formatCurrency(
                Math.round(
                  (Number(simSalePrice) || 0) * ((Number(simCommPercent) || 0) / 100)
                )
              )}
            </span>
          </div>

          <form
            onSubmit={handleSimulateDealSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end"
          >
            <div className="lg:col-span-2">
              <label
                htmlFor="sim-property"
                className="block text-[11px] font-medium text-slate-300 mb-1"
              >
                Property Address
              </label>
              <input
                id="sim-property"
                type="text"
                value={simProperty}
                onChange={(e) => setSimProperty(e.target.value)}
                placeholder="3100 McKinney Ave, Dallas TX"
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#080A0F] border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label
                htmlFor="sim-price"
                className="block text-[11px] font-medium text-slate-300 mb-1"
              >
                Sale Price ($)
              </label>
              <input
                id="sim-price"
                type="number"
                value={simSalePrice}
                onChange={(e) => setSimSalePrice(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-[#080A0F] border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label
                htmlFor="sim-comm"
                className="block text-[11px] font-medium text-slate-300 mb-1"
              >
                Commission % / Split %
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  id="sim-comm"
                  type="number"
                  step="0.05"
                  aria-label="Commission Percentage"
                  value={simCommPercent}
                  onChange={(e) => setSimCommPercent(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-mono rounded-lg bg-[#080A0F] border border-white/10 text-white focus:outline-none focus:border-indigo-400"
                />
                <input
                  id="sim-split"
                  type="number"
                  aria-label="Expected Agent Split Percentage"
                  value={simSplitPercent}
                  onChange={(e) => setSimSplitPercent(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-mono rounded-lg bg-[#080A0F] border border-white/10 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="sim-actual"
                className="block text-[11px] font-medium text-slate-300 mb-1"
              >
                Actual Wire Payout ($)
              </label>
              <input
                id="sim-actual"
                type="number"
                value={simActualPayout}
                onChange={(e) => setSimActualPayout(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-[#080A0F] border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-xs font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                + Run Deal Audit
              </button>
            </div>
          </form>

          {simError && <p className="text-xs text-rose-400">{simError}</p>}
        </div>

        {/* Interactive Filter Tabs + Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter Audited Transactions"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#111520] rounded-xl border border-white/10"
          >
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Search transactions by property, agent, or ID"
              placeholder="Filter by property, agent, or TXN ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-[#111520] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        {/* Pre-Loaded Realistic US Real Estate Transactions Table */}
        <div className="overflow-x-auto rounded-2xl bg-[#111520] border border-white/10">
          <table className="w-full text-left border-collapse min-w-[980px]">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-[#080A0F]/60">
                <th className="py-3.5 px-5 font-semibold">Transaction ID &amp; Property</th>
                <th className="py-3.5 px-5 font-semibold">Agent &amp; Split Plan</th>
                <th className="py-3.5 px-5 font-semibold text-right">
                  Closing Price &amp; Expected GCI
                </th>
                <th className="py-3.5 px-5 font-semibold text-right">
                  Actual Settlement / Wire
                </th>
                <th className="py-3.5 px-5 font-semibold">Detected Issue</th>
                <th className="py-3.5 px-5 font-semibold text-right">Leaked Amount ($)</th>
                <th className="py-3.5 px-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-6 text-center text-slate-400">
                    No transactions match the current filter criteria.{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('all');
                        setSearchQuery('');
                      }}
                      className="text-indigo-400 hover:underline font-semibold ml-1"
                    >
                      Show all transactions
                    </button>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isFlagged = tx.status === 'flagged';
                  const isRecovered = tx.status === 'recovered';

                  return (
                    <tr
                      key={tx.id}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        inspectedTxId === tx.id ? 'bg-indigo-500/[0.08]' : ''
                      }`}
                    >
                      {/* Col 1: Transaction ID & Property */}
                      <td className="py-4 px-5">
                        <div className="font-mono text-[11px] text-indigo-300 font-semibold">
                          {tx.id} · {tx.closingDate}
                        </div>
                        <div className="font-bold text-white text-sm mt-0.5">
                          {tx.propertyAddress}
                        </div>
                        <div className="text-slate-400 text-[11px]">{tx.cityState}</div>
                      </td>

                      {/* Col 2: Agent & Split Plan */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-white">{tx.agentName}</div>
                        <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                          {tx.splitPlanLabel}
                        </div>
                      </td>

                      {/* Col 3: Closing Price & Expected GCI */}
                      <td className="py-4 px-5 text-right font-mono">
                        <div className="text-white font-semibold">
                          {formatCurrency(tx.closingPrice)}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          Exp GCI: {formatCurrency(tx.expectedGrossGci)}
                        </div>
                      </td>

                      {/* Col 4: Actual Settlement / Wire Received */}
                      <td className="py-4 px-5 text-right font-mono">
                        <div className="text-slate-200 font-semibold">
                          {formatCurrency(tx.actualSettlementReceived)}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {tx.titleCompany}
                        </div>
                      </td>

                      {/* Col 5: Detected Issue (Clean unboxed semantic status) */}
                      <td className="py-4 px-5">
                        <div
                          className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold ${
                            isFlagged
                              ? tx.issueCategory === 'split_cap'
                                ? 'text-rose-400'
                                : 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {isFlagged ? (
                            tx.issueCategory === 'split_cap' ? (
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                            )
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                          )}
                          <span>{tx.issueBadgeText}</span>
                        </div>
                      </td>

                      {/* Col 6: Leaked Amount ($) */}
                      <td className="py-4 px-5 text-right font-mono font-bold text-sm">
                        {isFlagged ? (
                          <span className="text-rose-400">
                            -{formatCurrency(tx.leakedAmount)}
                          </span>
                        ) : isRecovered ? (
                          <span className="text-emerald-400">RECOVERED</span>
                        ) : (
                          <span className="text-slate-400">$0</span>
                        )}
                      </td>

                      {/* Col 7: Action Button */}
                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => setInspectedTxId(tx.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Inspect Audit Math
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Slide-Over / Modal Inspection Panel when a Transaction is Selected */}
        {inspectedTransaction && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inspect-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm"
          >
            <div className="w-full max-w-xl h-full bg-[#111520] border-l border-white/10 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-semibold">
                      LINE-BY-LINE AUDIT RECONCILIATION · {inspectedTransaction.id}
                    </span>
                    <h3
                      id="inspect-modal-title"
                      className="text-xl font-extrabold text-white mt-1"
                    >
                      {inspectedTransaction.propertyAddress} ({inspectedTransaction.cityState})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Agent: <strong className="text-slate-200">{inspectedTransaction.agentName}</strong> · Plan: {inspectedTransaction.splitPlanLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectedTxId(null)}
                    aria-label="Close audit math inspector"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Comparison Grid: Internal Deal Sheet vs Title Company ALTA */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#080A0F] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-indigo-300 font-semibold">
                        1. INTERNAL DEAL SHEET ({inspectedTransaction.dealSheetSystem})
                      </span>
                      <span className="text-white font-bold">
                        Expected: {formatCurrency(inspectedTransaction.expectedGrossGci)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {inspectedTransaction.dealSheetLineItem}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#080A0F] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-300 font-semibold">
                        2. TITLE COMPANY ALTA / CD ({inspectedTransaction.titleCompany})
                      </span>
                      <span className="text-white font-bold">
                        Received: {formatCurrency(inspectedTransaction.actualSettlementReceived)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {inspectedTransaction.altaDisclosureLineItem}
                    </p>
                  </div>

                  {/* Variance Explanation Box */}
                  <div
                    className={`p-5 rounded-xl border space-y-2 ${
                      inspectedTransaction.status === 'flagged'
                        ? 'bg-rose-500/[0.08] border-rose-500/30'
                        : 'bg-emerald-500/[0.08] border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-white">
                        Audit Finding &amp; Root Cause
                      </span>
                      <span
                        className={`text-base font-mono font-extrabold ${
                          inspectedTransaction.status === 'flagged'
                            ? 'text-rose-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {inspectedTransaction.status === 'flagged'
                          ? `-${formatCurrency(inspectedTransaction.leakedAmount)} Leakage`
                          : inspectedTransaction.status === 'recovered'
                          ? `+${formatCurrency(inspectedTransaction.originalLeakedAmount)} Recovered`
                          : '$0.00 Variance'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {inspectedTransaction.auditExplanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {inspectedTransaction.status === 'flagged' ? (
                  <button
                    type="button"
                    onClick={() => handleMarkAsRecovered(inspectedTransaction.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      Mark as Recovered (+{formatCurrency(inspectedTransaction.leakedAmount)})
                    </span>
                  </button>
                ) : (
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Transaction Reconciled &amp; Verified in Ledger</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setInspectedTxId(null);
                    onOpenAuditModal();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Audit My Last 90 Days</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
