import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header className="mx-auto mb-14 max-w-7xl px-4 pt-36 lg:px-8 lg:pt-44">
      <p className="section-label"><span className="text-chakra-crimson">/</span>{eyebrow}</p>
      <h1 className="heading-xl mt-6 max-w-5xl">{title}</h1>
      {description && <p className="text-body-lg mt-6 max-w-3xl">{description}</p>}
    </header>
  );
}

export function PageSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16 ${className}`}>{children}</section>;
}

export function BlueprintPanel({ icon: Icon = Crosshair, index, label, className = '' }: { icon?: LucideIcon; index: string; label: string; className?: string }) {
  return (
    <div className={`technical-panel relative flex min-h-48 flex-col justify-between overflow-hidden p-6 sm:p-8 ${className}`} aria-hidden="true">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-chakra-silver/70"><span>CH / {index}</span><span className="h-px w-12 bg-chakra-electric/60" /></div>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative z-10 flex items-end justify-between"><span className="font-display text-xl font-semibold uppercase tracking-wide text-chakra-white/80">{label}</span><Icon className="text-chakra-electric" size={28} strokeWidth={1.2} /></div>
      <span className="absolute -right-4 -top-8 select-none font-display text-[9rem] font-bold leading-none text-white/[0.025]">{index}</span>
    </div>
  );
}

export function ActionLink({ to, children, secondary = false, className = '' }: { to: string; children: ReactNode; secondary?: boolean; className?: string }) {
  return <Link to={to} className={`${secondary ? 'btn-secondary' : 'btn-primary'} ${className}`}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}

export function InfoBlock({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <article className="border-l border-white/10 py-2 pl-6 transition-colors hover:border-chakra-crimson">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-chakra-electric">{label}</p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-chakra-white">{title}</h2>
      <div className="mt-4 text-body">{children}</div>
    </article>
  );
}
