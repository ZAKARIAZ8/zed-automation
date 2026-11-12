import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_TRANSACTIONS,
  calculateBrokerageLeakage,
  calculateAuditKpiSummary,
  createSimulatedTransaction,
  generateAuditCsvContent,
  validateAsyncAuditRequest,
  ensureWritableFetch,
} from './commissionCalculator';

test('INITIAL_TRANSACTIONS matches exact requested KPI totals ($14,850,000 volume, $412,500 GCI, $24,680 leakage across 5 deals)', () => {
  const summary = calculateAuditKpiSummary(INITIAL_TRANSACTIONS);

  assert.equal(INITIAL_TRANSACTIONS.length, 7);
  assert.equal(summary.auditedVolume, 14850000);
  assert.equal(summary.totalGciReviewed, 412500);
  assert.equal(summary.flaggedLeakageFound, 24680);
  assert.equal(summary.flaggedDealsCount, 5);
  assert.equal(summary.countsByCategory.all, 7);
  assert.equal(summary.countsByCategory.flagged, 5);
  assert.equal(summary.countsByCategory.split_cap, 2);
  assert.equal(summary.countsByCategory.uncollected_referral, 2);
  assert.equal(summary.countsByCategory.underpaid_cd, 1);
});

test('calculateBrokerageLeakage computes accurate 30-second estimator numbers for default 180 deals', () => {
  const result = calculateBrokerageLeakage({
    annualTransactions: 180,
    avgSalePrice: 450000,
    avgCommissionPercent: 2.75,
    outboundReferrals: 18,
  });

  // 180 * 450,000 = 81,000,000
  assert.equal(result.totalAnnualVolume, 81000000);
  // 81,000,000 * 0.0275 = 2,227,500
  assert.equal(result.totalAnnualGci, 2227500);
  // 3.2% of 2,227,500 = 71,280
  assert.equal(result.splitAndCapLeakage, 71280);
  assert.ok(result.uncollectedReferralLeakage > 10000);
  assert.equal(
    result.totalRecoverableNetRevenue,
    result.splitAndCapLeakage + result.uncollectedReferralLeakage
  );
});

test('createSimulatedTransaction flags underpaid payout and updates summary', () => {
  const simTx = createSimulatedTransaction(
    {
      propertyName: '405 Lexington Ave, New York NY',
      agentName: 'Rachel Zane',
      salePrice: 1000000,
      commissionPercent: 3.0,
      expectedSplitPercent: 80,
      actualPayoutReceived: 26500,
    },
    0
  );

  assert.equal(simTx.expectedGrossGci, 30000);
  assert.equal(simTx.leakedAmount, 3500);
  assert.equal(simTx.status, 'flagged');

  const updatedSummary = calculateAuditKpiSummary([simTx, ...INITIAL_TRANSACTIONS]);
  assert.equal(updatedSummary.auditedVolume, 15850000);
  assert.equal(updatedSummary.flaggedLeakageFound, 24680 + 3500);
  assert.equal(updatedSummary.flaggedDealsCount, 6);
});

test('generateAuditCsvContent produces valid CSV with header and 7 rows', () => {
  const csv = generateAuditCsvContent(INITIAL_TRANSACTIONS);
  const lines = csv.trim().split('\n');
  assert.equal(lines.length, 8);
  assert.ok(lines[0].includes('Transaction ID,Property Address'));
  assert.ok(csv.includes('742 Evergreen Terrace'));
});

test('validateAsyncAuditRequest validates required fields and email format when Work Email is chosen', () => {
  const invalid = validateAsyncAuditRequest({
    fullNameAndRole: '',
    brokerageNameAndState: 'A',
    preferredChannel: 'Work Email',
    contactHandle: 'invalid-email',
    transactionSystem: '',
    monthlyDealVolume: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullNameAndRole);
  assert.ok(invalid.errors.contactHandle);

  const valid = validateAsyncAuditRequest({
    fullNameAndRole: 'Marcus Vance — Managing Broker',
    brokerageNameAndState: 'Vance Luxury Realty (TX)',
    preferredChannel: 'SMS / WhatsApp',
    contactHandle: '(512) 555-0199',
    transactionSystem: 'SkySlope',
    monthlyDealVolume: '25 – 75 Closings / Mo',
  });
  assert.equal(valid.valid, true);
});

test('ensureWritableFetch prevents TypeError when setting fetch on an object with a getter-only descriptor', () => {
  const originalFn = () => 'original';
  const replacementFn = () => 'intercepted';

  const mockWindow: Record<string, unknown> = {};
  Object.defineProperty(mockWindow, 'fetch', {
    configurable: true,
    get() {
      return originalFn;
    },
  });

  assert.throws(() => {
    mockWindow.fetch = replacementFn;
  }, TypeError);

  ensureWritableFetch(mockWindow);

  assert.doesNotThrow(() => {
    mockWindow.fetch = replacementFn;
  });
  assert.equal(mockWindow.fetch, replacementFn);
});
