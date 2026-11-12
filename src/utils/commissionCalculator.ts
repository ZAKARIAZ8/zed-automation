export interface LeakageEstimatorInput {
  annualTransactions: number; // 20 to 1500, default 180
  avgSalePrice: number; // 200,000 to 1,500,000, default 450,000
  avgCommissionPercent: number; // 2.0 to 3.5, default 2.75
  outboundReferrals: number; // 5 to 100, default 18
}

export interface LeakageEstimatorOutput {
  totalAnnualVolume: number;
  avgGciPerDeal: number;
  totalAnnualGci: number;
  splitAndCapLeakage: number; // 3.2% of GCI
  uncollectedReferralLeakage: number;
  totalRecoverableNetRevenue: number;
}

/**
 * Computes real-time 30-Second Brokerage Leakage Estimator metrics.
 */
export function calculateBrokerageLeakage(
  input: LeakageEstimatorInput
): LeakageEstimatorOutput {
  const safeTransactions = Math.max(20, Math.min(1500, Math.round(input.annualTransactions)));
  const safePrice = Math.max(200000, Math.min(1500000, Math.round(input.avgSalePrice)));
  const safeCommPercent = Math.max(2.0, Math.min(3.5, Number(input.avgCommissionPercent)));
  const safeReferrals = Math.max(5, Math.min(100, Math.round(input.outboundReferrals)));

  const totalAnnualVolume = safeTransactions * safePrice;
  const avgGciPerDeal = safePrice * (safeCommPercent / 100);
  const totalAnnualGci = Math.round(safeTransactions * avgGciPerDeal);

  // 3.2% Est. Split & Cap Calculation Leakage
  const splitAndCapLeakage = Math.round(totalAnnualGci * 0.032);

  // Outbound referral fee is typically 25% of 1 side GCI; ~22% of outbound referrals go uncollected or underpaid without automated tracking
  const avgReferralFee = avgGciPerDeal * 0.25;
  const uncollectedReferralLeakage = Math.round(safeReferrals * avgReferralFee * 0.22);

  const totalRecoverableNetRevenue = splitAndCapLeakage + uncollectedReferralLeakage;

  return {
    totalAnnualVolume,
    avgGciPerDeal: Math.round(avgGciPerDeal),
    totalAnnualGci,
    splitAndCapLeakage,
    uncollectedReferralLeakage,
    totalRecoverableNetRevenue,
  };
}

export type AuditIssueCategory =
  | 'split_cap'
  | 'uncollected_referral'
  | 'underpaid_cd'
  | 'clean';

export interface AuditedTransaction {
  id: string;
  propertyAddress: string;
  cityState: string;
  closingDate: string;
  agentName: string;
  splitPlanLabel: string;
  brokerageSplitPercent: number;
  closingPrice: number;
  commissionPercent: number;
  expectedGrossGci: number;
  expectedBrokerageNet: number;
  actualSettlementReceived: number;
  leakedAmount: number; // positive dollar amount of leakage (0 if clean or recovered)
  originalLeakedAmount: number;
  issueCategory: AuditIssueCategory;
  issueBadgeText: string;
  status: 'flagged' | 'clean' | 'recovered';
  dealSheetSystem: string;
  titleCompany: string;
  auditExplanation: string;
  dealSheetLineItem: string;
  altaDisclosureLineItem: string;
}

/**
 * 7 Realistic Pre-Populated US Real Estate Brokerage Transactions
 * Exact KPI totals:
 * - Audited Volume: $14,850,000
 * - Total GCI Reviewed: $412,500
 * - Flagged Leakage Found: $24,680 (Across 5 Deals: 2 Split/Cap, 2 Uncollected Referrals, 1 Underpaid CD, plus 2 Clean deals)
 */
