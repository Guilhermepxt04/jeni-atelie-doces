import { useId, useRef, useState } from 'react';
import { AnimatePresence, m, useScroll, useTransform } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { faq, whatsappUrl } from '../content';
import { img } from '../images';
import { easeDrawer } from '../theme';
import { Cta, TextLink } from './motion';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

const Item = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => {
  const id = useId();
  return (
    <m.div variants={rise}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex min-h-12 w-full items-center justify-between gap-4 text-left text-lead font-medium transition-colors duration-300 hover:text-cobre"
        >
          {q}
          <span className={`grid size-9 shrink-0 place-items-center rounded-full bg-papel transition-[transform,background-color] duration-500 ease-[var(--ease-drawer)] group-hover:bg-blush ${open ? 'rotate-45' : ''}`}>
            <Plus size={16} weight="light" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeDrawer }}
            className="overflow-hidden"
          >
            <p className="max-w-[52ch] pt-2 pb-1 text-tinta-suave">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

export const Faq = () => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tallY = useTransform(scrollYProgress, [0, 1], ['-6%', reduce ? '-6%' : '6%']);
  const squareY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);

  return (
    <section id="duvidas" aria-labelledby="duvidas-t" className="flex flex-col gap-16 bg-papel-2 px-4 pb-24 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:pb-44">
      <m.div {...inView} variants={stagger(0.06)} className="order-2 lg:order-1 lg:col-span-5 lg:pt-44">
        <m.h2 id="duvidas-t" variants={rise} className="font-display text-display">{faq.title}</m.h2>
        <m.ul variants={rise} className="mt-7 grid gap-1.5">
          {faq.facts.map((f) => <li key={f}>{f}</li>)}
        </m.ul>
        <div className="mt-12 grid gap-5">
          {faq.items.map((it, i) => (
            <Item key={it.q} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        <m.div variants={rise} className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-8">
          <Cta href="#caixa" className="w-full sm:w-auto">Montar minha caixa</Cta>
          <TextLink href={whatsappUrl()} external>Perguntar no WhatsApp</TextLink>
        </m.div>
      </m.div>

      <div ref={ref} className="relative order-1 -mx-4 sm:-mx-6 lg:order-2 lg:col-span-6 lg:col-start-7 lg:mx-0 lg:pb-20">
        <div className="overflow-hidden">
          <m.img
            style={{ y: tallY, scale: 1.14 }}
            srcSet={img.confeitando.srcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={img.confeitando.src}
            width={img.confeitando.width}
            height={img.confeitando.height}
            alt="Confeiteira desenhando arabescos verdes na lateral de um bolo branco"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-[70%_50%] lg:aspect-[3/4]"
          />
        </div>
        <m.img
          style={{ y: squareY }}
          srcSet={img.bico.srcSet}
          sizes="(min-width: 1024px) 18vw, 38vw"
          src={img.bico.src}
          width={img.bico.width}
          height={img.bico.height}
          alt="Bico de confeitar pitanga antigo, peça de museu dos anos 1930"
          loading="lazy"
          className="absolute right-4 -bottom-8 aspect-square w-[38%] border-8 border-papel-2 object-cover lg:right-auto lg:bottom-10 lg:-left-10 lg:w-[34%]"
        />
      </div>
    </section>
  );
};
