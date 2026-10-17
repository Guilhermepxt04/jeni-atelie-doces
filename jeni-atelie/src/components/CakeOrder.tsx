import { useState } from 'react';
import { m } from 'framer-motion';
import { buildCakeMessage, cakeSizes, whatsappUrl, type CakeSize } from '../cart';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';
import { settle } from '../theme';
import { Cta } from './motion';
import { photos } from '../images';
import { Sticker, WidePhoto } from './ui';

export const CakeOrder = () => {
  const reduce = useReducedMotion();
  const [size, setSize] = useState<CakeSize>('ate-10');
  const index = cakeSizes.findIndex((s) => s.id === size);
  const bolo = photos['gerada-bolo-inteiro'];

  return (
    // foto de ponta a ponta; nas telas grandes o texto fica no creme vazio da direita
    <section id="encomendas" aria-labelledby="encomendas-t" className="relative py-12 lg:py-0">
      <div className="relative">
        <m.div initial={reduce ? false : { opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={settle}>
          <WidePhoto photo={bolo} sizes="100vw" />
        </m.div>
        <Sticker tone="manteiga" rotate={-10} className="absolute top-4 left-4 sm:left-8 lg:top-[12%] lg:left-[6%]">sob encomenda</Sticker>
      </div>

      <m.div {...inView} variants={stagger(0.08)} className="px-4 sm:px-6 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[46%] lg:flex-col lg:justify-center lg:pr-16 xl:pr-24">
        <m.h2 variants={rise} id="encomendas-t" className="font-display text-display font-bold">Tem festa vindo?</m.h2>
        <m.p variants={rise} className="mt-5 max-w-[42ch] text-lead text-chocolate-suave">
          A Jeni faz o bolo inteiro do seu jeito. Escolha o tamanho, conte a data e ela responde com sabores e valor. O prazo depende do bolo.
        </m.p>

        <m.fieldset variants={rise} className="mt-8">
          <legend className="mb-3 font-bold">Para quantas pessoas?</legend>
          {/* pílula clara desliza até o tamanho escolhido */}
          <div className="relative grid w-full grid-cols-3 rounded-full bg-rosa p-1.5 sm:inline-grid sm:w-auto">
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
    </section>
  );
};