export const INITIAL_TRANSACTIONS: AuditedTransaction[] = [
  {
    id: 'TXN-8941',
    propertyAddress: '742 Evergreen Terrace',
    cityState: 'Austin, TX',
    closingDate: '2026-10-28',
    agentName: 'Sarah Jenkins',
    splitPlanLabel: '80/20 Split (Post-Cap Error)',
    brokerageSplitPercent: 20,
    closingPrice: 2150000,
    commissionPercent: 2.75,
    expectedGrossGci: 59125,
    expectedBrokerageNet: 59125,
    actualSettlementReceived: 54875,
    leakedAmount: 4250,
    originalLeakedAmount: 4250,
    issueCategory: 'split_cap',
    issueBadgeText: 'CRITICAL: Post-Cap 20% Over-Deducted',
    status: 'flagged',
    dealSheetSystem: 'SkySlope #SS-44910',
    titleCompany: 'Heritage Title of Austin',
    auditExplanation:
      'Agent Sarah Jenkins anniversary cap reset on Oct 15, 2026. Disbursement Authorization (DA) mistakenly applied 100% post-cap tier instead of 80/20 pre-cap split + $250 admin fee.',
    dealSheetLineItem: 'Expected Brokerage Retained Split (20%): $8,500 | Agent Payout: $50,625',
    altaDisclosureLineItem: 'ALTA Line 703 Wire to Brokerage: $4,250 ($4,250 Shortfall on Split)',
  },
  {
    id: 'TXN-8942',
    propertyAddress: '1904 Brickell Ave #14B',
    cityState: 'Miami, FL',
    closingDate: '2026-10-24',
    agentName: 'Carlos Mendez',
    splitPlanLabel: 'Outbound 25% Referral Agreement',
    brokerageSplitPercent: 25,
    closingPrice: 2500000,
    commissionPercent: 2.75,
    expectedGrossGci: 68750,
    expectedBrokerageNet: 68750,
    actualSettlementReceived: 61875,
    leakedAmount: 6875,
    originalLeakedAmount: 6875,
    issueCategory: 'uncollected_referral',
    issueBadgeText: 'WARNING: Uncollected 25% Outbound Referral',
    status: 'flagged',
    dealSheetSystem: 'Follow Up Boss #FUB-9921',
    titleCompany: 'Biscayne Bay Escrow & Title',
    auditExplanation:
      'MLS public record confirms property closed Oct 24, 2026. Signed W-9 & Referral Agreement stipulated 25% of buyer-side commission; receiving brokerage omitted referral wire from CD.',
    dealSheetLineItem: 'Executed Referral Agreement (25% of $27,500 Side): $6,875 Due at Closing',
    altaDisclosureLineItem: 'Incoming Wire Ledger: $0 Received (38 Days Past Settlement Date)',
  },
  {
    id: 'TXN-8943',
    propertyAddress: '8820 Sunset Blvd',
    cityState: 'Scottsdale, AZ',
    closingDate: '2026-10-19',
    agentName: 'Lauren Sterling',
    splitPlanLabel: '85/15 Team Leader Tier',
    brokerageSplitPercent: 15,
    closingPrice: 3100000,
    commissionPercent: 2.75,
    expectedGrossGci: 85250,
    expectedBrokerageNet: 85250,
    actualSettlementReceived: 80120,
    leakedAmount: 5130,
    originalLeakedAmount: 5130,
    issueCategory: 'underpaid_cd',
    issueBadgeText: 'ALERT: CD Shortfall vs SkySlope DA',
    status: 'flagged',
    dealSheetSystem: 'SkySlope #SS-44802',
    titleCompany: 'Camelback Premier Title Co.',
    auditExplanation:
      'Final Closing Disclosure calculated 2.58% buyer-side payout instead of the 2.75% executed Cooperative Compensation Agreement, plus omitted $495 Broker Compliance Fee.',
    dealSheetLineItem: 'SkySlope Approved Gross Commission: $85,250 + $495 Compliance Fee',
    altaDisclosureLineItem: 'Final Title Wire Disbursed: $80,120 (-$5,130 Variance Unreconciled)',
  },
  {
    id: 'TXN-8944',
    propertyAddress: '412 Peachtree Battle Ave',
    cityState: 'Atlanta, GA',
    closingDate: '2026-10-14',
    agentName: 'Devon Brooks',
    splitPlanLabel: '70/30 + 6% Franchise Royalty',
    brokerageSplitPercent: 30,
    closingPrice: 1850000,
    commissionPercent: 2.75,
    expectedGrossGci: 50875,
    expectedBrokerageNet: 50875,
    actualSettlementReceived: 47775,
    leakedAmount: 3100,
    originalLeakedAmount: 3100,
    issueCategory: 'split_cap',
    issueBadgeText: 'CRITICAL: Royalty & Split Tier Miscalculated',
    status: 'flagged',
    dealSheetSystem: 'Brokermint #BM-3019',
    titleCompany: 'Peachtree Fidelity Settlement',
    auditExplanation:
      '6% franchise royalty ($3,052.50) and E&O deduction ($47.50) were deducted from the brokerage net retention instead of off-the-top gross GCI prior to agent split calculation.',
    dealSheetLineItem: 'Gross GCI: $50,875 | Off-Top 6% Royalty + E&O: $3,100',
    altaDisclosureLineItem: 'Agent Overpaid by $3,100 on Net Wire Disbursement Sheet',
  },
  {
    id: 'TXN-8945',
    propertyAddress: '2210 Camelback E #402',
    cityState: 'Phoenix, AZ',
    closingDate: '2026-10-09',
    agentName: 'Marcus Vance',
    splitPlanLabel: 'Outbound 30% Relocation Referral',
    brokerageSplitPercent: 30,
    closingPrice: 1450000,
    commissionPercent: 3.0,
    expectedGrossGci: 43500,
    expectedBrokerageNet: 43500,
    actualSettlementReceived: 38175,
    leakedAmount: 5325,
    originalLeakedAmount: 5325,
    issueCategory: 'uncollected_referral',
    issueBadgeText: 'WARNING: Uncollected 30% Outbound Referral',
    status: 'flagged',
    dealSheetSystem: 'Follow Up Boss #FUB-9840',
    titleCompany: 'Desert Sun Title Agency',
    auditExplanation:
      'Relocation referral closed Oct 9, 2026 in MLS. Co-broker remitted partial check missing the agreed 30% referral tier on $17,750 side commission.',
    dealSheetLineItem: 'Signed Referral Contract: 30% Referral Fee ($5,325 Due)',
    altaDisclosureLineItem: 'Settlement Ledger Balance: -$5,325 Uncollected Receivable',
  },
  {
    id: 'TXN-8946',
    propertyAddress: '904 Queens Rd West',
    cityState: 'Charlotte, NC',
    closingDate: '2026-10-05',
    agentName: 'Elena Rostova',
    splitPlanLabel: '90/10 Capped Senior Producer',
    brokerageSplitPercent: 10,
    closingPrice: 2100000,
    commissionPercent: 2.75,
    expectedGrossGci: 57750,
    expectedBrokerageNet: 57750,
    actualSettlementReceived: 57750,
    leakedAmount: 0,
    originalLeakedAmount: 0,
    issueCategory: 'clean',
    issueBadgeText: 'VERIFIED CLEAN · ZERO VARIANCE',
    status: 'clean',
    dealSheetSystem: 'SkySlope #SS-44612',
    titleCompany: 'Mecklenburg Title Partners',
    auditExplanation:
      'ALTA settlement statement matches SkySlope Disbursement Authorization to the penny. Cap status and $295 transaction fee verified.',
    dealSheetLineItem: 'Expected Gross GCI: $57,750 | Brokerage Net: $5,775',
    altaDisclosureLineItem: 'ALTA Wire Confirmed: $57,750 ($0.00 Variance)',
  },
  {
    id: 'TXN-8947',
    propertyAddress: '1150 Oak Lawn Ave',
    cityState: 'Dallas, TX',
    closingDate: '2026-10-02',
    agentName: 'Jonathan Vance',
    splitPlanLabel: '80/20 Standard Brokerage Plan',
    brokerageSplitPercent: 20,
    closingPrice: 1700000,
    commissionPercent: 2.7794,
    expectedGrossGci: 47250,
    expectedBrokerageNet: 47250,
    actualSettlementReceived: 47250,
    leakedAmount: 0,
    originalLeakedAmount: 0,
    issueCategory: 'clean',
    issueBadgeText: 'VERIFIED CLEAN · ZERO VARIANCE',
    status: 'clean',
    dealSheetSystem: 'Dotloop #DL-77210',
    titleCompany: 'Lone Star Heritage Title',
    auditExplanation:
      'Wire receipt reconciled against Dotloop deal sheet and bank deposit ledger. Split calculation and royalty deduction verified clean.',
    dealSheetLineItem: 'Expected Gross GCI: $47,250 | Brokerage Net: $9,450',
    altaDisclosureLineItem: 'ALTA Wire Confirmed: $47,250 ($0.00 Variance)',
  },
];

