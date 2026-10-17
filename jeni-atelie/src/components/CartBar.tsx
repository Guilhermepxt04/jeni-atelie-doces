import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { Minus, Plus, WhatsappLogo } from '@phosphor-icons/react';
import { findItem, formatBRL } from '../content';
import { buildOrderMessage, itemLabel, whatsappUrl } from '../cart';
import { useCart } from '../cart-context';
import { easeDrawer, pop } from '../theme';
import { Cta } from './motion';

const barShadow = 'shadow-[0_18px_50px_-14px_rgba(58,29,20,0.45)]'; // taste-skill-ignore: a sacolinha é fixa e flutua sobre a página

const plural = (n: number) => `${n} ${n === 1 ? 'doce' : 'doces'}`;

// Sacolinha presa no pé da tela: aparece no primeiro doce, soma tudo e manda o pedido pronto
export const CartBar = () => {
  const { lines, count, total, add, remove } = useCart();
  const [open, setOpen] = useState(false);
  const visible = count > 0;

  return (
    <>
      {/* anúncio para leitor de tela, em texto simples (o NumberFlow desenha os dígitos à parte) */}
      <p aria-live="polite" className="sr-only">{visible ? `${plural(count)} na sacolinha, total ${formatBRL(total)}` : ''}</p>
      <AnimatePresence>
        {visible && (
          <m.div
            role="region"
            aria-label="Sacolinha"
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 140, opacity: 0 }}
            transition={{ duration: 0.6, ease: easeDrawer }}
            // no celular sobe acima do botão de acessibilidade (Sienna, fixo no canto de baixo)
            className="on-dark fixed inset-x-3 bottom-[max(5rem,calc(env(safe-area-inset-bottom)+4.25rem))] z-40 mx-auto max-w-[40rem] lg:bottom-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <div className={`overflow-hidden rounded-[2rem] bg-chocolate text-creme ${barShadow}`}>
              <AnimatePresence initial={false}>
                {open && (
                  <m.ul
                    id="itens-sacolinha"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.45, ease: easeDrawer }}
                    className="max-h-[50dvh] overflow-y-auto px-4"
                  >
                    {lines.map((l) => (
                      <li key={l.id} className="flex items-center gap-3 py-1.5 first:pt-4">
                        <span className="flex-1 text-note font-semibold">{itemLabel(l.id)}</span>
                        <span className="text-note tabular-nums text-creme/80">{formatBRL((findItem(l.id)?.price ?? 0) * l.qty)}</span>
                        <span className="flex items-center gap-1 rounded-full bg-creme/10 p-1">
                          <button type="button" onClick={() => remove(l.id)} aria-label={`Tirar um ${itemLabel(l.id)}`} className="grid size-9 place-items-center rounded-full transition-colors hover:bg-creme/15">
                            <Minus size={14} weight="bold" />
                          </button>
                          <span className="w-5 text-center text-note font-bold tabular-nums">{l.qty}</span>
                          <button type="button" onClick={() => add(l.id)} aria-label={`Pôr mais um ${itemLabel(l.id)}`} className="grid size-9 place-items-center rounded-full transition-colors hover:bg-creme/15">
                            <Plus size={14} weight="bold" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </m.ul>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3 p-2 pl-4">
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  aria-controls="itens-sacolinha"
                  className="flex min-h-11 flex-1 items-center gap-2.5 rounded-full text-left"
                >
                  <m.span key={count} initial={{ scale: 1.35 }} animate={{ scale: 1 }} transition={pop}
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-morango-forte text-note font-bold text-white tabular-nums">
                    <NumberFlow value={count} aria-hidden="true" />
                  </m.span>
                  <span className="leading-tight">
                    <span className="block text-note text-creme/75">{open ? 'esconder itens' : 'ver itens'}</span>
                    <span className="block font-bold tabular-nums">
                      <NumberFlow value={total} format={{ style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }} locales="pt-BR" aria-hidden="true" />
                    </span>
                  </span>
                </button>
                <Cta href={whatsappUrl(buildOrderMessage(lines))} external icon={<WhatsappLogo size={20} weight="light" />} className="min-h-12 pl-5 text-note">
                  Enviar pedido<span className="sr-only"> no WhatsApp</span>
                </Cta>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
