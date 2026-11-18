import React from 'react';
import { motion } from 'motion/react';
import {
  Check,
  X,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  ExecutiveAuditHeader,
  MagneticButton,
  SpotlightCard,
} from './ui/MotionPrimitives';

interface ComparisonAndProcessSectionProps {
  onOpenAsyncModal?: () => void;
}

export const ComparisonAndProcessSection: React.FC<ComparisonAndProcessSectionProps> = ({
  onOpenAsyncModal,
}) => {
  const comparisonRows = [
    {
      criterion: 'Monthly Fixed Retainer / Salary',
      humanIsa: '$4,500/mo + Payroll Taxes',
      manualWay: '$0 Direct (Paid in Lost Deals)',
      zedAi: 'Flat Infrastructure License',
    },
    {
      criterion: 'Gross Commission Split (GCI)',
      humanIsa: '10% – 15% Commission Split',
      manualWay: '0% Split (30% GCI Leaked)',
      zedAi: '0% Commission Split (Keep 100%)',
    },
    {
      criterion: 'Average Speed-to-Lead',
      humanIsa: '8 – 25 Minutes (Business Hours)',
      manualWay: '47+ Minutes (Between Showings)',
      zedAi: '< 45 Seconds (24/7/365)',
    },
    {
      criterion: 'Nights, Weekends & Open Houses',
      humanIsa: 'Off-Duty / Voicemail',
      manualWay: 'Missed Calls & Delayed Texts',
      zedAi: '100% Instant Live Coverage',
    },
    {
      criterion: 'Dead CRM Database Reactivation',
      humanIsa: 'Rarely Dialed (Cherry-Picks New Leads)',
      manualWay: 'Untouched Graveyard',
      zedAi: 'Automated 6–36 Mo SMS Mining',
    },
    {
      criterion: 'Deployment & Ramp Time',
      humanIsa: '60–90 Days Recruiting & Training',
      manualWay: 'Immediate Burnout',
      zedAi: '14-Day Turnkey Installation',
    },
  ];

  return (
    <section className="py-24 bg-[#040807] border-b border-emerald-500/15">
      <div className="max-w-7xl mx-auto px-6 space-y-28">
        {/* Part F: Comparison Table & Glowing Border Beam Zed Automation Card */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span>Operational Economics</span>
              <span aria-hidden="true" className="text-emerald-500/40">·</span>
              <span className="text-slate-400 font-mono">Side-by-Side Architecture Comparison</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Old Brokerage Way vs.{' '}
              <span className="text-emerald-400">Zed Automation</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Compare the true cost of hiring human Inside Sales Agents or forcing top-producing agents to manually chase portal leads against an autonomous 24/7 infrastructure.
            </p>
          </motion.div>

          {/* 3-Column Executive Comparison Cards with Glowing Border Beam on Zed Automation */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Column 1: In-House Human ISA */}
            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="pb-4 border-b border-emerald-500/15">
                  <span className="text-xs font-mono uppercase text-rose-400">
                    Legacy Option A
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    In-House Human ISA
                  </h3>
                  <p className="text-xs font-mono text-rose-300 mt-0.5">
                    $4,500/mo + 15% Split
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs">
                  {comparisonRows.map((row) => (
                    <li
                      key={`isa-${row.criterion}`}
                      className="pb-3 border-b border-white/5 last:border-none last:pb-0"
                    >
                      <span className="text-slate-400 block mb-1">
                        {row.criterion}
                      </span>
                      <span className="font-mono text-slate-200 flex items-center gap-2">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{row.humanIsa}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>

            {/* Column 2: Doing It Manually */}
            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="pb-4 border-b border-emerald-500/15">
                  <span className="text-xs font-mono uppercase text-amber-400">
                    Legacy Option B
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    Doing It Manually
                  </h3>
                  <p className="text-xs font-mono text-amber-300 mt-0.5">
                    Lost Deals &amp; Burnout
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs">
                  {comparisonRows.map((row) => (
                    <li
                      key={`manual-${row.criterion}`}
                      className="pb-3 border-b border-white/5 last:border-none last:pb-0"
                    >
                      <span className="text-slate-400 block mb-1">
                        {row.criterion}
                      </span>
                      <span className="font-mono text-slate-200 flex items-center gap-2">
                        <Minus className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{row.manualWay}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>

            {/* Column 3: Zed Automation AI (Glowing Border Beam Card) */}
            <div className="relative rounded-2xl border-beam-emerald bg-[#0B1210]/90 p-6 flex flex-col justify-between shadow-[0_0_45px_rgba(16,185,129,0.18)]">
              <div className="space-y-5 relative z-10">
                <div className="pb-4 border-b border-emerald-500/25 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Autonomous Infrastructure</span>
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      Zed Automation AI
                    </h3>
                    <p className="text-xs font-mono text-emerald-300 mt-0.5">
                      24/7 Instant · 0% Split · 14 Days
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    100% GCI Kept
                  </span>
                </div>

                <ul className="space-y-3.5 text-xs">
                  {comparisonRows.map((row) => (
                    <li
                      key={`zed-${row.criterion}`}
                      className="pb-3 border-b border-emerald-500/15 last:border-none last:pb-0"
                    >
                      <span className="text-emerald-200/70 block mb-1">
                        {row.criterion}
                      </span>
                      <span className="font-mono font-semibold text-white flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.zedAi}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-5 border-t border-emerald-500/20 relative z-10">
                <MagneticButton
                  onClick={() => onOpenAsyncModal?.()}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#040807] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                >
                  <span>Request Your Free 90-Day Written Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Full Matrix Ledger Table for Executive Review */}
          <div className="mt-8 overflow-x-auto rounded-2xl glass-obsidian-card">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-emerald-500/15 text-xs font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 text-slate-400 font-semibold w-1/4">
                    Infrastructure Dimension
                  </th>
                  <th className="py-4 px-6 text-slate-300 font-semibold w-1/4 bg-white/[0.01]">
                    In-House Human ISA
                  </th>
                  <th className="py-4 px-6 text-slate-300 font-semibold w-1/4">
                    Doing It Manually
                  </th>
                  <th className="py-4 px-6 text-emerald-300 font-bold w-1/4 bg-emerald-500/[0.08] border-l border-emerald-500/25">
                    Zed Automation AI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/10 text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row.criterion} className="hover:bg-emerald-500/[0.03] transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-white">
                      {row.criterion}
                    </td>
                    <td className="py-3.5 px-6 text-slate-300 font-mono text-xs bg-white/[0.01]">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{row.humanIsa}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-300 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <Minus className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{row.manualWay}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-white font-mono text-xs font-semibold bg-emerald-500/[0.08] border-l border-emerald-500/25">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.zedAi}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part G: 3-Step Implementation Process */}
        <div>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span>14-Day Turnkey Deployment</span>
              <span aria-hidden="true" className="text-emerald-500/40">·</span>
              <span className="text-slate-400 font-mono">Zero Disruption to Agent Workflow</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              How We Install Your AI Revenue Recovery System
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Step 1 */}
            <SpotlightCard className="p-7 flex flex-col justify-between space-y-6">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <ExecutiveAuditHeader
                    badge="STEP 01 · WRITTEN DIAGNOSTIC"
                    referenceId="ASYNC-INTAKE"
                    statusText="ZERO CALLS"
                  />
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Step 1: Request Your Written Commission Audit
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Request your asynchronous 90-day written GCI leakage breakdown via Email, LinkedIn DM, or SMS—identifying your exact split, cap, and lead-response bottlenecks before committing a single dollar.
                  </p>
                </div>
                <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenAsyncModal?.()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    <span>Audit Your Leaked GCI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    100% Written
                  </span>
                </div>
              </div>
            </SpotlightCard>

            {/* Step 2 */}
            <SpotlightCard className="p-7 flex flex-col justify-between space-y-6">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <ExecutiveAuditHeader
                    badge="STEP 02 · ARCHITECTURE"
                    referenceId="DAYS 1–10"
                    statusText="CRM WEBHOOKS"
                  />
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Step 2: Custom CRM &amp; AI Integration (Days 1–10)
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We plug directly into your existing CRM (Follow Up Boss, KVCore, Lofty, GHL), train the AI on your local US market scripts, and configure round-robin agent routing without disrupting your agents&apos; workflow.
                  </p>
                </div>
                <div className="pt-4 border-t border-emerald-500/15 text-xs font-mono text-slate-400">
                  Includes A2P 10DLC carrier registration &amp; script calibration QA
                </div>
              </div>
            </SpotlightCard>

            {/* Step 3 */}
            <SpotlightCard className="p-7 flex flex-col justify-between space-y-6">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <ExecutiveAuditHeader
                    badge="STEP 03 · AUTONOMOUS SCALE"
                    referenceId="DAY 14+"
                    statusText="24/7 LIVE"
                  />
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Step 3: Go Live &amp; Scale Appointments (Day 14+)
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Your AI system works 24/7, turning missed inquiries, new portal webhooks, and cold CRM leads into booked listing and buyer consultations directly on your team&apos;s calendars.
                  </p>
                </div>
                <div className="pt-4 border-t border-emerald-500/15 text-xs font-mono text-emerald-400">
                  Real-time GCI attribution &amp; transcript logging
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
