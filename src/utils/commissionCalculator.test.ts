import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AUDIT_TOOL_URL,
  calculateCommissionLeakage,
  formatCurrency,
  validateArchitectureCallForm,
} from './commissionCalculator';

test('AUDIT_TOOL_URL matches exact Commission Leakage Audit destination', () => {
  assert.equal(AUDIT_TOOL_URL, 'https://zed-automation-1.vercel.app/commission-audit');
});

test('calculateCommissionLeakage computes accurate 5-minute death zone leakage', () => {
  const result = calculateCommissionLeakage({
    monthlyLeads: 120,
    avgHomePrice: 525000,
    commissionRatePercent: 2.75,
    responseTimeMinutes: 8,
    deadCrmContacts: 2500,
  });

  // 525000 * 0.0275 = 14437.5 -> 14438
  assert.equal(result.avgCommissionPerDeal, 14438);
  assert.equal(result.leakageRatePercent, 30);
  assert.equal(result.qualificationOddsDropPercent, 80);
  assert.ok(result.monthlyLeakedGci > 15000);
  assert.equal(result.annualLeakedGci, result.monthlyLeakedGci * 12);
  assert.ok(result.recoverable30DayGci > 10000);
});

test('calculateCommissionLeakage increases leakage rate as response time slows', () => {
  const fastResult = calculateCommissionLeakage({
    monthlyLeads: 150,
    avgHomePrice: 600000,
    commissionRatePercent: 2.5,
    responseTimeMinutes: 1,
    deadCrmContacts: 1500,
  });

  const slowResult = calculateCommissionLeakage({
    monthlyLeads: 150,
    avgHomePrice: 600000,
    commissionRatePercent: 2.5,
    responseTimeMinutes: 45,
    deadCrmContacts: 1500,
  });

  assert.ok(slowResult.leakageRatePercent > fastResult.leakageRatePercent);
  assert.ok(slowResult.monthlyLeakedGci > fastResult.monthlyLeakedGci);
});

test('formatCurrency formats USD cleanly without cents', () => {
  assert.equal(formatCurrency(14500), '$14,500');
  assert.equal(formatCurrency(248900), '$248,900');
});

test('validateArchitectureCallForm rejects incomplete inputs and accepts valid real estate team submission', () => {
  const invalid = validateArchitectureCallForm({
    fullName: '',
    brokerageName: 'A',
    workEmail: 'not-an-email',
    phone: '123',
    currentCrm: '',
    annualVolume: '',
    selectedSlot: '',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.brokerageName);
  assert.ok(invalid.errors.workEmail);
  assert.ok(invalid.errors.phone);

  const valid = validateArchitectureCallForm({
    fullName: 'Marcus Vance',
    brokerageName: 'Vance Luxury Realty Group',
    workEmail: 'marcus@vancerealty.com',
    phone: '(512) 555-0194',
    currentCrm: 'Follow Up Boss',
    annualVolume: '$25M – $50M / yr',
    selectedSlot: 'Thu · 2:00 PM EST',
  });

  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
