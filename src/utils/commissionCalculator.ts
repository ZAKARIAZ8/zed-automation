export const AUDIT_TOOL_URL = 'https://zed-automation-1.vercel.app/commission-audit';

export interface LeakageInput {
  annualTransactions: number;
  avgSalePrice: number;
  commissionRate: number;
  outboundReferrals: number;
}

export interface LeakageOutput {
  totalVolume: number;
  totalGrossGci: number;
  splitAndCapLeakage: number;
  uncollectedReferralLeakage: number;
  totalRecoverableGci: number;
}

export function calculateCommissionLeakage(input: LeakageInput): LeakageOutput {
  const totalVolume = input.annualTransactions * input.avgSalePrice;
  const totalGrossGci = Math.round(totalVolume * (input.commissionRate / 100));

  // Industry benchmark: ~3.2% of GCI leaks via post-cap overpayments, double royalty deductions, and CD shortfalls
  const splitAndCapLeakage = Math.round(totalGrossGci * 0.032);

  // Average outbound referral fee is 25% of one side's GCI; ~22% of outbound referrals go uncollected or untracked at closing
  const avgSingleSideGci = input.avgSalePrice * (input.commissionRate / 100);
  const avgReferralCheck = avgSingleSideGci * 0.25;
  const uncollectedReferralLeakage = Math.round(
    input.outboundReferrals * 0.22 * avgReferralCheck
  );

  const totalRecoverableGci = splitAndCapLeakage + uncollectedReferralLeakage;

  return {
    totalVolume,
    totalGrossGci,
    splitAndCapLeakage,
    uncollectedReferralLeakage,
    totalRecoverableGci,
  };
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

export function validateArchitectureCallForm(
  input: ArchitectureCallFormInput
): ValidationResult {
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
