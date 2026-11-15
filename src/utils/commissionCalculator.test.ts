import { describe, it, expect } from 'vitest';
import { calculateCommissionLeakage } from './commissionCalculator';

describe('calculateCommissionLeakage', () => {
  it('calculates GCI and recoverable commission accurately', () => {
    const res = calculateCommissionLeakage({
      annualTransactions: 100,
      avgSalePrice: 500000,
      commissionRate: 3.0,
      outboundReferrals: 10,
    });

    expect(res.totalVolume).toBe(50000000);
    expect(res.totalGrossGci).toBe(1500000);
    expect(res.splitAndCapLeakage).toBe(48000);
    expect(res.totalRecoverableGci).toBeGreaterThan(48000);
  });
});
