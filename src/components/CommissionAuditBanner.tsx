import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  Lock,
} from 'lucide-react';
import {
  AUDIT_TOOL_URL,
  calculateCommissionLeakage,
} from '../utils/commissionCalculator';
import {
  AnimatedNumber,
  ExecutiveAuditHeader,
  MagneticButton,
  SpotlightCard,
} from './ui/MotionPrimitives';

interface CommissionAuditBannerProps {
  onOpenAsyncModal: (estimatedLeakage?: number) => void;
}

export const CommissionAuditBanner: React.FC<CommissionAuditBannerProps> = ({
  onOpenAsyncModal,
}) => {
  const [annualTransactions, setAnnualTransactions] = useState<number>(180);
  const [avgSalePrice, setAvgSalePrice] = useState<number>(450000);
  const [commissionRate, setCommissionRate] = useState<number>(2.75);
  const [outboundReferrals, setOutboundReferrals] = useState<number>(18);

  const results = calculateCommissionLeakage({
    annualTransactions,
    avgSalePrice,
    commissionRate,
    outboundReferrals,
  });

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  const auditHostLabel = AUDIT_TOOL_URL.replace('https://', '');

  return (
    <section
      id="calculator"
      className="py-24 bg-[#040807] border-b border-emerald-500/15 relative overflow-hidden"
    >
      {/* Subtle Ambient Emerald Aurora Wave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[360px] bg-emerald-500/10 blur-[130px]"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>30-Second Brokerage GCI Leakage Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Much GCI Did Your Brokerage Leave on the Table?
          </h2>
          <p className="text-slate-300 text-base">
            Adjust the sliders below to match your brokerage’s annual production and instantly calculate your silent split, cap, and referral leakage.
          </p>
        </motion.div>

        <SpotlightCard hoverLift={false} className="p-6 sm:p-10">
          {/* Clean Executive / Brokerage Leakage Sandbox Framing Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-7 border-b border-emerald-500/15 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span className="font-semibold uppercase tracking-wider">
                BROKERAGE GCI LEAKAGE SANDBOX · ALTA / CD LEDGER MODEL
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Engine Spec: {auditHostLabel}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-200 font-medium">
                    Annual Closed Transactions (Sides)
                  </span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {annualTransactions} deals/yr
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={1500}
                  step={10}
                  value={annualTransactions}
                  onChange={(e) => setAnnualTransactions(Number(e.target.value))}
                  aria-label="Annual Closed Transactions (Sides)"
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-200 font-medium">
                    Average Home Sale Price
                  </span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {formatCurrency(avgSalePrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={1500000}
                  step={25000}
                  value={avgSalePrice}
                  onChange={(e) => setAvgSalePrice(Number(e.target.value))}
                  aria-label="Average Home Sale Price"
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-200 font-medium">
                    Average Gross Commission % (Per Side)
                  </span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {commissionRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={3.5}
                  step={0.05}
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  aria-label="Average Gross Commission Percentage"
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-200 font-medium">
                    Outbound Agent Referrals Sent / Year
                  </span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {outboundReferrals} referrals/yr
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={outboundReferrals}
                  onChange={(e) => setOutboundReferrals(Number(e.target.value))}
                  aria-label="Outbound Agent Referrals Sent Per Year"
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Output Card Column */}
            <div className="lg:col-span-5 rounded-2xl bg-[#040807]/95 border border-emerald-500/30 p-6 sm:p-7 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
              <ExecutiveAuditHeader
                badge="Diagnostic Ledger Output"
                referenceId="90D-ESTIMATE"
                statusText="LIVE CALC"
              />

              <div className="text-xs font-mono uppercase text-slate-400">
                Estimated Annual Production Breakdown
              </div>

              <div className="mt-4 space-y-3 text-sm border-b border-emerald-500/15 pb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Gross GCI:</span>
                  <span className="font-mono font-semibold text-white tabular-nums">
                    <AnimatedNumber
                      value={results.totalGrossGci}
                      prefix="$"
                      durationMs={380}
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Split / Cap Overpayment Leak:
                  </span>
                  <span className="font-mono font-semibold text-rose-400 tabular-nums">
                    <AnimatedNumber
                      value={results.splitAndCapLeakage}
                      prefix="-$"
                      durationMs={380}
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Uncollected Referral Leakage:
                  </span>
                  <span className="font-mono font-semibold text-rose-400 tabular-nums">
                    <AnimatedNumber
                      value={results.uncollectedReferralLeakage}
                      prefix="-$"
                      durationMs={380}
                    />
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total Recoverable GCI / Year</span>
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tabular-nums">
                  <AnimatedNumber
                    value={results.totalRecoverableGci}
                    prefix="$"
                    durationMs={420}
                  />
                  <span className="text-sm font-normal text-slate-400">/yr</span>
                </div>
              </div>

              <MagneticButton
                onClick={() => onOpenAsyncModal(results.totalRecoverableGci)}
                className="w-full mt-6 py-3.5 px-5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#040807] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)]"
              >
                <DollarSign className="w-4 h-4" />
                <span>Recover This {formatCurrency(results.totalRecoverableGci)}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Written Audit via Email/Text • No Sales Calls</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
