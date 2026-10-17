import { m } from 'framer-motion';
import { photos } from '../images';
import { inView, rise, stagger } from '../hooks/motion';
import { Sticker, WidePhoto } from './ui';

// Recado curto da Jeni, com a fileira de potes dela
export const About = () => {
  const p = photos['gerada-potes-mesa'];
  return (
    // foto de ponta a ponta (puxada para a esquerda, a fileira de potes é comprida); o recado fica no creme da direita
    <section aria-labelledby="sobre-t" className="relative overflow-x-clip py-12 lg:py-0">
      <div className="relative lg:-ml-[14%] lg:w-[114%]">
        <WidePhoto photo={p} sizes="114vw" />
        <Sticker tone="morango" rotate={10} className="absolute right-4 bottom-2 sm:right-8 lg:right-auto lg:bottom-[14%] lg:left-[44%]">feito pela Jeni</Sticker>
      </div>
      <m.div {...inView} variants={stagger(0.08)} className="px-4 sm:px-6 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[39%] lg:flex-col lg:justify-center lg:pr-16 xl:pr-24">
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
    </section>
  );
};
