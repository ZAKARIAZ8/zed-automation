import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { AUDIT_TOOL_URL } from '../utils/commissionCalculator';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Does the AI sound robotic to high-end home buyers and sellers?',
    answer:
      'No. Our infrastructure is trained specifically on localized US real estate phrasing, market nuances, and conversational cadence—not generic customer support scripts. It references the exact property address, neighborhood comps, and listing details naturally via SMS and voice, then executes a warm handoff directly onto your senior agent’s calendar the moment the prospect is pre-approved and ready to tour or list.',
  },
  {
    id: 'faq-2',
    question: 'Which Real Estate CRMs do you integrate with?',
    answer:
      'We provide native, two-way API and webhook integrations with Follow Up Boss, KVCore, Lofty (formerly Chime), GoHighLevel, LionDesk, and Sierra Interactive. Every SMS thread, call recording, qualification summary, and calendar appointment syncs automatically to the lead’s contact record in real time.',
  },
  {
    id: 'faq-3',
    question: 'Do you take a percentage of our commission (GCI split)?',
    answer:
      'Never. Unlike in-house Inside Sales Agents who demand 10–15% splits or referral networks like Zillow Flex and OpCity that take 25–40% at the closing table, Zed Automation operates on a flat infrastructure license. You keep 100% of your recovered Gross Commission Income.',
  },
  {
    id: 'faq-4',
    question: 'How fast can we launch?',
    answer:
      'Full deployment, CRM pipeline integration, A2P 10DLC carrier compliance, custom script calibration, and end-to-end quality assurance testing are completed within 14 days.',
  },
];

export const FaqAndFooterSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  return (
    <>
      {/* Part H: Real Estate FAQ Section (Interactive Accordion) */}
      <section id="faq" className="py-24 bg-[#090A0F] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-emerald-400">
              <span>Brokerage Due Diligence</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">Frequently Asked Questions</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Answers to Top US Broker &amp; Team Leader Questions
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl backdrop-blur-md bg-[#11131C]/90 border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-content`}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <span className="text-base font-bold text-white flex items-center gap-3">
                      <span className="font-mono text-xs text-emerald-400">
                        0{idx + 1}.
                      </span>
                      <span>{item.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`${item.id}-content`}
                      className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Part I: High-Converting Footer & Final CTA */}
      <footer className="bg-[#090A0F] pt-20 pb-14 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-gradient-to-t from-emerald-500/15 via-indigo-500/10 to-transparent blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          {/* Final Bold Callout Banner */}
          <div className="rounded-3xl backdrop-blur-xl bg-gradient-to-b from-[#131724] to-[#0C0E16] border border-white/10 p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Stop Losing Deals to Faster Competitors
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Ready to Recover Your Unclaimed Commissions?
            </h2>

            <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              See exactly how much GCI your brokerage is leaking every month—and how our 24/7 Speed-to-Lead &amp; Database Reactivation infrastructure locks those closings back onto your calendar in 14 days.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={AUDIT_TOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-bold text-[#090A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all duration-150 shadow-[0_0_35px_rgba(16,185,129,0.4)] whitespace-nowrap shrink-0"
              >
                <span>Run Your Free Commission Audit Now</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="#book-call"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Book a 15-Min Architecture Call</span>
              </a>
            </div>
          </div>

          {/* Quiet Footer Bottom Bar */}
          <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-6 h-6 rounded-md bg-emerald-400 flex items-center justify-center text-[#090A0F] font-extrabold font-mono text-xs"
              >
                Z
              </span>
              <span className="font-bold text-white">Zed Automation</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous AI Revenue Recovery</span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a href="#problem" className="hover:text-white transition-colors">
                The Problem
              </a>
              <a href="#infrastructure" className="hover:text-white transition-colors">
                AI Infrastructure
              </a>
              <a href="#roi-audit" className="hover:text-white transition-colors">
                Live ROI Audit
              </a>
              <a href="#case-studies" className="hover:text-white transition-colors">
                Case Studies
              </a>
              <a
                href={AUDIT_TOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
              >
                <span>Commission Audit Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-slate-400 text-center sm:text-right">
              © 2026 Zed Automation. Built for High-Performing US Real Estate Teams.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
