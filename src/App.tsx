/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AgitationSection } from './components/AgitationSection';
import { CommissionAuditBanner } from './components/CommissionAuditBanner';
import { InfrastructureSection } from './components/InfrastructureSection';
import { ComparisonAndProcessSection } from './components/ComparisonAndProcessSection';
import { FaqAndFooterSection } from './components/FaqAndFooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AgitationSection />
        <CommissionAuditBanner />
        <InfrastructureSection />
        <ComparisonAndProcessSection />
        <FaqAndFooterSection />
      </main>
    </div>
  );
}
