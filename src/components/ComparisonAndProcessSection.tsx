import React, { useState } from 'react';
import {
  Check,
  X,
  Minus,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  AUDIT_TOOL_URL,
  ArchitectureCallFormInput,
  validateArchitectureCallForm,
} from '../utils/commissionCalculator';

export const ComparisonAndProcessSection: React.FC = () => {
  const [formState, setFormState] = useState<ArchitectureCallFormInput>({
    fullName: '',
    brokerageName: '',
    workEmail: '',
    phone: '',
    currentCrm: 'Follow Up Boss',
    annualVolume: '$15M – $35M / yr',
    selectedSlot: 'Tomorrow · 11:30 AM EST',
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ArchitectureCallFormInput, string>>
  >({});
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const timeSlots = [
    'Tomorrow · 11:30 AM EST',
    'Tomorrow · 2:00 PM EST',
    'Tomorrow · 4:15 PM EST',
    'Thu · 1:00 PM EST',
  ];

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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateArchitectureCallForm(formState);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      setBookingConfirmed(false);
      return;
    }
    setFormErrors({});
    setBookingConfirmed(true);
  };

  return (
    <section className="py-24 bg-[#090A0F] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 space-y-28">
        {/* Part F: Comparison Table ("Old Brokerage Way vs. Zed Automation") */}
        <div>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span>Operational Economics</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
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
          </div>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10 bg-[#11131C]/90 backdrop-blur-md">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider">
                  <th className="py-5 px-6 text-slate-400 font-semibold w-1/4">
                    Infrastructure Dimension
                  </th>
                  <th className="py-5 px-6 text-slate-300 font-semibold w-1/4 bg-white/[0.01]">
                    In-House Human ISA
                    <span className="block text-[11px] font-normal text-rose-400 mt-0.5">
                      $4,500/mo + 15% Split
                    </span>
                  </th>
                  <th className="py-5 px-6 text-slate-300 font-semibold w-1/4">
                    Doing It Manually
                    <span className="block text-[11px] font-normal text-amber-400 mt-0.5">
                      Lost Deals &amp; Burnout
                    </span>
                  </th>
                  <th className="py-5 px-6 text-emerald-300 font-bold w-1/4 bg-emerald-500/[0.07] border-l border-emerald-500/20">
                    Zed Automation AI
                    <span className="block text-[11px] font-normal text-emerald-400 mt-0.5">
                      24/7 Instant · 0% Split · 14 Days
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row.criterion} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      {row.criterion}
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-xs bg-white/[0.01]">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{row.humanIsa}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <Minus className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{row.manualWay}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white font-mono text-xs font-semibold bg-emerald-500/[0.07] border-l border-emerald-500/20">
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
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <span>14-Day Turnkey Deployment</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">Zero Disruption to Agent Workflow</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              How We Install Your AI Revenue Recovery System
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Step 1 */}
            <div className="rounded-2xl backdrop-blur-md bg-[#11131C]/80 border border-white/10 p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">STEP 01 · DIAGNOSTIC</span>
                  <span className="text-slate-400">60 Seconds</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Step 1: Run Your Commission Audit
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Use our online calculator to identify your exact GCI bottleneck across Zillow, Realtor.com, and unworked CRM leads before committing a single dollar.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <a
                  href={AUDIT_TOOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Launch Free Commission Audit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl backdrop-blur-md bg-[#11131C]/80 border border-white/10 p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-400 font-bold">STEP 02 · ARCHITECTURE</span>
                  <span className="text-slate-400">Days 1–10</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Step 2: Custom CRM &amp; AI Integration (Days 1–10)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We plug directly into your existing CRM (Follow Up Boss, KVCore, Lofty, GHL), train the AI on your local US market scripts, and configure round-robin agent routing without disrupting your agents&apos; workflow.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                Includes A2P 10DLC carrier registration &amp; voice cloning QA
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl backdrop-blur-md bg-[#11131C]/80 border border-white/10 p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">STEP 03 · AUTONOMOUS SCALE</span>
                  <span className="text-slate-400">Day 14+</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Step 3: Go Live &amp; Scale Appointments (Day 14+)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your AI system works 24/7, turning missed calls, new portal webhooks, and cold CRM leads into booked listing and buyer consultations directly on your team&apos;s calendars.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-emerald-400">
                Real-time GCI attribution &amp; transcript logging
              </div>
            </div>
          </div>
        </div>

        {/* Secondary CTA Destination: Book a 15-Min Architecture Call */}
        <div
          id="book-call"
          className="rounded-3xl bg-[#11131C] border border-white/10 p-8 sm:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
                <Calendar className="w-4 h-4" />
                <span>Secondary Consultation Option</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Book a 15-Min Architecture Call
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Already ran your Commission Leakage Audit or managing a brokerage doing $15M+ in volume? Map out your custom Follow Up Boss / KVCore integration directly with a Senior AI Systems Architect.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live walkthrough of US real estate SMS &amp; Voice workflows</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom database reactivation yield projection for your CRM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Territory exclusivity check for your primary MLS zip codes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {bookingConfirmed ? (
                <div
                  data-testid="booking-confirmation"
                  className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-8 space-y-4"
                >
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <h3 className="text-lg font-bold text-white">
                      15-Min Architecture Call Reserved
                    </h3>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Thank you, <strong>{formState.fullName}</strong>. We have reserved{' '}
                    <span className="font-mono text-emerald-300 font-semibold">
                      {formState.selectedSlot}
                    </span>{' '}
                    for <strong>{formState.brokerageName}</strong> ({formState.currentCrm} ·{' '}
                    {formState.annualVolume}). A calendar invitation has been dispatched to{' '}
                    <span className="font-mono text-white">{formState.workEmail}</span>.
                  </p>
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <a
                      href={AUDIT_TOOL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#090A0F] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                    >
                      <span>Complete Pre-Call Commission Audit →</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(false)}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Modify booking details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="Marcus Vance"
                        value={formState.fullName}
                        onChange={(e) =>
                          setFormState({ ...formState, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#090A0F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                      {formErrors.fullName && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-brokerage"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Brokerage or Team Name *
                      </label>
                      <input
                        id="booking-brokerage"
                        type="text"
                        placeholder="Vance Luxury Realty Group"
                        value={formState.brokerageName}
                        onChange={(e) =>
                          setFormState({ ...formState, brokerageName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#090A0F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                      {formErrors.brokerageName && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {formErrors.brokerageName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="marcus@vancerealty.com"
                        value={formState.workEmail}
                        onChange={(e) =>
                          setFormState({ ...formState, workEmail: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#090A0F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                      {formErrors.workEmail && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {formErrors.workEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Mobile Number (US) *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        placeholder="(512) 555-0194"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#090A0F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-crm"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Primary Real Estate CRM
                      </label>
                      <select
                        id="booking-crm"
                        value={formState.currentCrm}
                        onChange={(e) =>
                          setFormState({ ...formState, currentCrm: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#090A0F] border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="Follow Up Boss">Follow Up Boss</option>
                        <option value="KVCore">KVCore</option>
                        <option value="Lofty (Chime)">Lofty (Chime)</option>
                        <option value="GoHighLevel">GoHighLevel</option>
                        <option value="Sierra Interactive">Sierra Interactive</option>
                        <option value="LionDesk">LionDesk</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-volume"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Annual Production Volume
                      </label>
                      <select
                        id="booking-volume"
                        value={formState.annualVolume}
                        onChange={(e) =>
                          setFormState({ ...formState, annualVolume: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#090A0F] border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="$5M – $15M / yr">$5M – $15M / yr</option>
                        <option value="$15M – $35M / yr">$15M – $35M / yr</option>
                        <option value="$35M – $75M / yr">$35M – $75M / yr</option>
                        <option value="$75M+ / yr">$75M+ / yr</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-slate-300 mb-2">
                      Select Preferred 15-Minute Architecture Window
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = formState.selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() =>
                              setFormState({ ...formState, selectedSlot: slot })
                            }
                            className={`px-3 py-2 text-xs font-mono rounded-lg border transition-colors whitespace-nowrap truncate ${
                              isSelected
                                ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 font-semibold'
                                : 'bg-[#090A0F] border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-[0_0_25px_rgba(99,102,241,0.35)] whitespace-nowrap shrink-0"
                    >
                      Confirm 15-Min Architecture Call →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
