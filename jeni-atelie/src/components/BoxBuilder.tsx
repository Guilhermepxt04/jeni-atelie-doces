import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { boxSizes, flavors, whatsappUrl, type Flavor } from '../content';
import { seloClaro } from '../images';
import { palette, settle } from '../theme';
import { Cta } from './motion';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

const byId = Object.fromEntries(flavors.map((f) => [f.id, f])) as Record<string, Flavor>;
type Size = (typeof boxSizes)[number]['size'];

// forminha de papel: círculo de babados, desenhado em torno de (0,0)
const cupPath = (r: number, n = 18) => {
  let d = '';
  for (let k = 0; k <= n; k++) {
    const a = (k / n) * Math.PI * 2;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (k === 0) { d += `M${x.toFixed(1)} ${y.toFixed(1)}`; continue; }
    const mid = ((k - 0.5) / n) * Math.PI * 2;
    d += `Q${(Math.cos(mid) * r * 1.12).toFixed(1)} ${(Math.sin(mid) * r * 1.12).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d}Z`;
};

// pontos fixos da cobertura: a mesma semente desenha sempre igual (servidor e navegador batem)
const scatter = (seed: number, n: number, r: number) => {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, () => {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r * 0.8;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d, rot: (rnd() * 180) | 0 };
  });
};

// cobertura de cada sabor
const Topping = ({ f, r, seed }: { f: Flavor; r: number; seed: number }) => {
  if (f.top === 'noz') {
    return (
      <g>
        <ellipse cx={0} cy={-r * 0.1} rx={r * 0.42} ry={r * 0.3} fill="#8a5a33" />
        <path d={`M${-r * 0.38} ${-r * 0.1}H${r * 0.38}`} stroke="#6b4224" strokeWidth={r * 0.06} />
      </g>
    );
  }
  const n = { granulado: 26, cacau: 30, coco: 22, ninho: 18, pistache: 14, acucar: 26 }[f.top];
  return (
    <g>
      {scatter(seed, n, r).map(({ x, y, rot }, k) => {
        switch (f.top) {
          case 'granulado': return <rect key={k} x={x - r * 0.09} y={y - r * 0.03} width={r * 0.18} height={r * 0.06} rx={r * 0.03} fill="#1b0c07" transform={`rotate(${rot} ${x} ${y})`} />;
          case 'cacau': return <circle key={k} cx={x} cy={y} r={r * 0.035} fill="#4a2a1d" />;
          case 'coco': return <rect key={k} x={x} y={y} width={r * 0.14} height={r * 0.05} fill="#c9965c" transform={`rotate(${rot} ${x} ${y})`} />;
          case 'ninho': return <circle key={k} cx={x} cy={y} r={r * 0.05} fill="#fffaf0" />;
          case 'pistache': return <rect key={k} x={x} y={y} width={r * 0.12} height={r * 0.1} fill="#6d7a3a" />;
          default: return <circle key={k} cx={x} cy={y} r={r * 0.04} fill="#fff7f2" />;
        }
      })}
    </g>
  );
};

export const Sweet = ({ f, r, seed }: { f: Flavor; r: number; seed: number }) => (
  <g>
    <circle r={r} fill={f.ball} />
    <circle cx={-r * 0.32} cy={-r * 0.34} r={r * 0.22} fill="#fff" opacity={0.14} />
    <Topping f={f} r={r} seed={seed} />
  </g>
);

const START = ['belga', 'ninho', 'pist', 'beij', 'belga', 'cama', 'bicho', 'ninho', 'trad'];
const CELL = 120; // cada cavidade é desenhada em 120×120 e escalada para o tamanho da caixa