export interface AuditKpiSummary {
  auditedVolume: number;
  totalGciReviewed: number;
  flaggedLeakageFound: number;
  flaggedDealsCount: number;
  recoveredAmountTotal: number;
  countsByCategory: {
    all: number;
    flagged: number;
    split_cap: number;
    uncollected_referral: number;
    underpaid_cd: number;
  };
}

export function calculateAuditKpiSummary(
  transactions: AuditedTransaction[]
): AuditKpiSummary {
  let auditedVolume = 0;
  let totalGciReviewed = 0;
  let flaggedLeakageFound = 0;
  let flaggedDealsCount = 0;
  let recoveredAmountTotal = 0;

  let splitCapCount = 0;
  let referralCount = 0;
  let underpaidCdCount = 0;

  for (const tx of transactions) {
    auditedVolume += tx.closingPrice;
    totalGciReviewed += tx.expectedGrossGci;

    if (tx.status === 'flagged' && tx.leakedAmount > 0) {
      flaggedLeakageFound += tx.leakedAmount;
      flaggedDealsCount += 1;
    }

    if (tx.status === 'recovered') {
      recoveredAmountTotal += tx.originalLeakedAmount;
    }

    if (tx.issueCategory === 'split_cap' && tx.status === 'flagged') {
      splitCapCount += 1;
    } else if (tx.issueCategory === 'uncollected_referral' && tx.status === 'flagged') {
      referralCount += 1;
    } else if (tx.issueCategory === 'underpaid_cd' && tx.status === 'flagged') {
      underpaidCdCount += 1;
    }
  }

  return {
    auditedVolume,
    totalGciReviewed,
    flaggedLeakageFound,
    flaggedDealsCount,
    recoveredAmountTotal,
    countsByCategory: {
      all: transactions.length,
      flagged: flaggedDealsCount,
      split_cap: splitCapCount,
      uncollected_referral: referralCount,
      underpaid_cd: underpaidCdCount,
    },
  };
}

