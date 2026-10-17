import { m } from 'framer-motion';
import { photos } from '../images';
import { inView, rise, stagger } from '../hooks/motion';
import { Sticker } from './ui';

// Recado curto da Jeni, com uma foto real dos potes dela
export const About = () => {
  const p = photos['jeni-potes-mesa'];
  return (
    <section aria-labelledby="sobre-t" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 md:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[32rem]">
          <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem]">
            <img srcSet={p.srcSet} sizes="(min-width: 768px) 32rem, 92vw" src={p.src} width={p.width} height={p.height} alt={p.alt} loading="lazy" className="size-full object-cover object-[50%_25%]" />
          </div>
          <Sticker tone="morango" rotate={10} className="absolute -right-4 -bottom-4">feito pela Jeni</Sticker>
        </div>
        <m.div {...inView} variants={stagger(0.08)}>
          <m.h2 variants={rise} id="sobre-t" className="font-display text-statement font-bold">Um recado da Jeni</m.h2>
          <m.p variants={rise} className="mt-5 max-w-[46ch] text-lead">
            Oi! Eu sou a Jeni. Tudo o que você vê aqui sai da minha cozinha: monto cada pote camada por camada e envolvo cada morango no brigadeiro com a mão.
          </m.p>
          <m.p variants={rise} className="mt-4 max-w-[46ch] text-chocolate-suave">
            Faço pouquinho de cada vez, para o doce chegar até você do jeito que saiu da geladeira, cremoso e geladinho.
          </m.p>
          <m.p variants={rise} className="mt-4 max-w-[46ch] text-chocolate-suave">
            Tem um sabor que você ama e não achou no cardápio? Me chama no WhatsApp. Vários doces daqui nasceram de pedido de cliente.
          </m.p>
          <m.p variants={rise} className="mt-6 font-display text-lead font-semibold text-morango-forte italic">Com carinho, Jeni</m.p>
        </m.div>
      </div>
    </section>
  );
};
