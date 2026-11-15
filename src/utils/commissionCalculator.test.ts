import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCommissionLeakage } from './commissionCalculator';

test('calculateCommissionLeakage calculates GCI and recoverable commission accurately', () => {
  const res = calculateCommissionLeakage({
    annualTransactions: 100,
    avgSalePrice: 500000,
    commissionRate: 3.0,
    outboundReferrals: 10,
  });

  assert.equal(res.totalVolume, 50000000);
  assert.equal(res.totalGrossGci, 1500000);
  assert.equal(res.splitAndCapLeakage, 48000);
  assert.ok(res.totalRecoverableGci > 48000);
});
