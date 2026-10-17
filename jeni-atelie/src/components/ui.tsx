import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '../hooks/motion';
import { pop } from '../theme';
import type { Picture } from '../images';

// Foto larga de ponta a ponta: o doce fica à esquerda e as bordas de cima e de baixo se dissolvem
// no creme da página. No celular mostra só o lado do doce.
export const WidePhoto = ({ photo, sizes, className = '' }: { photo: Picture & { alt: string }; sizes: string; className?: string }) => (
  <div className={`relative aspect-[4/3] overflow-hidden sm:aspect-[43/24] ${className}`}>
    <img srcSet={photo.srcSet} sizes={sizes} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" className="size-full object-cover object-left" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-t from-transparent to-creme" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-b from-transparent to-creme" />
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
      className={`grid size-28 place-items-center rounded-full p-3 text-center font-display text-base leading-[1.05] sm:size-32 sm:text-lg font-bold ${stickerTones[tone]} ${className}`}
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