export interface SimulateDealInput {
  propertyName: string;
  agentName: string;
  salePrice: number;
  commissionPercent: number;
  expectedSplitPercent: number; // e.g., 80 (meaning 80/20 agent/brokerage)
  actualPayoutReceived: number;
  issueType?: AuditIssueCategory;
}

export function createSimulatedTransaction(
  input: SimulateDealInput,
  indexNumber: number
): AuditedTransaction {
  const safePrice = Math.max(50000, Math.round(input.salePrice));
  const safeComm = Math.max(0.5, Math.min(10, Number(input.commissionPercent)));
  const expectedGrossGci = Math.round(safePrice * (safeComm / 100));
  const actualSettlementReceived = Math.max(0, Math.round(input.actualPayoutReceived));
  const discrepancy = Math.max(0, expectedGrossGci - actualSettlementReceived);

  const isClean = discrepancy === 0;
  const category: AuditIssueCategory = isClean
    ? 'clean'
    : input.issueType && input.issueType !== 'clean'
    ? input.issueType
    : discrepancy >= 5000
    ? 'uncollected_referral'
    : 'split_cap';

  const badgeMap: Record<AuditIssueCategory, string> = {
    split_cap: 'CRITICAL: Split / Cap Variance Detected',
    uncollected_referral: 'WARNING: Uncollected Referral / Wire Shortfall',
    underpaid_cd: 'ALERT: CD Shortfall vs Deal Sheet',
    clean: 'VERIFIED CLEAN · ZERO VARIANCE',
  };

  const brokerageKeep = 100 - Math.min(100, Math.max(0, Math.round(input.expectedSplitPercent)));

  return {
    id: `TXN-${8948 + indexNumber}`,
    propertyAddress: input.propertyName.trim() || '550 Broadview Pkwy',
    cityState: 'Simulated Deal · US MLS',
    closingDate: '2026-11-12',
    agentName: input.agentName.trim() || ' Jordan Taylor',
    splitPlanLabel: `${input.expectedSplitPercent}/${brokerageKeep} Split Plan`,
    brokerageSplitPercent: brokerageKeep,
    closingPrice: safePrice,
    commissionPercent: safeComm,
    expectedGrossGci,
    expectedBrokerageNet: expectedGrossGci,
    actualSettlementReceived,
    leakedAmount: discrepancy,
    originalLeakedAmount: discrepancy,
    issueCategory: category,
    issueBadgeText: badgeMap[category],
    status: isClean ? 'clean' : 'flagged',
    dealSheetSystem: 'Live Sandbox Simulator',
    titleCompany: 'Simulated Settlement Statement (ALTA)',
    auditExplanation: isClean
      ? 'Simulated Closing Disclosure matches expected Gross Commission Income with zero leakage.'
      : `Zed v2.5 Engine detected a -$${discrepancy.toLocaleString()} discrepancy between expected Gross GCI ($${expectedGrossGci.toLocaleString()} at ${safeComm}%) and actual settlement received ($${actualSettlementReceived.toLocaleString()}).`,
    dealSheetLineItem: `Expected Gross GCI (${safeComm}% of $${safePrice.toLocaleString()}): $${expectedGrossGci.toLocaleString()}`,
    altaDisclosureLineItem: `Actual Wire / Settlement Received: $${actualSettlementReceived.toLocaleString()} (${isClean ? '$0 Variance' : `-$${discrepancy.toLocaleString()} Leaked`})`,
  };
}

