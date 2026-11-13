import React, { useState } from 'react';
import { ArrowRight, CalendarCheck, CheckCircle2, PhoneCall, MessageSquare, RotateCcw, ShieldCheck } from 'lucide-react';
import { AUDIT_TOOL_URL } from '../utils/commissionCalculator';

interface LeadScenario {
  id: 'zillow' | 'realtor' | 'meta';
  portalLabel: string;
  leadName: string;
  propertyAddress: string;
  listPrice: string;
  step1Title: string;
  step1Detail: string;
  step2Title: string;
  step2Detail: string;
  step3Title: string;
  step3Detail: string;
  estCommission: string;
  crmTarget: string;
  responseTime: string;
}

const LEAD_SCENARIOS: Record<LeadScenario['id'], LeadScenario> = {
  zillow: {
    id: 'zillow',
    portalLabel: 'Zillow Premier',
    leadName: 'David & Sarah Miller',
    propertyAddress: '4820 Barton Creek Blvd, Austin TX',
    listPrice: '$580,000',
    step1Title: 'New Zillow Lead Received',
    step1Detail: 'Webhook ingested via Follow Up Boss API · Property tour request detected.',
    step2Title: 'AI SMS & Voice Qualification Sent',
    step2Detail: 'Verified pre-approval ($600k Movement Mortgage), relocating in 45 days, no buyer agent signed.',
    step3Title: 'Buyer Pre-Approved & Inspection Booked on Calendar',
    step3Detail: 'Consultation + Private Showing locked on Senior Buyer Agent calendar · Sat 11:00 AM.',
    estCommission: '$14,500',
    crmTarget: 'Follow Up Boss',
    responseTime: '0:32s',
  },
  realtor: {
    id: 'realtor',
    portalLabel: 'Realtor.com',
    leadName: 'Jonathan Vance',
    propertyAddress: '1140 Camelback Rd, Scottsdale AZ',
    listPrice: '$740,000',
    step1Title: 'New Realtor.com Lead Received',
    step1Detail: 'Direct portal payload captured in KVCore · Seller + Buyer dual-intent inquiry.',
    step2Title: 'AI SMS & Voice Qualification Sent',
    step2Detail: 'Confirmed need to list current townhome ($460k) before purchasing · 60-day timeline.',
    step3Title: 'Listing Valuation & Buyer Consult Booked on Calendar',
    step3Detail: 'Dual-side opportunity assigned to Listing Partner with full AI transcript note.',
    estCommission: '$22,200',
    crmTarget: 'KVCore',
    responseTime: '0:28s',
  },
  meta: {
    id: 'meta',
    portalLabel: 'Meta Lead Ads',
    leadName: 'Elena Rostova',
    propertyAddress: '904 Queens Rd W, Charlotte NC',
    listPrice: '$620,000',
    step1Title: 'Dormant 11-Month Meta Lead Reactivated',
    step1Detail: 'AI Database Reactivation SMS campaign triggered on 2,400 unworked Lofty contacts.',
    step2Title: 'AI SMS & Voice Qualification Sent',
    step2Detail: 'Prospect replied within 90s: lease expires next month, pre-underwritten with Chase.',
    step3Title: 'Buyer Consultation Booked on Calendar',
    step3Detail: 'High-intent buyer transferred live to Team Leader calendar with audio summary.',
    estCommission: '$16,120',
    crmTarget: 'Lofty / Chime',
    responseTime: '0:39s',
  },
};

