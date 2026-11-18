import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { MagneticButton } from './ui/MotionPrimitives';

interface NavbarProps {
  onOpenAsyncModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAsyncModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'The Problem', href: '#problem' },
    { label: 'ROI Calculator', href: '#calculator' },
    { label: 'Our AI Infrastructure', href: '#infrastructure' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#040807]/85 border-b border-emerald-500/15">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-3 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
        >
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[#040807] font-extrabold font-mono text-base shadow-[0_0_24px_rgba(16,185,129,0.4)]"
          >
            Z
          </span>
          <span>Zed Automation</span>
          <span className="hidden xl:inline-block text-[11px] font-mono text-emerald-400/80 border-l border-emerald-500/20 pl-3">
            zedautomations.tech
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-emerald-300 transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-emerald-400/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action -> Opens Async Written Audit Modal */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton
            onClick={() => onOpenAsyncModal?.()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#040807] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors duration-150 shadow-[0_0_26px_rgba(16,185,129,0.35)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Audit Your Leaked GCI →</span>
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-emerald-500/20 bg-[#0B1210]/80 text-slate-200 hover:text-white hover:bg-emerald-500/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-500/15 bg-[#040807]/95 backdrop-blur-xl px-6 py-5 space-y-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-emerald-400 py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-emerald-500/15 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAsyncModal?.();
              }}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-xs font-bold text-[#040807] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <span>Audit Your Leaked GCI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
