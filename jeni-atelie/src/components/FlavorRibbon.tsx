import { flavors } from '../content';
import { Sweet } from './BoxBuilder';

// Faixa de sabores correndo devagar entre a capa e as ocasiões, cada nome separado
// por um docinho desenhado. A lista vem duplicada: -50% fecha o laço sem salto.
// Para no hover, e fica parada para quem prefere menos movimento.
export const FlavorRibbon = () => {
  const items = [...flavors, ...flavors];
  return (
    <div aria-hidden="true" className="group overflow-clip py-10 lg:py-14">
      <div className="flex w-max animate-[ribbon_48s_linear_infinite] items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((f, i) => (
          <span key={`${f.id}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <svg viewBox="-16 -16 32 32" className="size-9 shrink-0">
              <Sweet f={f} r={13} seed={5} />
            </svg>
            <span className="font-display text-statement text-papel/90 italic">{f.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
