import { m } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { areas, channels, formatBRL, minPrice } from '../content';
import { whatsappUrl } from '../cart';
import { photos } from '../images';
import { easeOutExpo } from '../theme';
import { useReducedMotion } from '../hooks/motion';
import { Cta, Magnetic } from './motion';
import { Arch, SoonBadge, Sticker } from './ui';

// Título e texto partem visíveis e só assentam no lugar: o conteúdo principal pinta antes do JS
const line = { hidden: { y: '0.45em' }, show: { y: 0, transition: { duration: 1, ease: easeOutExpo } } };

export const Hero = () => {
  const reduce = useReducedMotion();
  const capa = photos.capa;

  return (
    <section aria-labelledby="capa-t" className="relative mx-auto grid max-w-[90rem] items-center gap-12 px-4 pt-28 pb-16 sm:px-6 lg:min-h-[100dvh] lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:px-10 lg:pt-32">
      <m.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}>
        <h1 id="capa-t" className="font-display text-display font-bold text-chocolate">
          <m.span variants={line} className="block">Docinho bom</m.span>
          <m.span variants={line} className="block text-morango">tem nome</m.span>
        </h1>
        <m.p variants={line} className="mt-6 max-w-[34ch] text-lead text-chocolate-suave">
          Bolos de pote, fatias, coxinhas de morango e brownies prontos para levar. Entrega grátis na {areas[0]} e no {areas[1]}.
        </m.p>
        <m.div variants={line} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic className="w-full sm:w-auto">
            <Cta href="#cardapio" className="w-full sm:w-auto">Ver o cardápio</Cta>
          </Magnetic>
          <Cta href={whatsappUrl()} external tone="branco" icon={<WhatsappLogo size={20} weight="light" />} className="w-full sm:w-auto">
            Chamar no WhatsApp
          </Cta>
        </m.div>
        <m.div variants={line} className="mt-5 flex flex-wrap gap-2">
          <SoonBadge label={channels.ifood.label} />
          <SoonBadge label={channels.food99.label} />
        </m.div>
      </m.div>

      <div className="relative">
        <Arch wide className="aspect-[4/3] bg-rosa lg:aspect-[16/10]">
          <m.img
            srcSet={capa.srcSet}
            sizes="(min-width: 1024px) 52vw, 100vw"
            src={capa.src}
            width={capa.width}
            height={capa.height}
            alt={capa.alt}
            fetchPriority="high"
            initial={reduce ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: easeOutExpo }}
            className="size-full object-cover"
          />
        </Arch>
        <Sticker tone="manteiga" rotate={-12} className="absolute -top-6 left-2 sm:left-6">
          feito toda semana
        </Sticker>
        <Sticker tone="morango" rotate={9} className="absolute right-2 -bottom-8 sm:right-8">
          a partir de {formatBRL(minPrice)}
        </Sticker>
      </div>
    </section>
  );
};
