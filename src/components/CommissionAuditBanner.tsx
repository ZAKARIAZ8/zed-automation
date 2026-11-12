import React from 'react';
import { Calculator, ArrowRight, SlidersHorizontal } from 'lucide-react';
import {
  LeakageEstimatorInput,
  calculateBrokerageLeakage,
  formatCurrency,
} from '../utils/commissionCalculator';

interface CommissionAuditBannerProps {
  estimatorInput: LeakageEstimatorInput;
  onChangeEstimatorInput: (next: LeakageEstimatorInput) => void;
  onOpenAuditModal: () => void;
}

export const CommissionAuditBanner: React.FC<CommissionAuditBannerProps> = ({
  estimatorInput,
  onChangeEstimatorInput,
  onOpenAuditModal,
}) => {
  const output = calculateBrokerageLeakage(estimatorInput);

  const presets = [
    {
      label: 'Boutique Team (75 Deals/Yr)',
      annualTransactions: 75,
      avgSalePrice: 420000,
      avgCommissionPercent: 2.75,
      outboundReferrals: 10,
    },
    {
      label: 'Mid-Size Brokerage (180 Deals/Yr)',
      annualTransactions: 180,
      avgSalePrice: 450000,
      avgCommissionPercent: 2.75,
      outboundReferrals: 18,
    },
    {
      label: 'Mega Regional Office (650 Deals/Yr)',
      annualTransactions: 650,
      avgSalePrice: 540000,
      avgCommissionPercent: 2.65,
      outboundReferrals: 55,
    },
  ];

  return (
    <section
      id="calculator"
      className="py-20 bg-[#080A0F] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <Calculator className="w-4 h-4 shrink-0" />
              <span>Interactive Module 01 · Instant GCI Calculator</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">Real-Time Actuarial Model</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 30-Second Brokerage Leakage Estimator
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Calibrate the 4 sliders below to your brokerage&apos;s annual production volume to see your projected split/cap overpayments and uncollected referral fees.
            </p>
          </div>

          {/* Quick Brokerage Profile Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              Presets:
            </span>
            {presets.map((p) => {
              const isMatch =
                estimatorInput.annualTransactions === p.annualTransactions &&
                estimatorInput.avgSalePrice === p.avgSalePrice;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() =>
                    onChangeEstimatorInput({
                      annualTransactions: p.annualTransactions,
                      avgSalePrice: p.avgSalePrice,
                      avgCommissionPercent: p.avgCommissionPercent,
                      outboundReferrals: p.outboundReferrals,
                    })
                  }
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isMatch
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
                      : 'bg-[#111520] border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="rounded-2xl bg-[#111520] border border-white/10 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: 4 Live Range Sliders */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Slider 1: Annual Closed Transactions */}
              <div className="p-5 rounded-xl bg-[#080A0F] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <label
                    htmlFor="slider-annual-deals"
                    className="font-semibold text-white"
                  >
                    1. Annual Closed Transactions
                  </label>
                  <span
                    data-testid="val-annual-deals"
                    className="font-mono font-bold text-indigo-400 text-base"
                  >
                    {estimatorInput.annualTransactions.toLocaleString()} deals/yr
                  </span>
                </div>
                <input
                  id="slider-annual-deals"
                  type="range"
                  min={20}
                  max={1500}
                  step={10}
                  value={estimatorInput.annualTransactions}
                  onChange={(e) =>
                    onChangeEstimatorInput({
                      ...estimatorInput,
                      annualTransactions: Number(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>20 deals/yr</span>
                  <span>750 deals/yr</span>
                  <span>1,500 deals/yr</span>
                </div>
              </div>

              {/* Slider 2: Average Home Sale Price ($) */}
              <div className="p-5 rounded-xl bg-[#080A0F] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <label
                    htmlFor="slider-sale-price"
                    className="font-semibold text-white"
                  >
                    2. Average Home Sale Price ($)
                  </label>
                  <span
                    data-testid="val-sale-price"
                    className="font-mono font-bold text-indigo-400 text-base"
                  >
                    {formatCurrency(estimatorInput.avgSalePrice)}
                  </span>
                </div>
                <input
                  id="slider-sale-price"
                  type="range"
                  min={200000}
                  max={1500000}
                  step={25000}
                  value={estimatorInput.avgSalePrice}
                  onChange={(e) =>
                    onChangeEstimatorInput({
                      ...estimatorInput,
                      avgSalePrice: Number(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>$200,000</span>
                  <span>$850,000</span>
                  <span>$1,500,000</span>
                </div>
              </div>

              {/* Slider 3: Average Gross Commission % (Per Side) */}
              <div className="p-5 rounded-xl bg-[#080A0F] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <label
                    htmlFor="slider-comm-percent"
                    className="font-semibold text-white"
                  >
                    3. Average Gross Commission % (Per Side)
                  </label>
                  <span
                    data-testid="val-comm-percent"
                    className="font-mono font-bold text-indigo-400 text-base"
                  >
                    {estimatorInput.avgCommissionPercent.toFixed(2)}%
                  </span>
                </div>
                <input
                  id="slider-comm-percent"
                  type="range"
                  min={2.0}
                  max={3.5}
                  step={0.05}
                  value={estimatorInput.avgCommissionPercent}
                  onChange={(e) =>
                    onChangeEstimatorInput({
                      ...estimatorInput,
                      avgCommissionPercent: Number(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>2.00%</span>
                  <span>2.75%</span>
                  <span>3.50%</span>
                </div>
              </div>

              {/* Slider 4: Outbound Referrals Sent per Year */}
              <div className="p-5 rounded-xl bg-[#080A0F] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <label
                    htmlFor="slider-outbound-referrals"
                    className="font-semibold text-white"
                  >
                    4. Outbound Referrals Sent per Year
                  </label>
                  <span
                    data-testid="val-outbound-referrals"
                    className="font-mono font-bold text-indigo-400 text-base"
                  >
                    {estimatorInput.outboundReferrals} referrals/yr
                  </span>
                </div>
                <input
                  id="slider-outbound-referrals"
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={estimatorInput.outboundReferrals}
                  onChange={(e) =>
                    onChangeEstimatorInput({
                      ...estimatorInput,
                      outboundReferrals: Number(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>5 deals</span>
                  <span>50 deals</span>
                  <span>100 deals</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Real-Time Output Panel */}
            <div className="lg:col-span-5 rounded-xl bg-[#080A0F] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Dynamic Real-Time Audit Readout
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Vol: {formatCurrency(output.totalAnnualVolume)}
                  </span>
                </div>

                {/* Output 1: Total Annual Gross Commission (GCI) */}
                <div className="flex items-baseline justify-between gap-4 py-2 border-b border-white/5">
                  <div>
                    <span className="text-xs text-slate-300 font-medium block">
                      Total Annual Gross Commission (GCI):
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatCurrency(output.avgGciPerDeal)} avg GCI per side
                    </span>
                  </div>
                  <span
                    data-testid="output-total-gci"
                    className="text-xl font-bold font-mono text-white"
                  >
                    {formatCurrency(output.totalAnnualGci)}
                  </span>
                </div>

                {/* Output 2: Est. Split & Cap Calculation Leakage (3.2%) */}
                <div className="flex items-baseline justify-between gap-4 py-2 border-b border-white/5">
                  <div>
                    <span className="text-xs text-slate-300 font-medium block">
                      Est. Split &amp; Cap Calculation Leakage (3.2%):
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Tier miscalculations, missed anniversary resets &amp; CD variances
                    </span>
                  </div>
                  <span
                    data-testid="output-split-leakage"
                    className="text-lg font-bold font-mono text-rose-400 shrink-0"
                  >
                    -{formatCurrency(output.splitAndCapLeakage)}
                  </span>
                </div>

                {/* Output 3: Est. Uncollected / Delayed Referral Fees */}
                <div className="flex items-baseline justify-between gap-4 py-2 border-b border-white/10">
                  <div>
                    <span className="text-xs text-slate-300 font-medium block">
                      Est. Uncollected / Delayed Referral Fees:
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Unpaid 25% outbound co-broker referral agreements
                    </span>
                  </div>
                  <span
                    data-testid="output-referral-leakage"
                    className="text-lg font-bold font-mono text-rose-400 shrink-0"
                  >
                    -{formatCurrency(output.uncollectedReferralLeakage)}
                  </span>
                </div>

                {/* Output 4: Total Recoverable Net Revenue / Year */}
                <div className="p-5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 space-y-1.5">
                  <span className="text-xs font-medium text-emerald-300 block">
                    Total Recoverable Net Revenue / Year:
                  </span>
                  <div
                    data-testid="output-recoverable-revenue"
                    className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    {formatCurrency(output.totalRecoverableNetRevenue)} / yr
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 block">
                    100% recoverable via asynchronous historical CD &amp; Deal Sheet audit
                  </span>
                </div>
              </div>

              {/* Action Button inside Calculator */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={onOpenAuditModal}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-4 text-xs sm:text-sm font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all duration-150 shadow-[0_0_30px_rgba(16,185,129,0.32)] cursor-pointer"
                >
                  <span>
                    Lock In &amp; Recover This {formatCurrency(output.totalRecoverableNetRevenue)} — Request Written Breakdown →
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <p className="text-[11px] font-mono text-center text-slate-400">
                  Delivered via Email, LinkedIn, or SMS within 24 hours · Zero Zoom calls
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
