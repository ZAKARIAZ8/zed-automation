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
