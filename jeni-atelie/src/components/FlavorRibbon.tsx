import { findItem } from '../content';
import { itemLabel } from '../cart';

// Os nomes vêm do cardápio: um por grupo e alguns sabores de assinatura
const names = [
  'pote-choco-maracuja', 'coxinha-ninho-nutella', 'fatia-pudim', 'brownie-ferrero',
  'surpresa-de-uva', 'fatia-banoffee', 'pote-ninho-morango', 'morango-cravejado',
].filter((id) => findItem(id)).map(itemLabel);

// florzinha de cinco pétalas, em manteiga, separando os nomes
const Flower = () => (
  <svg viewBox="-12 -12 24 24" aria-hidden="true" className="size-6 shrink-0">
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx={0} cy={-6} rx={4} ry={6} fill="var(--color-manteiga)" transform={`rotate(${a})`} />
    ))}
    <circle r={3.2} fill="var(--color-creme)" />
  </svg>
);

// Fita rosa-morango, levemente torta, correndo devagar entre a capa e o cardápio.
// A lista vem duplicada: -50% fecha o laço sem salto. Para no hover e fica parada
// para quem prefere menos movimento.
export const FlavorRibbon = () => {
  const items = [...names, ...names];
  return (
    // o recorte fica no envoltório: a fita girada não pode empurrar a página para o lado
    <div aria-hidden="true" className="overflow-x-clip py-8 lg:py-12">
    <div className="group relative z-10 -mx-4 -rotate-2 overflow-clip bg-morango-forte py-4 lg:py-5">
      <div className="flex w-max animate-[ribbon_52s_linear_infinite] items-center gap-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((name, i) => (
          <span key={`${name}-${i}`} className="flex items-center gap-6 whitespace-nowrap">
            <span className="font-display text-statement font-semibold text-white">{name}</span>
            <Flower />
          </span>
        ))}
      </div>
    </div>
    </div>
  );
};