export const HeroSection: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<LeadScenario['id']>('zillow');
  const [activeStep, setActiveStep] = useState<number>(3);

  const scenario = LEAD_SCENARIOS[selectedScenario];

  const handleReplaySequence = () => {
    setActiveStep(1);
    setTimeout(() => setActiveStep(2), 450);
    setTimeout(() => setActiveStep(3), 900);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-subtle-grid border-b border-white/10 overflow-hidden">
      {/* Ambient Radial Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-tr from-emerald-500/15 via-indigo-500/10 to-transparent blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          {/* Left Column: High-Converting Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Unboxed Editorial Kicker (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-emerald-400">
                <span>⚡ Built Exclusively for US Real Estate Teams & Brokerages</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400 font-mono">$5M+ Annual Volume Infrastructure</span>
              </div>

              {/* Main Headline */}
              <h1
                className="font-extrabold tracking-tight text-white leading-[1.08]"
                style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)', textWrap: 'balance' }}
              >
                Stop Donating{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
                  <span className="font-mono">30%</span> of Your GCI
                </span>{' '}
                to Slow Follow-Ups.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                <span className="text-white font-semibold font-mono">78%</span> of real estate commissions go to the first agent who responds. Zed Automation installs a 24/7 AI Speed-to-Lead &amp; Database Reactivation infrastructure that contacts, qualifies, and books Zillow, Realtor.com, and Meta leads onto your calendar in under{' '}
                <span className="text-emerald-400 font-mono font-semibold">45 seconds</span>.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={AUDIT_TOOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold text-[#090A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all duration-150 shadow-[0_0_35px_rgba(16,185,129,0.35)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>Calculate Your Leaked Commission (Free 60s Audit)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                <a
                  href="#infrastructure"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>See How The System Works</span>
                </a>
              </div>

              {/* Secondary Architecture Call Anchor + Guarantee Metadata */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                <span>Zero GCI split</span>
                <span aria-hidden="true">·</span>
                <span>14-day turnkey installation</span>
                <span aria-hidden="true">·</span>
                <a
                  href="#book-call"
                  className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-medium transition-colors"
                >
                  Or Book a 15-Min Architecture Call →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Speed-to-Lead Timeline Mockup */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full rounded-2xl backdrop-blur-md bg-[#11131C]/90 border border-white/10 p-6 flex flex-col justify-between shadow-2xl">
              {/* Mockup Header & Interactive Portal Switcher */}
              <div className="space-y-4 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      Autonomous Pipeline Execution
                    </p>
                    <h2 className="text-sm font-semibold text-white mt-0.5">
                      Live Lead-to-Calendar Telemetry
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleReplaySequence}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Simulate</span>
                  </button>
                </div>

                {/* Interactive Segmented Control for Lead Source */}
                <div
                  role="group"
                  aria-label="Select Lead Source Scenario"
                  className="grid grid-cols-3 gap-1.5 p-1 bg-[#090A0F] rounded-xl border border-white/10"
                >
                  {(['zillow', 'realtor', 'meta'] as const).map((key) => {
                    const item = LEAD_SCENARIOS[key];
                    const isSelected = selectedScenario === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSelectedScenario(key);
                          setActiveStep(3);
                        }}
                        className={`px-2 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap truncate ${
                          isSelected
                            ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {item.portalLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Lead Context Summary Row */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="truncate">
                    Prospect: <strong className="text-slate-200 font-medium">{scenario.leadName}</strong>
                  </span>
                  <span className="font-mono text-slate-300 shrink-0">
                    List: {scenario.listPrice}
                  </span>
                </div>
              </div>

              {/* Timeline Steps (0:00s -> 0:32s -> 2:15s) */}
              <div className="py-5 space-y-4">
                {/* Step 1: 0:00s */}
                <div
                  className={`p-3.5 rounded-xl border transition-all duration-200 ${
                    activeStep >= 1
                      ? 'bg-white/[0.04] border-white/10 opacity-100'
                      : 'bg-white/[0.01] border-white/5 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                      {scenario.step1Title}
                    </span>
                    <span className="font-mono text-indigo-300 font-semibold shrink-0">0:00s</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {scenario.step1Detail}
                  </p>
                </div>

                {/* Step 2: 0:32s */}
                <div
                  className={`p-3.5 rounded-xl border transition-all duration-200 ${
                    activeStep >= 2
                      ? 'bg-indigo-500/[0.08] border-indigo-500/30 opacity-100'
                      : 'bg-white/[0.01] border-white/5 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-indigo-400 shrink-0" />
                      {scenario.step2Title}
                    </span>
                    <span className="font-mono text-indigo-300 font-semibold shrink-0">
                      {scenario.responseTime}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {scenario.step2Detail}
                  </p>
                </div>

                {/* Step 3: 2:15s */}
                <div
                  className={`p-3.5 rounded-xl border transition-all duration-200 ${
                    activeStep >= 3
                      ? 'bg-emerald-500/[0.08] border-emerald-500/30 opacity-100'
                      : 'bg-white/[0.01] border-white/5 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      {scenario.step3Title}
                    </span>
                    <span className="font-mono text-emerald-300 font-semibold shrink-0">2:15s</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {scenario.step3Detail}
                  </p>
                </div>
              </div>

              {/* Bottom Locked Commission Callout Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">
                    CRM Synced: <strong className="text-slate-200">{scenario.crmTarget}</strong>
                  </span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    Est. Commission Locked
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-mono text-emerald-400 tracking-tight">
                    {scenario.estCommission}
                  </span>
                  <span className="block text-[11px] font-mono text-slate-400">
                    0% ISA Split Deducted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Trust Metrics Bar below Hero */}
        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
              &lt; 45 Sec
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              Average Lead Response Time
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Instant SMS &amp; conversational AI voice outreach before competitors unlock their phones.
            </p>
          </div>

          <div className="p-5 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
              3.4x
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              Increase in Set Appointments
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Verified across US realty teams spending $3k–$25k/mo on Zillow, Realtor.com &amp; Meta.
            </p>
          </div>

          <div className="p-5 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
              $0
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              Extra ISA Payroll Overhead
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Eliminate $4,500/mo base salaries, W2 payroll taxes, and 15% inside sales commission splits.
            </p>
          </div>

          <div className="p-5 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400 tracking-tight">
              24/7/365
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              Instant CRM Sync
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Native two-way integration with Follow Up Boss, KVCore, GoHighLevel, and Lofty (Chime).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
