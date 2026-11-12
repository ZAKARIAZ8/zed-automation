/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CommissionAuditBanner } from './components/CommissionAuditBanner';
import { TransactionAuditSuite } from './components/TransactionAuditSuite';
import { FaqAndFooterSection } from './components/FaqAndFooterSection';
import { AsyncAuditModal } from './components/AsyncAuditModal';
import {
  LeakageEstimatorInput,
  calculateBrokerageLeakage,
} from './utils/commissionCalculator';

export default function App() {
  const [estimatorInput, setEstimatorInput] = useState<LeakageEstimatorInput>({
    annualTransactions: 180,
    avgSalePrice: 450000,
    avgCommissionPercent: 2.75,
    outboundReferrals: 18,
  });

  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);

  const estimatorOutput = calculateBrokerageLeakage(estimatorInput);

  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col">
      <Navbar onOpenAuditModal={() => setIsAuditModalOpen(true)} />

      <main className="flex-1">
        <HeroSection onOpenAuditModal={() => setIsAuditModalOpen(true)} />

        <CommissionAuditBanner
          estimatorInput={estimatorInput}
          onChangeEstimatorInput={setEstimatorInput}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        <TransactionAuditSuite
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        <FaqAndFooterSection
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      </main>

      <AsyncAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        estimatedRecoverableGci={estimatorOutput.totalRecoverableNetRevenue}
      />
    </div>
  );
}
