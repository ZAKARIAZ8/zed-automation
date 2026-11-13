import React from 'react';
import { Clock, Database, UserX, TrendingDown } from 'lucide-react';

export const AgitationSection: React.FC = () => {
  const diagnosticCards = [
    {
      index: '01.',
      title: 'The 5-Minute Death Zone',
      stat: '-80%',
      statLabel: 'Drop in Lead Qualification Odds',
      description:
        'Waiting even 5 minutes to call a web lead drops qualification odds by 80%. Your agents are at showings, inspections, or closing tables—they physically cannot reply in 30 seconds.',
      benchmark: 'US Industry Avg Response: 47 Minutes',
      icon: Clock,
    },
    {
      index: '02.',
      title: 'The "Dead CRM" Graveyard',
      stat: '74%',
      statLabel: 'Paid Portal Leads Left Unworked After Day 3',
      description:
        'Thousands of past leads sitting untouched in Follow Up Boss or KVCore that you already paid Zillow, Realtor.com, or Meta thousands of dollars to acquire—quietly listing with competing brokers.',
      benchmark: 'Avg Unworked CRM Value: $180k–$420k/yr',
      icon: Database,
    },
    {
      index: '03.',
      title: 'ISA Burnout & Turnover',
      stat: '$4,000+/mo',
      statLabel: 'Base Overhead Plus 15% Commission Splits',
      description:
        'Hiring human Inside Sales Agents costs $4,000+/mo plus commission splits, and they still sleep, take weekends off, call in sick on peak Sunday open-house afternoons, and cherry-pick leads.',
      benchmark: 'Human Coverage: 40 of 168 Weekly Hours',
      icon: UserX,
    },
  ];

  return (
    <section id="problem" className="py-24 bg-[#090A0F] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Diagnostic Analysis</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Why Traditional Brokerages Bleed Commission</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            You Don&apos;t Have a Lead Generation Problem. You Have a{' '}
            <span className="text-emerald-400">Lead Leakage Problem.</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Top-producing US teams spend $5,000 to $40,000 every month generating portal and social inquiries—only to watch nearly a third of their Gross Commission Income evaporate inside operational blind spots.
          </p>
        </div>

        {/* 3-Card Diagnostic Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {diagnosticCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <article
                key={card.index}
                className="rounded-2xl backdrop-blur-md bg-[#11131C]/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div className="space-y-6">
                  {/* Top Row: Editorial Numbering & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-semibold text-indigo-400">
                      {card.index}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
                      <IconComponent className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>

                  {/* Primary Metric Highlight */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                      {card.stat}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {card.statLabel}
                    </div>
                  </div>

                  {/* Card Title & Copy */}
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Unboxed Benchmark Footnote */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    {card.benchmark}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
