import React, { useState } from 'react';
import { ArrowUpRight, Calculator, SlidersHorizontal } from 'lucide-react';
import {
  AUDIT_TOOL_URL,
  calculateCommissionLeakage,
  formatCurrency,
} from '../utils/commissionCalculator';

interface BrokeragePreset {
  label: string;
  monthlyLeads: number;
  avgHomePrice: number;
  responseTimeMinutes: number;
  deadCrmContacts: number;
}

const PRESETS: BrokeragePreset[] = [
  {
    label: 'High-Volume Realtor ($8M+)',
    monthlyLeads: 65,
    avgHomePrice: 485000,
    responseTimeMinutes: 12,
    deadCrmContacts: 1200,
  },
  {
    label: 'Growing Realty Team ($25M+)',
    monthlyLeads: 160,
    avgHomePrice: 550000,
    responseTimeMinutes: 9,
    deadCrmContacts: 3800,
  },
  {
    label: 'Multi-Agent Brokerage ($75M+)',
    monthlyLeads: 420,
    avgHomePrice: 640000,
    responseTimeMinutes: 16,
    deadCrmContacts: 9500,
  },
];

export const CommissionAuditBanner: React.FC = () => {
  const [monthlyLeads, setMonthlyLeads] = useState<number>(160);
  const [avgHomePrice, setAvgHomePrice] = useState<number>(550000);
  const [responseTimeMinutes, setResponseTimeMinutes] = useState<number>(9);
  const [deadCrmContacts, setDeadCrmContacts] = useState<number>(3800);
  const [activePreset, setActivePreset] = useState<string>('Growing Realty Team ($25M+)');

  const auditMetrics = calculateCommissionLeakage({
    monthlyLeads,
    avgHomePrice,
    commissionRatePercent: 2.75,
    responseTimeMinutes,
    deadCrmContacts,
  });

  const applyPreset = (preset: BrokeragePreset) => {
    setActivePreset(preset.label);
    setMonthlyLeads(preset.monthlyLeads);
    setAvgHomePrice(preset.avgHomePrice);
    setResponseTimeMinutes(preset.responseTimeMinutes);
    setDeadCrmContacts(preset.deadCrmContacts);
  };

  return (
    <section id="roi-audit" className="py-24 bg-[#090A0F] border-b border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Emerald & Indigo Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[960px] h-[460px] bg-gradient-to-r from-emerald-500/15 via-indigo-500/15 to-emerald-500/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Standout Glowing High-Contrast Card */}
        <div className="rounded-3xl backdrop-blur-xl bg-gradient-to-b from-[#131724] to-[#0D1018] border border-emerald-500/30 p-8 sm:p-12 shadow-[0_0_70px_rgba(16,185,129,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Audit Narrative & Interactive Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <Calculator className="w-4 h-4 shrink-0" />
                <span>Interactive Commission Leakage Diagnostic</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400 font-mono">2.75% Avg Side GCI</span>
              </div>

              <h2
                className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                How Much GCI Did Your Brokerage Leave on the Table Last Quarter?
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Before you spend another dollar on Zillow Premier Agent or Facebook Ads, use our interactive Commission Audit Tool. Enter your monthly lead volume, average home price, and current response time to see your exact dollar leakage—and how much our AI infrastructure can recover in the next 30 days.
              </p>

              {/* Preset Selector Buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  Select Brokerage Profile or Adjust Sliders Below:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => {
                    const isSelected = activePreset === preset.label;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="p-4 rounded-xl bg-[#090A0F]/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="slider-leads" className="font-medium text-slate-300">
                      Monthly Inbound Leads
                    </label>
                    <span className="font-mono font-bold text-emerald-400">
                      {monthlyLeads} leads/mo
                    </span>
                  </div>
                  <input
                    id="slider-leads"
                    type="range"
                    min={20}
                    max={800}
                    step={10}
                    value={monthlyLeads}
                    onChange={(e) => {
                      setMonthlyLeads(Number(e.target.value));
                      setActivePreset('Custom');
                    }}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>20/mo</span>
                    <span>400/mo</span>
                    <span>800/mo</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090A0F]/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="slider-price" className="font-medium text-slate-300">
                      Average Home Price
                    </label>
                    <span className="font-mono font-bold text-emerald-400">
                      {formatCurrency(avgHomePrice)}
                    </span>
                  </div>
                  <input
                    id="slider-price"
                    type="range"
                    min={250000}
                    max={1500000}
                    step={25000}
                    value={avgHomePrice}
                    onChange={(e) => {
                      setAvgHomePrice(Number(e.target.value));
                      setActivePreset('Custom');
                    }}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>$250k</span>
                    <span>$850k</span>
                    <span>$1.5M</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090A0F]/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="slider-response" className="font-medium text-slate-300">
                      Current Lead Response Time
                    </label>
                    <span className="font-mono font-bold text-rose-400">
                      {responseTimeMinutes} mins
                    </span>
                  </div>
                  <input
                    id="slider-response"
                    type="range"
                    min={1}
                    max={60}
                    step={1}
                    value={responseTimeMinutes}
                    onChange={(e) => {
                      setResponseTimeMinutes(Number(e.target.value));
                      setActivePreset('Custom');
                    }}
                    className="w-full accent-indigo-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>1m</span>
                    <span>15m</span>
                    <span>60m+</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090A0F]/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="slider-crm" className="font-medium text-slate-300">
                      Unworked Past CRM Leads
                    </label>
                    <span className="font-mono font-bold text-indigo-300">
                      {deadCrmContacts.toLocaleString()} contacts
                    </span>
                  </div>
                  <input
                    id="slider-crm"
                    type="range"
                    min={500}
                    max={15000}
                    step={500}
                    value={deadCrmContacts}
                    onChange={(e) => {
                      setDeadCrmContacts(Number(e.target.value));
                      setActivePreset('Custom');
                    }}
                    className="w-full accent-indigo-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>500</span>
                    <span>7,500</span>
                    <span>15,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Calculated Leakage Readout & Primary CTA */}
            <div className="lg:col-span-5 rounded-2xl bg-[#090A0F] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Estimated Brokerage Leakage
                  </span>
                  <span className="text-xs font-mono text-rose-400 font-semibold">
                    -{auditMetrics.qualificationOddsDropPercent}% Qualification Odds
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">
                    Estimated Monthly Leaked GCI
                  </span>
                  <div
                    data-testid="monthly-leaked-gci"
                    className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mt-1"
                  >
                    {formatCurrency(auditMetrics.monthlyLeakedGci)}
                    <span className="text-sm font-normal text-slate-400">/mo</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 mt-1 block">
                    ≈ {auditMetrics.monthlyLeakedDeals} missed closings/mo at{' '}
                    {formatCurrency(auditMetrics.avgCommissionPerDeal)} avg commission
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Annual Unclaimed GCI
                    </span>
                    <span
                      data-testid="annual-leaked-gci"
                      className="text-lg sm:text-xl font-bold font-mono text-rose-400 mt-0.5 block"
                    >
                      {formatCurrency(auditMetrics.annualLeakedGci)}/yr
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Est. 30-Day AI Recovery
                    </span>
                    <span
                      data-testid="recoverable-30day-gci"
                      className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-0.5 block"
                    >
                      +{formatCurrency(auditMetrics.recoverable30DayGci)}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/25 text-xs text-slate-200 leading-relaxed">
                  Includes <strong className="font-mono text-emerald-300">+{auditMetrics.reactivatedDatabaseDeals}</strong> projected listing/buyer appointments reactivated from your{' '}
                  <strong className="font-mono text-white">{deadCrmContacts.toLocaleString()}</strong> dormant CRM contacts.
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={AUDIT_TOOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-[#090A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all duration-150 shadow-[0_0_30px_rgba(16,185,129,0.35)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>Launch The Free Commission Audit Tool →</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>
                <p className="text-[11px] text-center text-slate-400 font-mono">
                  Generates a customized 14-day GCI recovery roadmap for your brokerage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
