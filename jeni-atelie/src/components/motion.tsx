import type { ReactNode } from 'react';
import { m, useMotionValue, useSpring, useScroll } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useReducedMotion } from '../hooks/motion';

const underline = 'after:h-px'; // taste-skill-ignore: sublinhado do link, não é divisor

// Barra fina de progresso de leitura, em cobre
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <m.div aria-hidden="true" style={{ scaleX, transformOrigin: '0%' }} className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-cobre" />;
};

// Acompanha levemente o cursor; parado no toque e com menos movimento
export const Magnetic = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return (
    <m.div
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </m.div>
  );
};

type CtaProps = { href: string; children: ReactNode; tone?: 'cobre' | 'papel' | 'tinta'; external?: boolean; className?: string; icon?: ReactNode };

// Botão em pílula com a seta dentro do próprio círculo ("botão dentro do botão")
export const Cta = ({ href, children, tone = 'cobre', external, className = '', icon }: CtaProps) => {
  const tones = {
    cobre: 'bg-cobre text-papel hover:bg-tinta',
    tinta: 'bg-tinta text-papel hover:bg-cobre',
    papel: 'bg-papel text-tinta hover:bg-white',
  }[tone];
  const dot = tone === 'papel' ? 'bg-tinta/8' : 'bg-papel/14';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className={`group inline-flex min-h-14 items-center gap-4 rounded-full py-2 pr-2 pl-7 text-[0.9375rem] font-semibold tracking-[0.01em] transition-[background-color,transform] duration-500 ease-[var(--ease-drawer)] active:scale-[0.97] ${tones} ${className}`}
    >
      <span className="flex-1 whitespace-nowrap">{children}</span>
      <span aria-hidden="true" className={`grid size-10 place-items-center rounded-full ${dot} transition-transform duration-500 ease-[var(--ease-drawer)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105`}>
        {icon ?? <ArrowUpRight size={18} weight="light" />}
      </span>
    </a>
  );
};

// Link de texto com o sublinhado que corre da esquerda
export const TextLink = ({ href, children, external, className = '' }: { href: string; children: ReactNode; external?: boolean; className?: string }) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    className={`relative inline-flex min-h-11 items-center font-medium whitespace-nowrap after:absolute after:inset-x-0 after:bottom-2 ${underline} after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-[var(--ease-drawer)] hover:after:scale-x-0 hover:after:origin-right ${className}`}
  >
    {children}
  </a>
);
