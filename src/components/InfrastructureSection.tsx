import React, { useState } from 'react';
import {
  PhoneOutgoing,
  RefreshCw,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Volume2,
  ArrowUpRight,
} from 'lucide-react';
import { AUDIT_TOOL_URL } from '../utils/commissionCalculator';

export const InfrastructureSection: React.FC = () => {
  const [activeTranscriptTab, setActiveTranscriptTab] = useState<'sms' | 'voice'>('sms');

  const caseStudies = [
    {
      team: 'Vance Luxury Realty Group',
      market: 'Austin, TX · 14 Agents',
      crm: 'Follow Up Boss',
      metric: '+$184,500',
      metricLabel: 'Recovered GCI in First 90 Days',
      beforeAfter:
        'Cut Zillow Premier response time from 19 minutes to 27 seconds. Reactivated 4,100 old buyer leads into 11 closed transactions without adding ISA headcount.',
      person: 'Marcus Vance, Managing Broker',
    },
    {
      team: 'Apex Metro Realty Partners',
      market: 'Scottsdale, AZ · 22 Agents',
      crm: 'KVCore',
      metric: '3.6x',
      metricLabel: 'Increase in Qualified Listing Consults',
      beforeAfter:
        'Replaced two burned-out human ISAs ($9,200/mo payroll) with Zed Automation. Automated SMS check-ins surfaced 19 homeowners ready to list within 60 days.',
      person: 'Lauren Sterling, Team Leader ($48M Volume)',
    },
    {
      team: 'Crowned Oak Properties',
      market: 'Charlotte, NC · 9 Agents',
      crm: 'Lofty (Chime)',
      metric: '31 Sec',
      metricLabel: '24/7 Median Speed-to-Lead',
      beforeAfter:
        'Captured 100% of after-hours Realtor.com and Meta inquiries between 8 PM and 7 AM. Locked $96,400 in net commission during the first 45 days post-deployment.',
      person: 'Devon Brooks, Principal Broker',
    },
  ];

  return (
    <section id="infrastructure" className="py-24 bg-[#090A0F] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {/* Part 1: 3-Pillar Autonomous ISA Infrastructure */}
        <div>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <span>The Zed Automation Infrastructure</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">3-Pillar Revenue Recovery Architecture</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              A Complete Autonomous ISA Team Installed in{' '}
              <span className="text-emerald-400 font-mono">14 Days</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              We don&apos;t sell generic web chatbots. We engineer a custom, multi-channel Speed-to-Lead and Database Reactivation infrastructure wired directly into your brokerage CRM.
            </p>
          </div>

          {/* Asymmetric Bento Grid (col-span-7 + col-span-5, then full-width Pillar 3) */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Pillar 1: Sub-60-Second Speed-to-Lead Engine (col-span-7) */}
            <div className="lg:col-span-7 rounded-2xl backdrop-blur-md bg-[#11131C]/90 border border-white/10 p-7 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    01. PILLAR ONE · SPEED-TO-LEAD ENGINE
                  </span>
                  <PhoneOutgoing className="w-5 h-5 text-emerald-400" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Sub-60-Second Speed-to-Lead Engine
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Instant multi-channel outreach (AI SMS + Conversational AI Voice) the moment a lead hits your CRM from Zillow, Realtor.com, Homes.com, or Facebook Ads. While competing agents are still driving to a showing, our AI is already qualifying your prospect.
                </p>
              </div>

              {/* Interactive UI Visual Representation: SMS vs Voice Outreach Inspector */}
              <div className="rounded-xl bg-[#090A0F] border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTranscriptTab('sms')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        activeTranscriptTab === 'sms'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>2-Way AI SMS (0:18s)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTranscriptTab('voice')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        activeTranscriptTab === 'voice'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>AI Voice Call (0:41s)</span>
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    Source: Zillow Premier Webhook
                  </span>
                </div>

                {activeTranscriptTab === 'sms' ? (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-slate-200">
                      <span className="font-mono text-[11px] text-emerald-400 block mb-1">
                        Zed AI Assistant · Sent in 18s
                      </span>
                      &ldquo;Hi David, saw you just requested details on 4820 Barton Creek Blvd on Zillow. Are you looking to tour this weekend, or still comparing neighborhoods in West Austin?&rdquo;
                    </div>
                    <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-slate-100 ml-6">
                      <span className="font-mono text-[11px] text-indigo-300 block mb-1">
                        Buyer Prospect · 0:54s
                      </span>
                      &ldquo;We&apos;d love to see it Saturday morning! We&apos;re already pre-approved up to $620k and relocating next month.&rdquo;
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-slate-200">
                      <span className="font-mono text-[11px] text-indigo-300 block mb-1">
                        Conversational AI Voice Outbound · Connected at 0:41s
                      </span>
                      &ldquo;Hey David, calling from Vance Realty regarding your inquiry on Barton Creek Blvd. Our senior partner has a private showing window open this Saturday at 11 AM—shall I lock that in and text you the disclosure packet?&rdquo;
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 pt-1">
                      <span>Call Disposition: Qualified Buyer (Pre-Approved)</span>
                      <span>Duration: 1m 48s</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pillar 2: Dead Database Reactivation Campaigns (col-span-5) */}
            <div className="lg:col-span-5 rounded-2xl backdrop-blur-md bg-[#11131C]/90 border border-white/10 p-7 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-indigo-400">
                    02. PILLAR TWO · DATABASE MINING
                  </span>
                  <RefreshCw className="w-5 h-5 text-indigo-400" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Dead Database Reactivation Campaigns
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  We scan your old CRM contacts (6–36 months old) and run natural, human-like SMS check-ins that turn &ldquo;cold leads&rdquo; into active listing appointments without spending $1 on new ads.
                </p>
              </div>

              {/* Clean UI Visual Representation: CRM Mining Funnel */}
              <div className="rounded-xl bg-[#090A0F] border border-white/10 p-5 space-y-3.5">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                  <span className="font-semibold text-slate-200">Dormant CRM Audit Batch</span>
                  <span className="font-mono text-emerald-400">$0 Ad Spend</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-slate-300">Aged Contacts Scanned (6–36 Mos)</span>
                    <span className="font-mono font-bold text-white">3,400 Leads</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-slate-300">Active 2-Way SMS Replies</span>
                    <span className="font-mono font-bold text-indigo-300">618 Conversations</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-emerald-200 font-medium">Booked Listing / Buyer Consults</span>
                    <span className="font-mono font-bold text-emerald-400">24 Appointments</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3: Automated Qualification & Calendar Booking (col-span-12) */}
            <div className="lg:col-span-12 rounded-2xl backdrop-blur-md bg-[#11131C]/90 border border-white/10 p-7 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                    <Calendar className="w-4 h-4" />
                    <span>03. PILLAR THREE · QUALIFICATION &amp; CALENDAR HANDOFF</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Automated Qualification &amp; Calendar Booking
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Our AI asks the hard questions (timeline, pre-approval status, property criteria, sell-to-buy needs) and only books qualified prospects directly onto your agents&apos; calendars with a full summary pushed to your CRM.
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Mortgage Pre-Approval Check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Move Timeline (30–90 Days)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Current Home To Sell Audit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Exclusive Representation Check</span>
                    </div>
                  </div>
                </div>

                {/* Structured CRM Payload Visual Card */}
                <div className="lg:col-span-6 rounded-xl bg-[#090A0F] border border-white/10 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 block">
                        CRM Note + Calendar Event Created
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        Buyer &amp; Listing Consultation · Round-Robin Assigned
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Sync Latency: 0.4s
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-slate-400 block">Pre-Approval</span>
                      <span className="font-mono font-semibold text-emerald-400 mt-0.5 block">
                        Verified $650k
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-slate-400 block">Timeline</span>
                      <span className="font-mono font-semibold text-white mt-0.5 block">
                        30–45 Days
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-slate-400 block">Sell-to-Buy</span>
                      <span className="font-mono font-semibold text-indigo-300 mt-0.5 block">
                        Yes ($480k Est)
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-slate-400 block">Signed Agent?</span>
                      <span className="font-mono font-semibold text-emerald-400 mt-0.5 block">
                        Unrepresented
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Adjacent Proof / Case Studies Section (#case-studies) */}
        <div id="case-studies" className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <span>Verified Brokerage Outcomes</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400 font-mono">US Real Estate Production Proof</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Real GCI Recovered Across US Brokerages &amp; Teams
              </h2>
            </div>

            <a
              href={AUDIT_TOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Run Your Brokerage GCI Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {caseStudies.map((study) => (
              <article
                key={study.team}
                className="rounded-2xl backdrop-blur-md bg-[#11131C]/80 border border-white/10 p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
                    <span>{study.market}</span>
                    <span className="font-mono text-indigo-300">CRM: {study.crm}</span>
                  </div>

                  <div>
                    <div className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
                      {study.metric}
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      {study.metricLabel}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    &ldquo;{study.beforeAfter}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs">
                  <div className="font-bold text-white">{study.team}</div>
                  <div className="text-slate-400 mt-0.5">{study.person}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
