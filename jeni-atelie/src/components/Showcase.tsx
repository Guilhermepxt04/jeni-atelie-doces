import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { formatBRL, menu, type GroupId, type MenuGroup, type Tone } from '../content';
import { useCart } from '../cart-context';
import { photos, type PhotoKey } from '../images';
import { easeOutExpo, pop } from '../theme';
import { inView, rise, stagger } from '../hooks/motion';

const toneBg: Record<Tone, string> = {
  caramelo: 'bg-tone-caramelo',
  cacau: 'bg-tone-cacau',
  pessego: 'bg-tone-pessego',
  rosa: 'bg-tone-rosa',
  lilas: 'bg-tone-lilas',
  manteiga: 'bg-tone-manteiga',
};

// fotos reais recortadas (fundo transparente): ficam inteiras, soltas sobre a cor do cartão
const cutouts = new Set<PhotoKey>(['jeni-pote', 'jeni-empadao']);

const Photo = ({ k, sizes, className = '' }: { k: PhotoKey; sizes: string; className?: string }) => {
  const p = photos[k];
  return (
    <img
      srcSet={p.srcSet}
      sizes={sizes}
      src={p.src}
      width={p.width}
      height={p.height}
      alt={p.alt}
      loading="lazy"
      className={`size-full ${cutouts.has(k) ? 'object-contain' : 'object-cover'} ${className}`}
    />
  );
};

const ItemRow = ({ id, name, price }: { id: string; name: string; price: number }) => {
  const { add, qtyOf } = useCart();
  const qty = qtyOf(id);
  return (
    <li>
      <button
        type="button"
        onClick={() => add(id)}
        aria-label={`Adicionar ${name}, ${formatBRL(price)}${qty ? `, ${qty} na sacolinha` : ''}`}
        className="group flex min-h-11 w-full items-center gap-3 rounded-full py-1 pr-1.5 pl-4 text-left transition-colors duration-300 hover:bg-white/70 active:scale-[0.99]"
      >
        <span className="flex-1 font-semibold">{name}</span>
        <span className="tabular-nums text-chocolate-suave">{formatBRL(price)}</span>
        <span aria-hidden="true" className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white text-chocolate transition-transform duration-300 group-hover:scale-110">
          <AnimatePresence initial={false} mode="popLayout">
            {qty ? (
              <m.span key={qty} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={pop}
                className="grid size-9 place-items-center rounded-full bg-morango-forte text-note font-bold text-white tabular-nums">
                {qty}
              </m.span>
            ) : (
              <m.span key="mais" initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={pop}>
                <Plus size={16} weight="bold" />
              </m.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </li>
  );
};

// Cartão de um grupo: foto grande (com fotinhas extras flutuando) e a lista de sabores
const GroupCard = ({ group, headingLevel = 'h3' }: { group: MenuGroup; headingLevel?: 'h3' | 'p' }) => {
  const [main, ...extras] = group.photos;
  const Heading = headingLevel;
  return (
    <div className={`grid h-full gap-5 rounded-[2.5rem] p-5 sm:p-7 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10 lg:p-10 ${toneBg[group.tone]}`}>
      <div className="relative mx-auto w-full max-w-[16rem] lg:max-w-[24rem]">
        <m.div
          initial={{ rotate: -6, scale: 0.92, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <div className={`aspect-[3/4] ${cutouts.has(main) ? '' : 'overflow-hidden rounded-[2rem]'}`}>
            <Photo k={main} sizes="(min-width: 1024px) 24rem, 70vw" />
          </div>
        </m.div>
        {extras.slice(0, 2).map((k, i) => (
          <span
            key={k}
            style={{ animationDelay: `${-i * 2.4}s` }}
            className={`absolute size-16 overflow-hidden rounded-full border-4 border-white lg:size-24 motion-safe:animate-[float_5.5s_ease-in-out_infinite_alternate] ${i === 0 ? '-bottom-4 -left-3' : '-right-3 bottom-16'}`}
          >
            <Photo k={k} sizes="96px" />
          </span>
        ))}
      </div>
      <div>
        <Heading className="font-display text-statement font-bold">{group.title}</Heading>
        <p className="mt-2 max-w-[40ch] text-chocolate-suave">{group.blurb}</p>
        <ul className="mt-5 grid gap-0.5">
          {group.items.map((it) => <ItemRow key={it.id} {...it} />)}
        </ul>
      </div>
    </div>
  );
};

export const Showcase = () => {
  const [active, setActive] = useState<GroupId>(menu[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = menu.find((g) => g.id === active)!;

  // abas no padrão WAI-ARIA: setas trocam e levam o foco junto
  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + menu.length) % menu.length;
    setActive(menu[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="cardapio" aria-labelledby="cardapio-t" className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <m.div {...inView} variants={stagger(0.08)} className="max-w-[44rem]">
        <m.h2 variants={rise} id="cardapio-t" className="font-display text-display font-bold">Escolha seu docinho</m.h2>
        <m.p variants={rise} className="mt-5 text-lead text-chocolate-suave">
          Toque no sabor para colocar na sacolinha. Pronta-entrega enquanto durar o estoque; o que acabar, a Jeni faz sob encomenda.
        </m.p>
      </m.div>

      {/* telas grandes: abas + um cartão por vez */}
      <div className="mt-12 hidden lg:block">
        <div role="tablist" aria-label="Grupos do cardápio" className="flex flex-wrap gap-2">
          {menu.map((g, i) => (
            <button
              key={g.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`aba-${g.id}`}
              aria-selected={active === g.id}
              aria-controls="painel-cardapio"
              tabIndex={active === g.id ? 0 : -1}
              onClick={() => setActive(g.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-11 rounded-full px-5 text-note font-bold transition-[background-color,color,transform] duration-300 active:scale-[0.97] ${active === g.id ? 'bg-morango-forte text-white' : `${toneBg[g.tone]} text-chocolate hover:bg-white`}`}
            >
              {g.title}
            </button>
          ))}
        </div>
        <div role="tabpanel" id="painel-cardapio" aria-labelledby={`aba-${active}`} className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
            >
              <GroupCard group={group} headingLevel="p" />
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* celular: carrossel de arrastar, rolagem nativa com encaixe (sem JS no gesto) */}
      <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {menu.map((g) => (
          <li key={g.id} className="w-[85vw] max-w-[26rem] shrink-0 snap-center">
            <GroupCard group={g} />
          </li>
        ))}
      </ul>
    </section>
  );
};
