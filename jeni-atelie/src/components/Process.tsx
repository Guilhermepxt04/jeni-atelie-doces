import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { process } from '../content';
import { easeOutExpo } from '../theme';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

// A comanda sai da "impressora" conforme a seção entra na tela.
export const Process = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? '0%' : '-40%', '0%']);

  return (
    <section id="como" aria-labelledby="como-t" className="grid gap-12 bg-blush px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-44">
      <m.div {...inView} variants={stagger(0.1)} className="lg:col-span-5">
        <m.h2 id="como-t" variants={rise} className="font-display text-display">{process.title}</m.h2>
        <m.p variants={rise} className="mt-6 max-w-[34ch]">{process.text}</m.p>
      </m.div>

      <div ref={ref} className="w-full max-w-[34rem] lg:col-span-6 lg:col-start-7">
        {/* a fenda da impressora: a comanda desliza por baixo dela */}
        <div aria-hidden="true" className="relative z-10 h-3 rounded-full bg-cacau" />
        <div className="-mt-1.5 overflow-hidden px-2 pb-6">
          <m.div style={{ y }}>
            <div className="bg-papel px-5 pt-9 tabular-nums sm:px-8">
              <p className="text-center text-lead font-medium">Comanda de encomenda</p>
              {process.groups.map((g) => (
                <m.div key={g.when} {...inView} variants={stagger(0.07)}>
                  <p className="mt-7 mb-2.5 font-semibold">{g.when}</p>
                  <ol className="grid gap-2.5">
                    {g.rows.map(([what, when]) => (
                      <m.li key={what} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }} className="flex items-baseline gap-2.5 text-note sm:text-body">
                        <span>{what}</span>
                        {/* pontilhado só onde a linha cabe inteira; no celular o prazo vai alinhado à direita */}
                        <i aria-hidden="true" className="leader hidden min-w-6 flex-1 self-center sm:block" />
                        <span className="ml-auto text-right whitespace-nowrap text-tinta-suave sm:ml-0">{when}</span>
                      </m.li>
                    ))}
                  </ol>
                </m.div>
              ))}
              <div className="relative -mx-5 mt-8 flex min-h-13 items-center justify-between overflow-hidden px-5 font-semibold text-papel sm:-mx-8 sm:px-8">
                <m.span
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.3 }}
                  className="absolute inset-0 origin-left bg-tinta"
                />
                <span className="relative">{process.total[0]}</span>
                <span className="relative">{process.total[1]}</span>
              </div>
            </div>
            <div aria-hidden="true" className="edge-zigzag" />
          </m.div>
        </div>
      </div>
    </section>
  );
};
