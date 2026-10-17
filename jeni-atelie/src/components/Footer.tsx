import { m } from 'framer-motion';
import { EMAIL, INSTAGRAM, WHATSAPP_DISPLAY, areas, CITY, hours } from '../content';
import { whatsappUrl } from '../cart';
import { selo } from '../images';
import { inView, rise, stagger } from '../hooks/motion';

// Rodapé rosa: selo grande, contatos, horários, bairros atendidos e a nota das fotos
export const Footer = () => {
  const links = [
    { label: `WhatsApp ${WHATSAPP_DISPLAY}`, href: whatsappUrl(), external: true },
    { label: EMAIL, href: `mailto:${EMAIL}` },
    { label: `Instagram @${INSTAGRAM}`, href: `https://instagram.com/${INSTAGRAM}`, external: true },
  ];

  return (
    <footer className="mx-2 mb-2 rounded-[2.5rem] bg-rosa px-6 pt-16 pb-10 sm:mx-3 sm:mb-3 sm:px-10 lg:px-14 lg:pt-20">
      <m.div {...inView} variants={stagger(0.08)} className="mx-auto grid max-w-[80rem] gap-12 md:grid-cols-[auto_1fr_1fr] md:items-start lg:gap-16">
        <m.img variants={rise} src={selo} alt="Jeni Ateliê, doces artesanais" width={600} height={600} loading="lazy" className="w-40 md:w-48" />

        <m.div variants={rise}>
          <p className="font-display text-statement font-bold">Fala com a Jeni</p>
          <ul className="mt-4 grid">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="inline-flex min-h-11 items-center font-semibold transition-colors duration-300 hover:text-morango-forte">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </m.div>

        <m.div variants={rise}>
          <p className="font-display text-statement font-bold">Quando e onde</p>
          <dl className="mt-4 grid gap-1.5 tabular-nums">
            {hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4">
                <dt>{d}</dt>
                <dd className="text-chocolate-suave">{h}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4">Entrega grátis na {areas[0]} e no {areas[1]}, em {CITY}.</p>
        </m.div>
      </m.div>

      <div className="mx-auto mt-14 flex max-w-[80rem] flex-col gap-2 text-note text-chocolate-suave sm:flex-row sm:justify-between">
        <p>© 2026 Jeni Ateliê · Doces Artesanais</p>
        <p>Algumas fotos são ilustrativas.</p>
      </div>
    </footer>
  );
};
