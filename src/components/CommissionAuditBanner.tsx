import React, { useState } from 'react';
import { Sliders, DollarSign, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { calculateCommissionLeakage } from '../utils/commissionCalculator';

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

  return (
    <section
      id="calculator"
      className="py-20 bg-[#0B0E17] border-t border-white/10 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>30-Second Brokerage GCI Leakage Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How Much GCI Did Your Brokerage Leave on the Table?
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Adjust the sliders below to match your brokerage’s annual production and instantly calculate your silent split, cap, and referral leakage.
          </p>
        </div>

        <div className="rounded-3xl bg-[#111520] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Annual Closed Transactions (Sides)
                  </span>
                  <span className="font-mono font-bold text-indigo-400">
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
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Average Home Sale Price
                  </span>
                  <span className="font-mono font-bold text-indigo-400">
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
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Average Gross Commission % (Per Side)
                  </span>
                  <span className="font-mono font-bold text-indigo-400">
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
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Outbound Agent Referrals Sent / Year
                  </span>
                  <span className="font-mono font-bold text-indigo-400">
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
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Output Card Column */}
            <div className="lg:col-span-5 rounded-2xl bg-[#080A0F] border border-emerald-500/25 p-6 sm:p-7">
              <div className="text-xs font-mono uppercase text-slate-400">
                Estimated Annual Production Breakdown
              </div>

              <div className="mt-4 space-y-3 text-sm border-b border-white/10 pb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Gross GCI:</span>
                  <span className="font-mono font-semibold text-white">
                    {formatCurrency(results.totalGrossGci)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Split / Cap Overpayment Leak:
                  </span>
                  <span className="font-mono font-semibold text-rose-400">
                    -{formatCurrency(results.splitAndCapLeakage)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Uncollected Referral Leakage:
                  </span>
                  <span className="font-mono font-semibold text-rose-400">
                    -{formatCurrency(results.uncollectedReferralLeakage)}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total Recoverable GCI / Year</span>
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                  {formatCurrency(results.totalRecoverableGci)}
                  <span className="text-sm font-normal text-slate-400">/yr</span>
                </div>
              </div>

              <button
                onClick={() => onOpenAsyncModal(results.totalRecoverableGci)}
                className="w-full mt-6 py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <DollarSign className="w-4 h-4" />
                <span>Recover This {formatCurrency(results.totalRecoverableGci)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Written Audit via Email/Text • No Sales Calls</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
