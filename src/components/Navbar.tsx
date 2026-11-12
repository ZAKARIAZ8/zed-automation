import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuditModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Instant GCI Calculator', href: '#calculator' },
    { label: 'Live Transaction Auditor', href: '#auditor' },
    { label: 'Zero-Call Pilot', href: '#zero-call-pilot' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080A0F]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Geometric Z SVG Emblem + ZED AUTOMATION wordmark */}
        <a
          href="#overview"
          className="flex items-center gap-3 text-base font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            {/* Outer Precision Architectural Hexagon/Square Grid Frame */}
            <rect
              x="1.5"
              y="1.5"
              width="33"
              height="33"
              rx="6"
              fill="#111520"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <path
              d="M1.5 12H34.5M1.5 24H34.5M12 1.5V34.5M24 1.5V34.5"
              stroke="white"
              strokeOpacity="0.07"
              strokeWidth="1"
            />
            <polygon
              points="18,4 30,11 30,25 18,32 6,25 6,11"
              stroke="#6366F1"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Sharp Minimalist Geometric Z */}
            <path
              d="M11.5 11.5H24.5L11.5 24.5H24.5"
              stroke="#10B981"
              strokeWidth="2.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          <span>ZED AUTOMATION</span>
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-emerald-400/70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAuditModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all duration-150 shadow-[0_0_24px_rgba(16,185,129,0.28)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Get Free Written Audit Report →</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-[#111520] text-slate-200 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#080A0F]/95 backdrop-blur-xl px-6 py-5 space-y-4">
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
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-[#080A0F] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              <span>Get Free Written Audit Report →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
