import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '../hooks/motion';
import { pop } from '../theme';

// Moldura em arco (topo redondo, pé levemente arredondado), como nas vitrines de confeitaria.
// `wide` vira cápsula horizontal, para a foto larga da capa.
export const Arch = ({ children, wide, className = '' }: { children: ReactNode; wide?: boolean; className?: string }) => (
  <div className={`overflow-hidden ${wide ? 'rounded-[999px_999px_2.5rem_2.5rem] lg:rounded-[999px]' : 'rounded-[999px_999px_1.75rem_1.75rem]'} ${className}`}>
    {children}
  </div>
);

const stickerTones = {
  manteiga: 'bg-manteiga text-chocolate',
  morango: 'bg-morango-forte text-white',
  rosa: 'bg-rosa text-chocolate',
} as const;

// Selo redondo inclinado que "cola" com um pulinho quando entra na tela
export const Sticker = ({ children, tone = 'manteiga', rotate = -10, className = '' }: {
  children: ReactNode; tone?: keyof typeof stickerTones; rotate?: number; className?: string;
}) => {
  const reduce = useReducedMotion();
  return (
    <m.span
      initial={reduce ? { rotate } : { scale: 0.6, rotate: rotate - 8, opacity: 0 }}
      whileInView={{ scale: 1, rotate, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={reduce ? { duration: 0 } : pop}
      className={`grid size-24 place-items-center rounded-full p-3 text-center font-display text-[0.9375rem] leading-[1.05] font-bold ${stickerTones[tone]} ${className}`}
    >
      {children}
    </m.span>
  );
};

// iFood e 99Food fechados: aparece "em breve", sem link
export const SoonBadge = ({ label }: { label: string }) => (
  <span
    aria-label={`${label}: em breve`}
    className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/70 px-3.5 text-note font-semibold text-chocolate-suave"
  >
    {label}
    <span aria-hidden="true" className="text-chocolate-suave/60">·</span>
    <span>em breve</span>
  </span>
);
