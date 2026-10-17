import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { menu } from '../content';
import { img } from '../images';
import { easeOutExpo } from '../theme';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

// O cardápio é uma folha impressa de bordas recortadas; ao lado, uma foto que se abre de baixo para cima.
export const Menu = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const clip = useTransform(scrollYProgress, [0, 1], [reduce ? 'inset(0% 0 0 0 round 2rem)' : 'inset(38% 0 0 0 round 2rem)', 'inset(0% 0 0 0 round 2rem)']);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.18, 1]);

  return (
    <section id="cardapio" aria-labelledby="cardapio-t" className="grid gap-y-12 px-2.5 py-24 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-44">
      <div ref={ref} className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <m.figure style={{ clipPath: clip }} className="overflow-hidden rounded-[2rem]">
          <m.img
            style={{ scale }}
            srcSet={img.cupcake.srcSet}
            sizes="(min-width: 1024px) 40vw, 100vw"
            src={img.cupcake.src}
            width={img.cupcake.width}
            height={img.cupcake.height}
            alt="Cupcake de chocolate com cobertura de framboesa e uma framboesa por cima"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
          />
        </m.figure>
      </div>

      <div className="w-full lg:col-span-6 lg:col-start-7 lg:max-w-[40rem] lg:justify-self-end">
        <m.div {...inView} variants={stagger(0.05)} className="rounded-[2rem] bg-papel px-6 pt-14 pb-14 text-center sm:px-14">
          <m.h2 id="cardapio-t" variants={rise} className="font-display text-statement">Cardápio do ateliê</m.h2>
          <m.p variants={rise} className="mt-3 text-note text-tinta-suave">Docinhos vendidos por cento. Mínimo de 25 por sabor.</m.p>

          {menu.map((group) => (
            <m.div key={group.title} variants={stagger(0.04)} className="mt-14">
              <m.h3 variants={rise} className="mb-6 text-lead font-medium">{group.title}</m.h3>
              <ul className="mx-auto grid max-w-[27.5rem] gap-4 text-left">
                {group.items.map((it) => (
                  <m.li
                    key={it.name}
                    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOutExpo } } }}
                    className="group flex items-baseline justify-between gap-5"
                  >
                    <span className="flex flex-col">
                      <span className="font-medium transition-colors duration-300 group-hover:text-cobre">{it.name}</span>
                      <span className="mt-0.5 text-note text-tinta-suave">{it.desc}</span>
                    </span>
                    <span className="whitespace-nowrap tabular-nums">{it.price}</span>
                  </m.li>
                ))}
              </ul>
            </m.div>
          ))}

          <m.p variants={rise} className="mt-14 font-display text-lead italic">
            Pedidos de terça a sábado,<br />com 7 dias de antecedência.
          </m.p>
        </m.div>
      </div>
    </section>
  );
};
