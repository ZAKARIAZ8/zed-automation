import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AgitationSection } from './components/AgitationSection';
import { CommissionAuditBanner } from './components/CommissionAuditBanner';
import { InfrastructureSection } from './components/InfrastructureSection';
import { ComparisonAndProcessSection } from './components/ComparisonAndProcessSection';
import { FaqAndFooterSection } from './components/FaqAndFooterSection';
import { AsyncAuditModal } from './components/AsyncAuditModal';
import { AuroraBackdrop } from './components/ui/MotionPrimitives';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefillLeakage, setPrefillLeakage] = useState<number | undefined>(
    undefined
  );

  const handleOpenAsyncModal = (estimatedLeakage?: number) => {
    setPrefillLeakage(estimatedLeakage);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#040807] bg-emerald-grid text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      <AuroraBackdrop />
      <div className="relative z-10">
        <Navbar onOpenAsyncModal={() => handleOpenAsyncModal()} />
        <main>
          <HeroSection onOpenAsyncModal={() => handleOpenAsyncModal()} />
          <AgitationSection />
          <CommissionAuditBanner onOpenAsyncModal={handleOpenAsyncModal} />
          <InfrastructureSection
            onOpenAsyncModal={() => handleOpenAsyncModal()}
          />
          <ComparisonAndProcessSection
            onOpenAsyncModal={() => handleOpenAsyncModal()}
          />
          <FaqAndFooterSection onOpenAsyncModal={() => handleOpenAsyncModal()} />
        </main>
      </div>
      <AsyncAuditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        estimatedLeakage={prefillLeakage}
      />
    </div>
  );
}

export default App;