export const BoxBuilder = () => {
  const reduce = useReducedMotion();
  const [size, setSize] = useState<Size>(9);
  const [slots, setSlots] = useState<(string | null)[]>(START);
  const [full, setFull] = useState(0); // muda a cada toque com a caixa cheia, para o aviso tremer

  const { cols, price } = boxSizes.find((b) => b.size === size)!;
  const filled = slots.filter(Boolean).length;
  const tally = useMemo(() => {
    const t: Record<string, number> = {};
    slots.forEach((id) => { if (id) t[id] = (t[id] ?? 0) + 1; });
    return t;
  }, [slots]);

  const message = useMemo(() => {
    const lines = Object.entries(tally).map(([id, n]) => `• ${n} ${byId[id].name}`);
    const missing = size - filled;
    let msg = `Olá, Jeni! Quero encomendar uma caixa com ${size} doces (R$ ${price}).`;
    if (lines.length) msg += `\n\n${lines.join('\n')}`;
    if (missing) msg += `\n\n${missing === size ? 'Pode escolher os sabores por mim.' : `Faltam ${missing}: pode completar com o que achar melhor.`}`;
    return `${msg}\n\nData que preciso: `;
  }, [tally, size, filled, price]);

  // o espaço livre é procurado dentro do updater: toques rápidos seguidos não caem no mesmo lugar
  const add = (id: string) => {
    if (!slots.includes(null)) { setFull((n) => n + 1); return; }
    setSlots((s) => {
      const k = s.indexOf(null);
      return k === -1 ? s : s.map((v, i) => (i === k ? id : v));
    });
  };
  const remove = (k: number) => setSlots((s) => s.map((v, i) => (i === k ? null : v)));
  const resize = (next: Size) => {
    const kept = slots.filter(Boolean);
    setSize(next);
    setSlots(Array.from({ length: next }, (_, i) => kept[i] ?? null));
  };

  const scale = 360 / cols / CELL;

  return (
    <section id="caixa" aria-labelledby="caixa-t" className="grid gap-10 bg-papel px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10 lg:px-8 lg:py-44">
      <m.div {...inView} variants={stagger(0.08)} className="lg:col-span-6 lg:row-start-1">
        <m.h2 id="caixa-t" variants={rise} className="font-display text-display">Monte sua caixa</m.h2>
        <m.p variants={rise} className="mt-6 max-w-[46ch]">
          Escolha o tamanho e toque nos sabores. O pedido sai pronto para o WhatsApp da Jeni, com a lista de doces escrita.
        </m.p>

        <m.fieldset variants={rise} className="mt-12">
          <legend className="mb-4 font-semibold">Tamanho</legend>
          <div className="inline-flex w-full gap-1 rounded-full bg-papel-2 p-1.5 sm:w-auto">
            {boxSizes.map((b) => (
              <label key={b.size} className="relative flex-1 cursor-pointer sm:flex-none">
                <input type="radio" name="tamanho" value={b.size} checked={size === b.size} onChange={() => resize(b.size)} className="peer sr-only" />
                <span className="relative flex flex-col items-center rounded-full px-6 py-2.5 text-note transition-[background-color,color,transform] duration-500 ease-[var(--ease-drawer)] hover:bg-blush active:scale-[0.97] peer-checked:bg-tinta peer-checked:text-papel peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobre">
                  <span className="font-semibold">Com {b.size}</span>
                  <span className="tabular-nums opacity-75">R$ {b.price}</span>
                </span>
              </label>
            ))}
          </div>
        </m.fieldset>
      </m.div>

      {/* no celular os sabores vêm logo abaixo da caixa, para ver cada doce cair enquanto escolhe */}
      <m.div {...inView} variants={stagger(0.06)} className="order-3 lg:order-none lg:col-span-6 lg:row-start-2">
        <m.div variants={rise} role="group" aria-label="Sabores" className="grid grid-cols-2 gap-2">
          {flavors.map((f) => (
            <m.button
              key={f.id}
              type="button"
              onClick={() => add(f.id)}
              whileTap={{ scale: 0.96 }}
              aria-label={`Adicionar ${f.name}`}
              className="group flex min-h-16 items-center gap-3 rounded-full bg-papel-2 py-2 pr-3 pl-2 text-left transition-colors duration-300 hover:bg-blush"
            >
              <svg viewBox="-20 -20 40 40" aria-hidden="true" className="size-9 shrink-0 transition-transform duration-500 ease-[var(--ease-drawer)] group-hover:rotate-[-12deg] sm:size-11">
                <path d={cupPath(15)} fill="#d9b8a3" />
                <Sweet f={f} r={13} seed={3} />
              </svg>
              <span className="min-w-0 flex-1 text-note leading-tight font-medium">
                {f.name}
                <span className="hidden font-normal text-tinta-suave sm:block">{f.note}</span>
              </span>
              <AnimatePresence>
                {tally[f.id] ? (
                  <m.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={settle}
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-cobre text-[0.8125rem] font-semibold text-papel tabular-nums"
                  >
                    {tally[f.id]}
                  </m.span>
                ) : null}
              </AnimatePresence>
            </m.button>
          ))}
        </m.div>
      </m.div>

      {/* a caixa: casca de papel com o miolo de cacau dentro, como a caixa de verdade */}
      <m.div {...inView} variants={rise} className="order-2 lg:sticky lg:top-24 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-start">
        <div className="rounded-[2rem] bg-papel-2 p-2">
          <div className="overflow-hidden rounded-[calc(2rem-0.5rem)] bg-cacau">
            <div className="grid place-items-center pt-7 pb-2">
              <img src={seloClaro} alt="" width={640} height={640} loading="lazy" className="w-28" />
            </div>
            <svg viewBox="0 0 360 360" role="img" aria-label={`Caixa com ${filled} de ${size} doces`} className="block w-full px-[6%] pb-[6%]">
              {slots.map((id, k) => {
                const f = id ? byId[id] : null;
                const x = ((k % cols) + 0.5) * (360 / cols);
                const y = (Math.floor(k / cols) + 0.5) * (360 / cols);
                return (
                  <m.g
                    key={k}
                    initial={false}
                    animate={{ x, y, scale }}
                    transition={reduce ? { duration: 0 } : settle}
                    onClick={() => f && remove(k)}
                    onKeyDown={(e) => { if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); remove(k); } }}
                    role={f ? 'button' : undefined}
                    tabIndex={f ? 0 : -1}
                    aria-label={f ? `Tirar ${f.name}` : undefined}
                    className={f ? 'cursor-pointer outline-none' : ''}
                  >
                    <rect x={-CELL / 2 + 3} y={-CELL / 2 + 3} width={CELL - 6} height={CELL - 6} rx={6} fill={palette.cacau2} />
                    <path d={cupPath(CELL * 0.4)} fill={f ? '#d9b8a3' : '#5a3d32'} style={{ transition: 'fill .4s' }} />
                    <AnimatePresence>
                      {f && (
                        <m.g
                          key={id}
                          initial={reduce ? { opacity: 0 } : { scale: 0.3, y: -40, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0, transition: { duration: 0.25 } }}
                          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                          whileHover={{ scale: 0.92 }}
                        >
                          <Sweet f={f} r={CELL * 0.34} seed={k + 11} />
                        </m.g>
                      )}
                    </AnimatePresence>
                  </m.g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between px-2">
          <m.p key={full} animate={full ? { x: [0, -6, 6, -3, 0] } : {}} transition={{ duration: 0.4 }} aria-live="polite" className={`font-medium ${filled === size ? 'text-cobre' : ''}`}>
            {full > 0 && filled === size ? 'Caixa cheia. Toque num doce para tirar.' : (
              <><NumberFlow value={filled} /> de {size} doces</>
            )}
          </m.p>
          <p className="font-display text-statement leading-none tabular-nums">
            <NumberFlow value={price} format={{ style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }} locales="pt-BR" />
          </p>
        </div>

        <div className="mt-6 grid justify-items-center gap-2">
          <Cta href={whatsappUrl(message)} external className="w-full" icon={<WhatsappLogo size={20} weight="light" />}>
            Enviar pedido pelo WhatsApp
          </Cta>
          <AnimatePresence>
            {filled > 0 && (
              <m.button
                type="button"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                onClick={() => { setSlots(Array(size).fill(null)); setFull(0); }}
                className="min-h-11 px-4 text-note font-medium text-tinta-suave underline underline-offset-4 transition-colors hover:text-cobre"
              >
                Esvaziar a caixa
              </m.button>
            )}
          </AnimatePresence>
        </div>
      </m.div>
    </section>
  );
};
