import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { occasions } from '../content';
import { img } from '../images';
import { easeOutExpo } from '../theme';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

// Comandas do ateliê: seis papéis que sobem do pé da foto, cada um com uma encomenda típica.
export const Occasions = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', reduce ? '-8%' : '8%']);

  return (
    <section ref={ref} aria-labelledby="ocasioes-t" className="relative overflow-hidden bg-cacau text-papel lg:min-h-[100dvh]">
      <m.img
        style={{ y: bgY }}
        srcSet={img.chocolate.srcSet}
        sizes="100vw"
        src={img.chocolate.src}
        width={img.chocolate.width}
        height={img.chocolate.height}
        alt=""
        loading="lazy"
        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover brightness-[.72] saturate-[.85]"
      />

      <h2 id="ocasioes-t" className="sr-only">Encomendas por ocasião</h2>
      <m.div {...inView} variants={stagger(0.12)} className="relative max-w-[42rem] bg-cacau/70 px-6 pt-16 pb-10 sm:ml-[14%] sm:px-10 lg:pt-24">
        <m.p variants={rise} className="font-display text-statement">{occasions.statement}</m.p>
        <m.p variants={rise} className="mt-5 font-display text-statement text-papel/80">{occasions.note}</m.p>
      </m.div>

      <m.ul
        {...inView}
        variants={stagger(0.08, 0.1)}
        className="relative mt-10 grid grid-cols-2 items-end gap-2.5 px-3 pb-3 lg:absolute lg:inset-x-0 lg:-bottom-4 lg:mt-0 lg:grid-cols-6 lg:gap-3 lg:pb-0"
      >
        {occasions.slips.map((s) => (
          <m.li
            key={s.title}
            variants={{
              hidden: { y: reduce ? 0 : '60%', opacity: reduce ? 0 : 1, rotate: 0 },
              show: { y: 0, opacity: 1, rotate: s.r, transition: { duration: 1.1, ease: easeOutExpo } },
            }}
            whileHover={{ y: -14, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
            // altura mínima varia por papel; em telas baixas o papel cresce até caber o texto inteiro
            style={{ ['--h' as string]: `${s.h * 0.46}dvh` }}
            className="flex origin-bottom flex-col gap-1 bg-papel px-4 pt-5 pb-6 text-note text-tinta lg:min-h-[var(--h)] lg:px-5 lg:pb-8"
          >
            <b className="text-body font-semibold">{s.title}</b>
            <span aria-hidden="true" className="mt-0.5 mb-1.5 overflow-hidden tracking-[0.05em] whitespace-nowrap text-tinta-suave">
              - - - - - - - - - - - - - -
            </span>
            {s.lines.map((l) => <span key={l}>{l}</span>)}
          </m.li>
        ))}
      </m.ul>
    </section>
  );
};
