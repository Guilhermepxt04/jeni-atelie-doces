import { useState } from 'react';
import { m } from 'framer-motion';
import { buildCakeMessage, cakeSizes, whatsappUrl, type CakeSize } from '../cart';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';
import { settle } from '../theme';
import { Cta } from './motion';
import { Sticker } from './ui';

// Bolo de andares desenhado na paleta: fica no lugar da foto até ela ser gerada
// TODO foto: docs/prompts-gemini.md item 8 (bolo inteiro); trocar este desenho por <Arch> + <img>
const CakeDrawing = () => (
  <svg viewBox="0 0 240 240" aria-hidden="true" className="w-full">
    <circle cx="120" cy="120" r="118" fill="var(--color-white, #fff)" opacity=".7" />
    <rect x="58" y="128" width="124" height="62" rx="16" fill="var(--color-caramelo)" />
    <rect x="58" y="128" width="124" height="18" rx="9" fill="var(--color-creme)" />
    <rect x="78" y="80" width="84" height="52" rx="14" fill="var(--color-rosa)" />
    <rect x="78" y="80" width="84" height="16" rx="8" fill="var(--color-creme)" />
    {[70, 92, 114, 136, 158].map((x) => <circle key={x} cx={x} cy="130" r="6" fill="var(--color-creme)" />)}
    {[90, 110, 130, 150].map((x) => <circle key={x} cx={x} cy="82" r="5" fill="var(--color-creme)" />)}
    <path d="M120 52c-9 0-16 7-16 15 0 10 16 15 16 15s16-5 16-15c0-8-7-15-16-15Z" fill="var(--color-morango)" />
    <path d="M114 50c3-5 9-5 12 0" stroke="#3d7a2c" strokeWidth="4" strokeLinecap="round" fill="none" />
    <rect x="40" y="190" width="160" height="10" rx="5" fill="var(--color-chocolate)" opacity=".15" />
  </svg>
);

export const CakeOrder = () => {
  const reduce = useReducedMotion();
  const [size, setSize] = useState<CakeSize>('ate-10');
  const index = cakeSizes.findIndex((s) => s.id === size);

  return (
    <section id="encomendas" aria-labelledby="encomendas-t" className="mx-2 rounded-[2.5rem] bg-rosa px-4 py-16 sm:mx-3 sm:px-8 lg:px-14 lg:py-24">
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[22rem]">
          <m.div
            initial={reduce ? false : { rotate: -8, scale: 0.9, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={settle}
          >
            <CakeDrawing />
          </m.div>
          <Sticker tone="manteiga" rotate={-10} className="absolute -top-2 -left-2">sob encomenda</Sticker>
        </div>

        <m.div {...inView} variants={stagger(0.08)}>
          <m.h2 variants={rise} id="encomendas-t" className="font-display text-display font-bold">Tem festa vindo?</m.h2>
          <m.p variants={rise} className="mt-5 max-w-[42ch] text-lead text-chocolate-suave">
            A Jeni faz o bolo inteiro do seu jeito. Escolha o tamanho, conte a data e ela responde com sabores e valor. O prazo depende do bolo.
          </m.p>

          <m.fieldset variants={rise} className="mt-8">
            <legend className="mb-3 font-bold">Para quantas pessoas?</legend>
            {/* pílula clara desliza até o tamanho escolhido */}
            <div className="relative grid w-full grid-cols-3 rounded-full bg-white/60 p-1.5 sm:inline-grid sm:w-auto">
              <m.span
                aria-hidden="true"
                initial={false}
                animate={{ x: `${index * 100}%` }}
                transition={reduce ? { duration: 0 } : settle}
                className="absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/3)] rounded-full bg-white"
              />
              {cakeSizes.map((s) => (
                <label key={s.id} className="relative cursor-pointer">
                  <input type="radio" name="tamanho-bolo" value={s.id} checked={size === s.id} onChange={() => setSize(s.id)} className="peer sr-only" />
                  <span className="relative flex min-h-11 items-center justify-center rounded-full px-4 text-center text-note font-bold text-chocolate-suave transition-[color,transform] active:scale-[0.96] peer-checked:text-chocolate peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-chocolate sm:px-6">
                    {s.label}
                  </span>
                </label>
              ))}
            </div>
          </m.fieldset>

          <m.div variants={rise} className="mt-8">
            <Cta href={whatsappUrl(buildCakeMessage(size))} external className="w-full sm:w-auto">Encomendar meu bolo</Cta>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
