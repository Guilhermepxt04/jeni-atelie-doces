import { m } from 'framer-motion';
import { photos } from '../images';
import { inView, rise, stagger } from '../hooks/motion';
import { Arch, Sticker } from './ui';

// Recado curto da Jeni, com uma foto real dos potes dela.
// O texto é rascunho: a Jeni confirma ou reescreve com as palavras dela.
export const About = () => {
  const p = photos['jeni-potes-mesa'];
  return (
    <section aria-labelledby="sobre-t" className="mx-2 rounded-[2.5rem] bg-tone-pessego px-4 py-16 sm:mx-3 sm:px-8 lg:px-14 lg:py-24">
      <div className="mx-auto grid max-w-[72rem] items-center gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[18rem]">
          <Arch className="aspect-[3/4] bg-white/60">
            <img srcSet={p.srcSet} sizes="18rem" src={p.src} width={p.width} height={p.height} alt={p.alt} loading="lazy" className="size-full object-cover" />
          </Arch>
          <Sticker tone="morango" rotate={10} className="absolute -right-4 -bottom-4">feito pela Jeni</Sticker>
        </div>
        <m.div {...inView} variants={stagger(0.08)}>
          <m.h2 variants={rise} id="sobre-t" className="font-display text-statement font-bold">Quem faz</m.h2>
          <m.p variants={rise} className="mt-5 max-w-[48ch] text-lead">
            Oi, eu sou a Jeni. Cada pote, fatia e coxinha sai da minha cozinha, montado camada por camada. Faço poucos por vez para chegar fresquinho na sua mão.
          </m.p>
          <m.p variants={rise} className="mt-4 max-w-[48ch] text-chocolate-suave">
            Se não achar o sabor que queria, me chama no WhatsApp. Muita coisa do cardápio nasceu de pedido de cliente.
          </m.p>
        </m.div>
      </div>
    </section>
  );
};
