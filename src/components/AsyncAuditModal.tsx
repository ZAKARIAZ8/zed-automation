import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageSquare,
  Linkedin,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import {
  AsyncAuditRequestInput,
  validateAsyncAuditRequest,
  formatCurrency,
} from '../utils/commissionCalculator';

interface AsyncAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimatedRecoverableGci: number;
}

export const AsyncAuditModal: React.FC<AsyncAuditModalProps> = ({
  isOpen,
  onClose,
  estimatedRecoverableGci,
}) => {
  const [formState, setFormState] = useState<AsyncAuditRequestInput>({
    fullNameAndRole: '',
    brokerageNameAndState: '',
    preferredChannel: 'Work Email',
    contactHandle: '',
    transactionSystem: 'SkySlope',
    monthlyDealVolume: '15 – 40 Closings / Mo',
  });
  const [sampleCsvName, setSampleCsvName] = useState<string>('');
  const [errors, setErrors] = useState<
    Partial<Record<keyof AsyncAuditRequestInput, string>>
  >({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAsyncAuditRequest(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const channels: {
    id: AsyncAuditRequestInput['preferredChannel'];
    label: string;
    placeholder: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    {
      id: 'Work Email',
      label: 'Work Email',
      placeholder: 'broker@yourrealtygroup.com',
      icon: Mail,
    },
    {
      id: 'LinkedIn Message',
      label: 'LinkedIn Message',
      placeholder: 'linkedin.com/in/yourprofile',
      icon: Linkedin,
    },
    {
      id: 'SMS / WhatsApp',
      label: 'SMS / WhatsApp',
      placeholder: '(512) 555-0194',
      icon: MessageSquare,
    },
  ];

  const activeChannelMeta =
    channels.find((c) => c.id === formState.preferredChannel) || channels[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="async-audit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111520] border border-white/15 p-6 sm:p-8 shadow-2xl my-auto">
        {/* Top Bar inside Modal */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400">
              ASYNCHRONOUS 90-DAY HISTORICAL LOOKBACK · ZERO SALES CALLS
            </span>
            <h2
              id="async-audit-modal-title"
              className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug"
            >
              Get Your Free 90-Day Brokerage Leakage Audit (100% Via Email / Text — No Sales Calls)
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close audit request modal"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div
            data-testid="async-modal-confirmation"
            className="py-8 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Asynchronous Audit Setup Link Dispatched
                  </h3>
                  <p className="text-xs font-mono text-emerald-300">
                    Delivery Channel: {formState.preferredChannel} ({formState.contactHandle})
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                Thank you, <strong>{formState.fullNameAndRole}</strong> at{' '}
                <strong>{formState.brokerageNameAndState}</strong>. We have sent your encrypted read-only{' '}
                <strong>{formState.transactionSystem}</strong> export instructions directly via{' '}
                <strong>{formState.preferredChannel}</strong>. No Zoom call will be scheduled.
              </p>

              <div className="p-4 rounded-xl bg-[#080A0F] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-400 block">
                    Your Projected Annual Recoverable GCI:
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">
                    {formatCurrency(estimatedRecoverableGci)} / yr
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-300 sm:text-right">
                  <div>Est. Report Turnaround: &lt; 24 Hours</div>
                  {sampleCsvName && (
                    <div className="text-indigo-300 mt-0.5">
                      Attached CSV: {sampleCsvName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white underline cursor-pointer"
              >
                Edit Request Details
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
              >
                Return to Live Audit Sandbox
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="pt-6 space-y-5">
            {/* Estimated Recoverable Banner inside Modal */}
            <div className="p-3.5 rounded-xl bg-[#080A0F] border border-emerald-500/30 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-300">
                Targeting Estimated Recoverable GCI:
              </span>
              <span className="text-base font-extrabold font-mono text-emerald-400">
                {formatCurrency(estimatedRecoverableGci)} / yr
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="async-name-role"
                  className="block text-xs font-semibold text-slate-200 mb-1.5"
                >
                  Full Name &amp; Role *
                </label>
                <input
                  id="async-name-role"
                  type="text"
                  placeholder="Marcus Vance — Managing Broker"
                  value={formState.fullNameAndRole}
                  onChange={(e) =>
                    setFormState({ ...formState, fullNameAndRole: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#080A0F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
                {errors.fullNameAndRole && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.fullNameAndRole}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="async-brokerage-state"
                  className="block text-xs font-semibold text-slate-200 mb-1.5"
                >
                  Brokerage Name &amp; State *
                </label>
                <input
                  id="async-brokerage-state"
                  type="text"
                  placeholder="Vance Luxury Realty (TX)"
                  value={formState.brokerageNameAndState}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      brokerageNameAndState: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#080A0F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
                {errors.brokerageNameAndState && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.brokerageNameAndState}
                  </p>
                )}
              </div>
            </div>

            {/* Preferred Async Channel Selector */}
            <div>
              <span className="block text-xs font-semibold text-slate-200 mb-1.5">
                Preferred Async Delivery Channel (Zero Phone Pitch) *
              </span>
              <div className="grid grid-cols-3 gap-2">
                {channels.map((ch) => {
                  const IconComponent = ch.icon;
                  const isSelected = formState.preferredChannel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() =>
                        setFormState({ ...formState, preferredChannel: ch.id })
                      }
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/25 border-indigo-400 text-white'
                          : 'bg-[#080A0F] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{ch.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Handle / Email / Phone */}
            <div>
              <label
                htmlFor="async-contact-handle"
                className="block text-xs font-semibold text-slate-200 mb-1.5"
              >
                {formState.preferredChannel} Destination *
              </label>
              <input
                id="async-contact-handle"
                type="text"
                placeholder={activeChannelMeta.placeholder}
                value={formState.contactHandle}
                onChange={(e) =>
                  setFormState({ ...formState, contactHandle: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#080A0F] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
              />
              {errors.contactHandle && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.contactHandle}
                </p>
              )}
            </div>

            {/* Current Transaction Management System & Monthly Deal Volume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="async-tms"
                  className="block text-xs font-semibold text-slate-200 mb-1.5"
                >
                  Current Transaction Management System
                </label>
                <select
                  id="async-tms"
                  value={formState.transactionSystem}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      transactionSystem: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#080A0F] border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="SkySlope">SkySlope</option>
                  <option value="Dotloop">Dotloop</option>
                  <option value="Brokermint / LoneWolf">Brokermint / LoneWolf</option>
                  <option value="Follow Up Boss">Follow Up Boss</option>
                  <option value="Spreadsheet / Other">Spreadsheet / Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="async-volume"
                  className="block text-xs font-semibold text-slate-200 mb-1.5"
                >
                  Monthly Deal Volume
                </label>
                <select
                  id="async-volume"
                  value={formState.monthlyDealVolume}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      monthlyDealVolume: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#080A0F] border border-white/10 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="5 – 15 Closings / Mo">5 – 15 Closings / Mo</option>
                  <option value="15 – 40 Closings / Mo">15 – 40 Closings / Mo</option>
                  <option value="40 – 100 Closings / Mo">40 – 100 Closings / Mo</option>
                  <option value="100+ Closings / Mo">100+ Closings / Mo</option>
                </select>
              </div>
            </div>

            {/* Optional Sample Anonymized CSV Upload */}
            <div className="p-3.5 rounded-xl bg-[#080A0F] border border-dashed border-white/15 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <FileSpreadsheet className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  {sampleCsvName
                    ? `Attached: ${sampleCsvName}`
                    : 'Optional: Attach sample anonymized 90-day closings CSV'}
                </span>
              </div>
              <label className="px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 rounded-lg cursor-pointer whitespace-nowrap shrink-0 transition-colors">
                <span>Choose CSV</span>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSampleCsvName(file.name);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all duration-150 shadow-[0_0_28px_rgba(16,185,129,0.35)] cursor-pointer"
              >
                <span>Send My Free Audit Setup Link →</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
