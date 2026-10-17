// Dados estruturados (schema.org Bakery) gerados do cardápio, para o Google entender
// o que a Jeni vende, por quanto e onde entrega. Injetado no HTML pelo scripts/prerender.js.
import { CITY, EMAIL, INSTAGRAM, WHATSAPP_NUMBER, areas, menu } from './content';
import { itemLabel } from './cart';

// domínio de exemplo: troque junto com index.html, robots.txt e sitemap.xml
export const SITE_URL = 'https://jeniatelie.com.br/';

export const buildJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: 'Jeni Ateliê',
  description: 'Confeitaria artesanal: bolos de pote, fatias, coxinhas de morango, brownies e bolos inteiros sob encomenda, com entrega grátis na Vila Cosmopolita e no Tatuapé.',
  url: SITE_URL,
  image: `${SITE_URL}og-image.jpg`,
  telephone: `+${WHATSAPP_NUMBER}`,
  email: EMAIL,
  sameAs: [`https://instagram.com/${INSTAGRAM}`],
  servesCuisine: 'Confeitaria',
  priceRange: 'R$ 14 – R$ 22',
  address: { '@type': 'PostalAddress', addressLocality: CITY, addressRegion: 'SP', addressCountry: 'BR' },
  areaServed: areas.map((name) => ({ '@type': 'Place', name })),
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
  ],
  hasMenu: {
    '@type': 'Menu',
    name: 'Cardápio do Jeni Ateliê',
    hasMenuSection: menu.map((group) => ({
      '@type': 'MenuSection',
      name: group.title,
      description: group.blurb,
      hasMenuItem: group.items.map((item) => ({
        '@type': 'MenuItem',
        name: itemLabel(item.id),
        offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'BRL' },
      })),
    })),
  },
});
