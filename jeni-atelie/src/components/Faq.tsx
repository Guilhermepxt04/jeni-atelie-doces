import { useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { faq } from '../content';
import { whatsappUrl } from '../cart';
import { inView, rise, stagger } from '../hooks/motion';
import { TextLink } from './motion';

const Item = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => {
  const id = useId();
  return (
    <m.div variants={rise} className="border-b border-chocolate/15 py-3">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex min-h-12 w-full items-center justify-between gap-4 text-left text-lead font-semibold transition-colors duration-300 hover:text-morango-forte"
        >
          {q}
          <span className={`grid size-9 shrink-0 place-items-center rounded-full bg-rosa transition-[transform,background-color] duration-500 ease-[var(--ease-drawer)] group-hover:bg-manteiga ${open ? 'rotate-45' : ''}`}>
            <Plus size={16} weight="bold" />
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
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="overflow-hidden"
          >
            <p className="max-w-[56ch] pt-1 pb-3 text-chocolate-suave">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" aria-labelledby="duvidas-t" className="mx-auto grid max-w-[80rem] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10 lg:py-28">
      <m.div {...inView} variants={stagger(0.08)}>
        <m.h2 variants={rise} id="duvidas-t" className="font-display text-display font-bold">Dúvidas</m.h2>
        <m.p variants={rise} className="mt-5 max-w-[30ch] text-lead text-chocolate-suave">
          Não achou a resposta? A Jeni responde no WhatsApp.
        </m.p>
        <m.div variants={rise} className="mt-4">
          <TextLink href={whatsappUrl('Oi, Jeni! Tenho uma dúvida sobre os doces.')} external className="text-chocolate">
            Perguntar no WhatsApp
          </TextLink>
        </m.div>
      </m.div>
      <m.div {...inView} variants={stagger(0.06)} className="grid border-t border-chocolate/15">
        {faq.map((it, i) => (
          <Item key={it.q} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </m.div>
    </section>
  );
};