export function generateAuditCsvContent(transactions: AuditedTransaction[]): string {
  const headers = [
    'Transaction ID',
    'Property Address',
    'City/State',
    'Closing Date',
    'Agent Name',
    'Split Plan',
    'Closing Price ($)',
    'Commission (%)',
    'Expected GCI ($)',
    'Actual Settlement ($)',
    'Leaked Amount ($)',
    'Audit Status',
    'Detected Issue',
  ];

  const escapeCsv = (val: string | number) => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = transactions.map((tx) =>
    [
      tx.id,
      tx.propertyAddress,
      tx.cityState,
      tx.closingDate,
      tx.agentName,
      tx.splitPlanLabel,
      tx.closingPrice,
      tx.commissionPercent,
      tx.expectedGrossGci,
      tx.actualSettlementReceived,
      tx.leakedAmount,
      tx.status.toUpperCase(),
      tx.issueBadgeText,
    ]
      .map(escapeCsv)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface AsyncAuditRequestInput {
  fullNameAndRole: string;
  brokerageNameAndState: string;
  preferredChannel: 'Work Email' | 'LinkedIn Message' | 'SMS / WhatsApp';
  contactHandle: string;
  transactionSystem: string;
  monthlyDealVolume: string;
}

export interface AsyncAuditValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof AsyncAuditRequestInput, string>>;
}

export function validateAsyncAuditRequest(
  input: AsyncAuditRequestInput
): AsyncAuditValidationResult {
  const errors: Partial<Record<keyof AsyncAuditRequestInput, string>> = {};

  if (!input.fullNameAndRole || input.fullNameAndRole.trim().length < 3) {
    errors.fullNameAndRole = 'Please enter your full name and brokerage role.';
  }

  if (!input.brokerageNameAndState || input.brokerageNameAndState.trim().length < 3) {
    errors.brokerageNameAndState = 'Please enter your brokerage name and state.';
  }

  if (!input.contactHandle || input.contactHandle.trim().length < 4) {
    errors.contactHandle = `Please provide your ${input.preferredChannel} contact destination.`;
  } else if (
    input.preferredChannel === 'Work Email' &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.contactHandle.trim())
  ) {
    errors.contactHandle = 'Please enter a valid work email address.';
  }

  if (!input.transactionSystem) {
    errors.transactionSystem = 'Please select your transaction management system.';
  }

  if (!input.monthlyDealVolume) {
    errors.monthlyDealVolume = 'Please select your monthly deal volume.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Ensures `target.fetch` has both a getter and setter so browser extensions or
 * third-party interceptors that assign `window.fetch = ...` do not throw
 * "TypeError: Cannot set property fetch of #<Window> which has only a getter".
 */
export function ensureWritableFetch(target: Record<string, unknown>): void {
  try {
    let currentFetch = target.fetch;
    const ownDesc = Object.getOwnPropertyDescriptor(target, 'fetch');
    if (ownDesc && ownDesc.configurable === false) {
      return;
    }
    Object.defineProperty(target, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(nextFetch: unknown) {
        if (typeof nextFetch === 'function') {
          currentFetch = nextFetch;
        }
      },
    });
  } catch {
    // Ignore if environment locks Object.defineProperty
  }
}
