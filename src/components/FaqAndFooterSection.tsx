import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

interface FaqAndFooterSectionProps {
  onOpenAuditModal: () => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do we really never have to get on a 45-minute Zoom sales call?',
    answer:
      'Correct. Managing Brokers and Broker-Owners are busy running offices and reviewing contracts. You simply drop an anonymized 90-day export from SkySlope, Dotloop, Brokermint, or LoneWolf, and our audit engineers send you a complete line-by-line written PDF and interactive ledger via Email, LinkedIn, or SMS/WhatsApp within 24 hours.',
  },
  {
    id: 'faq-2',
    question: 'How does the Zed Audit Engine catch post-cap and split errors?',
    answer:
      'We ingest your agent commission plan rules (anniversary dates, tiered splits, franchise royalties, E&O caps, and transaction coordinator fees) and cross-verify every Closing Disclosure (CD / ALTA statement) and Disbursement Authorization against actual title wire receipts.',
  },
  {
    id: 'faq-3',
    question: 'How do you track uncollected outbound referral agreements?',
    answer:
      'Our engine matches your signed outbound W-9 referral agreements against nationwide MLS sold records and public county deed recordings. The moment a referred client closes at an external brokerage without a corresponding incoming wire in your ledger, we flag the exact dollar receivable and generate the collection notice.',
  },
  {
    id: 'faq-4',
    question: 'Do you take a percentage split of the leaked GCI you uncover?',
    answer:
      'No. Your 90-day historical lookback audit is 100% free, and you keep 100% of every dollar of uncollected referrals and split adjustments we uncover. Ongoing automated monthly protection is billed as a flat, predictable software & audit retainer.',
  },
];

export const FaqAndFooterSection: React.FC<FaqAndFooterSectionProps> = ({
  onOpenAuditModal,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const steps = [
    {
      stepTag: 'STEP 01 · ZERO IT SETUP',
      title: 'Step 1: Drop Your Last 90 Days of Closings (CSV or Read-Only API)',
      description:
        'Export a simple closed-deals CSV from SkySlope, Dotloop, Brokermint, or LoneWolf. No complex IT setup, agent training, or workflow disruption needed.',
      footnote: 'Takes < 3 minutes · Anonymized exports supported',
      icon: UploadCloud,
    },
    {
      stepTag: 'STEP 02 · 24-HOUR TURNAROUND',
      title: 'Step 2: Receive Your Written Line-by-Line Audit in 24 Hours',
      description:
        'We run your data through the Zed Audit Engine and message you a comprehensive written PDF and interactive dashboard report showing every dollar of overpaid splits, missed cap dates, and uncollected referrals.',
      footnote: 'Delivered directly via Email, LinkedIn, or SMS/WhatsApp',
      icon: FileText,
    },
    {
      stepTag: 'STEP 03 · 100% ASYNC PROTECTION',
      title: 'Step 3: Automated Monthly Protection',
      description:
        'Keep 100% of what we uncover. Deploy our automated monthly audit workflow for a flat monthly retainer—handled entirely via async updates without a single wasted Zoom meeting.',
      footnote: 'Flat retainer · Keep 100% of recovered GCI',
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      {/* SECTION 5: How Our "Zero-Call, Zero-Disruption" System Works */}
      <section
        id="zero-call-pilot"
        className="py-20 bg-[#080A0F] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span>Zero-Call Asynchronous Onboarding</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">Built for Busy US Managing Brokers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              How Our &ldquo;Zero-Call, Zero-Disruption&rdquo; System Works
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We eliminated the 45-minute SaaS discovery call. Test our audit accuracy on your actual historical closings entirely via text and email.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <article
                  key={step.stepTag}
                  className="rounded-2xl bg-[#111520] border border-white/10 p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {step.stepTag}
                      </span>
                      <IconComponent className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                    {step.footnote}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="rounded-2xl bg-[#111520] border border-emerald-500/30 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-emerald-400 font-semibold">
                FREE 90-DAY HISTORICAL LOOKBACK PILOT
              </div>
              <h3 className="text-xl font-bold text-white">
                Want to see every leaked dollar from last quarter without booking a call?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Request your secure upload link and receive a written line-by-line audit report within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAuditModal}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Request a Free 90-Day Historical Lookback Audit</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#080A0F] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-indigo-400">
              <span>Brokerage Accounting &amp; Compliance FAQ</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">Zero-Call Audit Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#111520] border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqId((prev) => (prev === item.id ? '' : item.id))
                    }
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
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
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#080A0F] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white tracking-tight">
              ZED AUTOMATION
            </span>
            <span aria-hidden="true">·</span>
            <span>US Real Estate Commission Audit &amp; Leakage Detection</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#overview" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#calculator" className="hover:text-white transition-colors">
              Instant GCI Calculator
            </a>
            <a href="#auditor" className="hover:text-white transition-colors">
              Live Transaction Auditor
            </a>
            <a href="#zero-call-pilot" className="hover:text-white transition-colors">
              Zero-Call Pilot
            </a>
            <button
              type="button"
              onClick={onOpenAuditModal}
              className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              Request Written Audit →
            </button>
          </div>

          <p className="text-slate-400">
            © 2026 Zed Automation. Built for US Managing Brokers &amp; Team Leaders.
          </p>
        </div>
      </footer>
    </>
  );
};
