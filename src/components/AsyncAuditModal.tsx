import React, { useState } from 'react';
import {
  X,
  Mail,
  MessageSquare,
  Linkedin,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface AsyncAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimatedLeakage?: number;
}

export const AsyncAuditModal: React.FC<AsyncAuditModalProps> = ({
  isOpen,
  onClose,
  estimatedLeakage,
}) => {
  const [fullName, setFullName] = useState('');
  const [brokerageName, setBrokerageName] = useState('');
  const [channel, setChannel] = useState<'email' | 'linkedin' | 'sms'>('email');
  const [contactHandle, setContactHandle] = useState('');
  const [crmSystem, setCrmSystem] = useState('SkySlope');
  const [monthlyDeals, setMonthlyDeals] = useState('15–40 closings/mo');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#111520] border border-white/15 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% ASYNCHRONOUS • ZERO SALES CALLS</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Request Your Free 90-Day Written Commission Audit
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              No Zoom pitches. Tell us where to send your secure CSV upload instructions, and we will message back your line-by-line leakage breakdown within 24 hours.
            </p>

            {estimatedLeakage && estimatedLeakage > 0 ? (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <span className="text-xs text-emerald-300">
                  Target Recoverable GCI Identified:
                </span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  ${estimatedLeakage.toLocaleString()}
                </span>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name & Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Miller, Managing Broker"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Brokerage / Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Realty Group (TX)"
                    value={brokerageName}
                    onChange={(e) => setBrokerageName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Where should we send your written audit report? *
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setChannel('email')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      channel === 'email'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                        : 'bg-[#080A0F] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Work Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('linkedin')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      channel === 'linkedin'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                        : 'bg-[#080A0F] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn DM</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('sms')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      channel === 'sms'
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                        : 'bg-[#080A0F] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>SMS / WhatsApp</span>
                  </button>
                </div>

                <input
                  type={channel === 'email' ? 'email' : 'text'}
                  required
                  placeholder={
                    channel === 'email'
                      ? 'broker@yourbrokerage.com'
                      : channel === 'linkedin'
                      ? 'linkedin.com/in/your-profile'
                      : '+1 (555) 234-5678'
                  }
                  value={contactHandle}
                  onChange={(e) => setContactHandle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Transaction / Back-Office Tool
                  </label>
                  <select
                    value={crmSystem}
                    onChange={(e) => setCrmSystem(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="SkySlope">SkySlope</option>
                    <option value="Dotloop">Dotloop</option>
                    <option value="Brokermint / LoneWolf">
                      Brokermint / LoneWolf
                    </option>
                    <option value="Follow Up Boss">Follow Up Boss</option>
                    <option value="KVCore / Lofty">KVCore / Lofty</option>
                    <option value="Excel / CSV Spreadsheets">
                      Excel / CSV Spreadsheets
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Monthly Closed Sides
                  </label>
                  <select
                    value={monthlyDeals}
                    onChange={(e) => setMonthlyDeals(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="5–15 closings/mo">5–15 closings/mo</option>
                    <option value="15–40 closings/mo">15–40 closings/mo</option>
                    <option value="40–100 closings/mo">40–100 closings/mo</option>
                    <option value="100+ closings/mo">100+ closings/mo</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Send My Written Audit Instructions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Written Audit Request Queued
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{fullName}</span>. We are sending your secure {crmSystem} CSV export template to{' '}
              <span className="text-emerald-400 font-mono">{contactHandle}</span>{' '}
              via {channel.toUpperCase()}.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-[#080A0F] border border-white/10 text-left text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <FileText className="w-4 h-4" />
                <span>What Happens Next (Zero Calls):</span>
              </div>
              <p>1. Reply with your anonymized 90-day closing export.</p>
              <p>
                2. Our v2.5 Audit Engine scans every split tier, cap reset, and outbound referral.
              </p>
              <p>
                3. You receive a full written PDF & CSV recovery report within 24 hours.
              </p>
            </div>
            <button
              onClick={resetAndClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors"
            >
              Return to Audit Sandbox
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
