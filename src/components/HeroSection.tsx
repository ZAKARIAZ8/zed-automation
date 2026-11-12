import React from 'react';
import { FileSpreadsheet, Percent, GitCompare, FileCheck2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenAuditModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuditModal }) => {
  const leakagePillars = [
    {
      index: '01.',
      title: 'Post-Cap & Split Calculation Errors',
      metric: '1.8% – 3.4% GCI Lost',
      description:
        'Agents or back-office admins miscalculating tiered splits (80/20 vs. 100% post-cap), missed anniversary cap resets, and off-the-top franchise/royalty fees on Closing Disclosures (CD / ALTA statements).',
      icon: Percent,
    },
    {
      index: '02.',
      title: 'Uncollected Incoming Referral Fees',
      metric: '25% – 35% Referral Leakage',
      description:
        'Outbound agent-to-agent referral agreements that close at external brokerages in the MLS without the settlement check or wire ever being collected by your accounting desk.',
      icon: GitCompare,
    },
    {
      index: '03.',
      title: 'Settlement & Wire Discrepancies',
      metric: '$1,200 – $5,400 / Flagged Deal',
      description:
        'Silent variances between internal CRM deal sheets (SkySlope, Follow Up Boss, Brokermint, LoneWolf) and final title company wire payouts that go unreconciled at month-end.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section
      id="overview"
      className="relative pt-14 pb-20 lg:pt-20 lg:pb-24 bg-subtle-grid border-b border-white/10 overflow-hidden"
    >
      {/* Subtle Ambient Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 w-[940px] h-[400px] bg-gradient-to-tr from-emerald-500/12 via-indigo-500/10 to-transparent blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Hero Centerpiece */}
        <div className="max-w-4xl space-y-6">
          {/* Unboxed Kicker (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-emerald-400">
            <span>⚡ 100% Asynchronous Commission Recovery for US Brokerages</span>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <span className="text-slate-200">Zero Sales Calls</span>
            <span aria-hidden="true" className="text-slate-600">•</span>
            <span className="text-indigo-300 font-mono">US Brokerage Audit Engine</span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-extrabold tracking-tight text-white leading-[1.08]"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', textWrap: 'balance' }}
          >
            Your Brokerage Closed Millions in Volume.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
              How Much GCI Quietly Leaked
            </span>{' '}
            at the Closing Table?
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Between split tier errors, missed anniversary cap resets, and uncollected{' '}
            <span className="font-mono text-white font-semibold">25%</span> referral agreements, the average US real estate team leaks{' '}
            <span className="font-mono text-rose-400 font-semibold">$42,000 to $180,000+</span> per year. Test our live Audit Engine below in 30 seconds—no login or Zoom call required.
          </p>

          {/* Dual Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-4 text-xs sm:text-sm font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all duration-150 shadow-[0_0_32px_rgba(16,185,129,0.32)] whitespace-nowrap shrink-0"
            >
              <span>Try Live Audit Sandbox Below ↓</span>
            </a>

            <button
              type="button"
              onClick={onOpenAuditModal}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-white bg-[#111520] hover:bg-white/10 border border-indigo-500/40 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Request Free 90-Day Lookback Audit (Via Email/Text)</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
            <span>Built for Managing Brokers &amp; Team Leaders (50 to 2,000+ deals/yr)</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-300">SkySlope · Dotloop · Brokermint · Follow Up Boss · ALTA</span>
          </div>
        </div>

        {/* 3 Core Leakage Diagnostic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-4 border-t border-white/10">
          {leakagePillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <article
                key={pillar.index}
                className="rounded-2xl bg-[#111520] border border-white/10 p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400">
                      {pillar.index}
                    </span>
                    <IconComponent className="w-5 h-5 text-rose-400" />
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    {pillar.title}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Typical Impact</span>
                  <span className="text-rose-400 font-semibold">{pillar.metric}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
