import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, FileSpreadsheet, Layers, Lock } from 'lucide-react';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
  formatWithCommas?: boolean;
}

/**
 * Tabular animated counter that smoothly interpolates on viewport entry and value updates.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  durationMs = 750,
  className = '',
  formatWithCommas = true,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<number>(value);
  const previousValueRef = useRef<number>(0);
  const hasAnimatedInitialRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isInView) return;

    const startValue = hasAnimatedInitialRef.current ? previousValueRef.current : 0;
    const endValue = value;
    hasAnimatedInitialRef.current = true;
    previousValueRef.current = value;

    if (startValue === endValue) {
      setDisplayValue(endValue);
      return;
    }

    let animationFrameId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, isInView, durationMs]);

  const formattedNumber = formatWithCommas
    ? displayValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : displayValue.toFixed(decimals);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
  as?: 'div' | 'article';
}

/**
 * Translucent #0B1210/75 smoked obsidian glass card with 1px emerald border,
 * top specular highlight, cursor-tracking emerald spotlight, and subtle hover lift.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  hoverLift = true,
  as = 'div',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Component = as === 'article' ? motion.article : motion.div;

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl glass-obsidian-card transition-colors duration-200 ${className}`}
    >
      {/* Top Specular Highlight Line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
      />

      {/* Cursor-Tracking Emerald Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.14), transparent 65%)`,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

/**
 * Primary emerald CTA button with magnetic cursor tracking and specular glow.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.16;
    const deltaY = (e.clientY - centerY) * 0.22;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
      {children}
    </motion.button>
  );
};

const TRUST_PARTNERS = [
  { name: 'SkySlope', tag: 'Transaction Audit Ledger' },
  { name: 'Dotloop', tag: 'Settlement Verification' },
  { name: 'Follow Up Boss', tag: 'Two-Way Webhook Sync' },
  { name: 'Brokermint', tag: 'Split & Cap Ledger' },
  { name: 'LoneWolf', tag: 'Back-Office Accounting' },
  { name: 'KVCore', tag: 'Portal Pipeline Ingestion' },
  { name: 'ALTA', tag: 'CD Settlement Standard' },
];

/**
 * Infinite horizontal trust marquee for US Real Estate transaction & CRM ecosystems.
 */
export const TrustMarquee: React.FC = () => {
  const marqueeList = [...TRUST_PARTNERS, ...TRUST_PARTNERS];

  return (
    <div className="mt-10 pt-8 border-t border-emerald-500/15">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/90 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Verified Back-Office &amp; CRM Ecosystem Compatibility</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          SkySlope · Dotloop · Follow Up Boss · Brokermint · LoneWolf · KVCore · ALTA
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-[#0B1210]/70 border border-emerald-500/15 py-3.5">
        {/* Left & Right Smoked Obsidian Edge Fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#040807] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#040807] to-transparent z-10"
        />

        <div className="flex w-max animate-marquee items-center">
          {marqueeList.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="mx-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-[#040807]/85 border border-emerald-500/20"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-white tracking-tight">
                {partner.name}
              </span>
              <span aria-hidden="true" className="text-emerald-500/40">
                ·
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {partner.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Atmospheric drifting emerald Aurora backdrop over the #040807 canvas.
 */
export const AuroraBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      <div className="absolute -top-48 left-1/4 w-[760px] h-[420px] rounded-full bg-emerald-500/10 blur-[130px] animate-aurora-slow" />
      <div className="absolute top-1/3 -right-32 w-[620px] h-[380px] rounded-full bg-teal-500/8 blur-[140px] animate-aurora-slow" />
      <div className="absolute -bottom-40 left-1/3 w-[680px] h-[360px] rounded-full bg-emerald-600/10 blur-[140px]" />
    </div>
  );
};

/**
 * Clean executive brokerage audit ledger header bar (no headsets or calls).
 */
export const ExecutiveAuditHeader: React.FC<{
  badge: string;
  referenceId: string;
  statusText?: string;
}> = ({ badge, referenceId, statusText = 'WRITTEN LEDGER VERIFIED' }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-emerald-500/15 text-[11px] font-mono">
      <div className="flex items-center gap-2 text-emerald-400">
        <Layers className="w-3.5 h-3.5 shrink-0" />
        <span className="uppercase tracking-wider font-semibold">{badge}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-400">
        <span>{referenceId}</span>
        <span aria-hidden="true" className="text-emerald-500/40">·</span>
        <span className="inline-flex items-center gap-1 text-emerald-300">
          <Lock className="w-3 h-3" />
          <span>{statusText}</span>
        </span>
      </div>
    </div>
  );
};
