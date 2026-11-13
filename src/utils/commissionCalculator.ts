export const AUDIT_TOOL_URL = 'https://zed-automation-1.vercel.app/commission-audit';

export interface AuditInput {
  monthlyLeads: number;
  avgHomePrice: number;
  commissionRatePercent: number; // default 2.75%
  responseTimeMinutes: number;
  deadCrmContacts: number;
}

export interface AuditResult {
  avgCommissionPerDeal: number;
  leakageRatePercent: number;
  monthlyLeakedDeals: number;
  monthlyLeakedGci: number;
  annualLeakedGci: number;
  recoverable30DayGci: number;
  reactivatedDatabaseDeals: number;
  qualificationOddsDropPercent: number;
}

/**
 * Calculates brokerage GCI leakage based on MIT/InsideSales & NAR real estate speed-to-lead decay curves.
 */
export function calculateCommissionLeakage(input: AuditInput): AuditResult {
  const safeLeads = Math.max(10, Math.min(5000, Math.round(input.monthlyLeads)));
  const safePrice = Math.max(150000, Math.min(5000000, Math.round(input.avgHomePrice)));
  const safeCommRate = Math.max(1.5, Math.min(6.0, input.commissionRatePercent));
  const safeResponseMin = Math.max(1, Math.min(240, input.responseTimeMinutes));
  const safeDeadContacts = Math.max(0, Math.min(100000, Math.round(input.deadCrmContacts)));

  const avgCommissionPerDeal = Math.round(safePrice * (safeCommRate / 100));

  // Response time decay curve:
  // <= 1 min: 5% leakage
  // 5 mins: ~30% GCI leakage (80% drop in qualification odds)
  // 15 mins: ~42% GCI leakage
  // 30+ mins: ~54% GCI leakage
  let leakageRatePercent = 12;
  let qualificationOddsDropPercent = 25;

  if (safeResponseMin <= 1) {
    leakageRatePercent = 6;
    qualificationOddsDropPercent = 10;
  } else if (safeResponseMin < 5) {
    leakageRatePercent = 18;
    qualificationOddsDropPercent = 45;
  } else if (safeResponseMin < 15) {
    leakageRatePercent = 30;
    qualificationOddsDropPercent = 80;
  } else if (safeResponseMin < 30) {
    leakageRatePercent = 38;
    qualificationOddsDropPercent = 86;
  } else if (safeResponseMin < 60) {
    leakageRatePercent = 45;
    qualificationOddsDropPercent = 91;
  } else {
    leakageRatePercent = 52;
    qualificationOddsDropPercent = 95;
  }

  // Baseline top-performing conversion rate with <45s AI speed-to-lead is ~3.8% of portal/meta leads
  const optimalMonthlyDeals = safeLeads * 0.038;
  const rawLeakedDeals = optimalMonthlyDeals * (leakageRatePercent / 100);
  const monthlyLeakedDeals = Math.max(0.5, Math.round(rawLeakedDeals * 10) / 10);

  const monthlyLeakedGci = Math.round(monthlyLeakedDeals * avgCommissionPerDeal);
  const annualLeakedGci = monthlyLeakedGci * 12;

  // Database reactivation yields ~0.18% closed listings/buyers in first 30 days from dormant leads
  const reactivatedDatabaseDeals = Math.round(safeDeadContacts * 0.0018 * 10) / 10;
  const databaseRecoveryGci = Math.round(reactivatedDatabaseDeals * avgCommissionPerDeal);

  // 30-day recoverable GCI combines speed-to-lead capture (82% recovery efficiency) + initial database reactivation wave
  const recoverable30DayGci = Math.round(monthlyLeakedGci * 0.82 + databaseRecoveryGci * 0.5);

  return {
    avgCommissionPerDeal,
    leakageRatePercent,
    monthlyLeakedDeals,
    monthlyLeakedGci,
    annualLeakedGci,
    recoverable30DayGci,
    reactivatedDatabaseDeals,
    qualificationOddsDropPercent,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface ArchitectureCallFormInput {
  fullName: string;
  brokerageName: string;
  workEmail: string;
  phone: string;
  currentCrm: string;
  annualVolume: string;
  selectedSlot: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ArchitectureCallFormInput, string>>;
}

export function validateArchitectureCallForm(input: ArchitectureCallFormInput): ValidationResult {
  const errors: Partial<Record<keyof ArchitectureCallFormInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!input.brokerageName || input.brokerageName.trim().length < 2) {
    errors.brokerageName = 'Please enter your brokerage or team name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.workEmail || !emailRegex.test(input.workEmail.trim())) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  const digitsOnly = (input.phone || '').replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    errors.phone = 'Please enter a valid 10-digit US phone number.';
  }

  if (!input.currentCrm) {
    errors.currentCrm = 'Please select your primary CRM.';
  }

  if (!input.annualVolume) {
    errors.annualVolume = 'Please select your team annual volume.';
  }

  if (!input.selectedSlot) {
    errors.selectedSlot = 'Please choose a 15-minute architecture slot.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
