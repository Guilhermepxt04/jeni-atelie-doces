import { m } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { areas, channels, formatBRL, minPrice } from '../content';
import { whatsappUrl } from '../cart';
import { photos } from '../images';
import { easeOutExpo } from '../theme';
import { useReducedMotion } from '../hooks/motion';
import { Cta, Magnetic } from './motion';
import { SoonBadge, Sticker } from './ui';

// Título e texto partem visíveis e só assentam no lugar: o conteúdo principal pinta antes do JS
const line = { hidden: { y: '0.45em' }, show: { y: 0, transition: { duration: 1, ease: easeOutExpo } } };

export const Hero = () => {
  const reduce = useReducedMotion();
  const capa = photos.capa;

  return (
    // telas largas: a foto inteira ocupa a seção e o texto fica no espaço vazio da esquerda
    <section aria-labelledby="capa-t" className="relative mx-auto grid max-w-[90rem] gap-12 px-4 pt-28 pb-16 sm:px-6 lg:px-10 lg:pt-32 xl:block">
      <m.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
        className="relative z-10 xl:absolute xl:top-32 xl:bottom-16 xl:left-10 xl:flex xl:w-[50%] xl:flex-col xl:justify-center xl:pl-14">
        <h1 id="capa-t" className="font-display text-display font-bold text-chocolate xl:text-[clamp(4rem,5.2vw,5.5rem)]">
          <m.span variants={line} className="block">Docinho bom</m.span>
          <m.span variants={line} className="block text-morango">tem nome</m.span>
        </h1>
        <m.p variants={line} className="mt-6 max-w-[34ch] text-lead text-chocolate-suave">
          Bolos de pote, fatias, coxinhas de morango e brownies prontos para levar. Entrega grátis na {areas[0]} e no {areas[1]}.
        </m.p>
        <m.div variants={line} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
        {/* celular: corta só a mesa vazia da esquerda; do tablet para cima a foto aparece inteira */}
        <div className="aspect-[16/10] overflow-hidden rounded-[2rem] bg-rosa sm:aspect-[1024/434] lg:rounded-[2.5rem]">
          <m.img
            srcSet={capa.srcSet}
            sizes="(min-width: 1440px) 1360px, 100vw"
            src={capa.src}
            width={capa.width}
            height={capa.height}
            alt={capa.alt}
            fetchPriority="high"
            initial={reduce ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: easeOutExpo }}
            className="size-full object-cover object-right"
          />
        </div>
        <Sticker tone="manteiga" rotate={-12} className="absolute -top-6 right-4 sm:right-8">
          feito toda semana
        </Sticker>
        <Sticker tone="morango" rotate={9} className="absolute -bottom-8 left-4 sm:left-8">
          a partir de {formatBRL(minPrice)}
        </Sticker>
      </div>
    </section>
  );
};
