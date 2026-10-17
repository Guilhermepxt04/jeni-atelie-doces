import { m } from 'framer-motion';
import { areas, channels, steps } from '../content';
import { inView, rise, stagger } from '../hooks/motion';
import { SoonBadge, Sticker } from './ui';

const stickerOf = ['manteiga', 'rosa', 'morango'] as const;

// Os três passos do pedido. Aqui a ordem importa, então os números aparecem (como selos).
export const HowToOrder = () => (
  <section id="como-pedir" aria-labelledby="como-pedir-t" className="mx-auto max-w-[80rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
    <m.div {...inView} variants={stagger(0.08)} className="max-w-[40rem]">
      <m.h2 variants={rise} id="como-pedir-t" className="font-display text-display font-bold">Como pedir</m.h2>
      <m.p variants={rise} className="mt-5 text-lead text-chocolate-suave">
        Retire com a Jeni ou receba em casa. A entrega é grátis na {areas[0]} e no {areas[1]}, e não tem pedido mínimo.
      </m.p>
    </m.div>

    <m.ol {...inView} variants={stagger(0.12)} className="mt-12 grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => (
        <m.li key={step} variants={rise} className="flex flex-col gap-5 rounded-[2rem] bg-white/70 p-6 lg:p-8">
          <Sticker tone={stickerOf[i]} rotate={i % 2 ? 8 : -8} className="size-16! text-[1.75rem]!">
            {i + 1}
          </Sticker>
          <p className="text-lead">{step}</p>
        </m.li>
      ))}
    </m.ol>

    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="text-note font-semibold text-chocolate-suave">Logo também no</span>
      <SoonBadge label={channels.ifood.label} />
      <SoonBadge label={channels.food99.label} />
    </div>
  </section>
);
