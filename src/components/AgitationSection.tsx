import React from 'react';
import { motion } from 'motion/react';
import { Clock, Database, UserX, TrendingDown, FileSpreadsheet } from 'lucide-react';
import {
  AnimatedNumber,
  ExecutiveAuditHeader,
  SpotlightCard,
} from './ui/MotionPrimitives';

export const AgitationSection: React.FC = () => {
  const diagnosticCards = [
    {
      index: '01.',
      ledgerCode: 'DIAG-LATENCY-01',
      title: 'The 5-Minute Death Zone',
      statValue: 80,
      statPrefix: '-',
      statSuffix: '%',
      statLabel: 'Drop in Lead Qualification Odds',
      description:
        'Waiting even 5 minutes to call a web lead drops qualification odds by 80%. Your agents are at showings, inspections, or closing tables—they physically cannot reply in 30 seconds.',
      benchmark: 'US Industry Avg Response: 47 Minutes',
      icon: Clock,
    },
    {
      index: '02.',
      ledgerCode: 'DIAG-DORMANT-02',
      title: 'The "Dead CRM" Graveyard',
      statValue: 74,
      statPrefix: '',
      statSuffix: '%',
      statLabel: 'Paid Portal Leads Left Unworked After Day 3',
      description:
        'Thousands of past leads sitting untouched in Follow Up Boss or KVCore that you already paid Zillow, Realtor.com, or Meta thousands of dollars to acquire—quietly listing with competing brokers.',
      benchmark: 'Avg Unworked CRM Value: $180k–$420k/yr',
      icon: Database,
    },
    {
      index: '03.',
      ledgerCode: 'DIAG-OVERHEAD-03',
      title: 'ISA Burnout & Turnover',
      statValue: 4000,
      statPrefix: '$',
      statSuffix: '+/mo',
      statLabel: 'Base Overhead Plus 15% Commission Splits',
      description:
        'Hiring human Inside Sales Agents costs $4,000+/mo plus commission splits, and they still sleep, take weekends off, call in sick on peak Sunday open-house afternoons, and cherry-pick leads.',
      benchmark: 'Human Coverage: 40 of 168 Weekly Hours',
      icon: UserX,
    },
  ];

  return (
    <section id="problem" className="py-24 bg-[#040807]/90 border-b border-emerald-500/15 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Diagnostic Analysis</span>
            <span aria-hidden="true" className="text-emerald-500/40">·</span>
            <span className="text-slate-400 font-mono">Why Traditional Brokerages Bleed Commission</span>
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
        </motion.div>

        {/* 3-Card Diagnostic Grid with Clean Corporate Audit Framing */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {diagnosticCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.index}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <SpotlightCard as="article" className="h-full p-7 flex flex-col justify-between">
                  <div className="flex flex-col justify-between h-full">
                    <div className="space-y-5">
                      <ExecutiveAuditHeader
                        badge={`KPI AUDIT ${card.index}`}
                        referenceId={card.ledgerCode}
                        statusText="VERIFIED BENCHMARK"
                      />

                      {/* Top Row: Editorial Numbering & Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono font-semibold text-emerald-400">
                          {card.index}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#040807] border border-emerald-500/25 flex items-center justify-center text-slate-200">
                          <IconComponent className="w-5 h-5 text-emerald-400" />
                        </div>
                      </div>

                      {/* Primary Metric Highlight */}
                      <div className="pt-2 border-t border-emerald-500/15">
                        <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                          <AnimatedNumber
                            value={card.statValue}
                            prefix={card.statPrefix}
                            suffix={card.statSuffix}
                          />
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
                    <div className="mt-8 pt-4 border-t border-emerald-500/15 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        {card.benchmark}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
