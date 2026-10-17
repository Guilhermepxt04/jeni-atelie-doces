import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { BAIRRO, WHATSAPP_DISPLAY, hours, whatsappUrl } from '../content';
import { img } from '../images';
import { Cta } from './motion';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

// Cartão de visita sobre a foto: horários, telefone e o botão do WhatsApp.
export const Visit = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', reduce ? '-10%' : '10%']);

  return (
    <section ref={ref} id="contato" aria-labelledby="contato-t" className="relative bg-cacau pb-10 lg:min-h-[100dvh] lg:pb-0">
      <div className="relative h-[70dvh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <m.img
          style={{ y }}
          srcSet={img.parapeito.srcSet}
          sizes="100vw"
          src={img.parapeito.src}
          width={img.parapeito.width}
          height={img.parapeito.height}
          alt="Framboesas sobre um parapeito branco, com luz dourada ao fundo"
          loading="lazy"
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover object-[50%_70%]"
        />
      </div>

      <m.div
        {...inView}
        variants={stagger(0.07)}
        className="relative mx-4 -mt-20 flex flex-col bg-papel px-7 pt-8 sm:mx-auto sm:max-w-[24rem] lg:absolute lg:top-16 lg:right-16 lg:mx-0 lg:mt-0 lg:w-[24rem]"
      >
        <m.h2 id="contato-t" variants={rise} className="font-display text-statement">Fale com a Jeni</m.h2>
        <m.p variants={rise} className="mt-3">Ateliê em {BAIRRO}.<br />O endereço de retirada vai na confirmação.</m.p>
        <m.dl variants={rise} className="mt-5 grid gap-1.5 tabular-nums">
          {hours.map(([d, h]) => (
            <div key={d} className="flex justify-between gap-3">
              <dt>{d}</dt>
              <dd className="text-tinta-suave">{h}</dd>
            </div>
          ))}
        </m.dl>
        <m.p variants={rise} className="mt-5 mb-6 font-semibold">
          <a href={whatsappUrl()} target="_blank" rel="noopener" className="transition-colors hover:text-cobre">{WHATSAPP_DISPLAY}</a>
        </m.p>
        <m.div variants={rise} className="-mx-3 pb-3">
          <Cta href={whatsappUrl()} external tone="tinta" className="w-full" icon={<WhatsappLogo size={20} weight="light" />}>
            Chamar no WhatsApp
          </Cta>
        </m.div>
      </m.div>
    </section>
  );
};
