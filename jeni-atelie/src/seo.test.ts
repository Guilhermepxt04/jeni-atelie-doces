import { describe, expect, it } from 'vitest';
import { buildJsonLd } from './seo';

type Item = { '@type': string; name: string; offers?: { '@type': string; price: string; priceCurrency: string } };
type Section = { '@type': string; name: string; hasMenuItem: Item[] };

describe('JSON-LD da confeitaria', () => {
  const ld = buildJsonLd() as { '@type': string; hasMenu: { hasMenuSection: Section[] }; areaServed: { name: string }[] };

  it('is a Bakery with 6 menu sections', () => {
    expect(ld['@type']).toBe('Bakery');
    expect(ld.hasMenu.hasMenuSection).toHaveLength(6);
  });

  it('has 22 menu items', () => {
    expect(ld.hasMenu.hasMenuSection.reduce((n, s) => n + s.hasMenuItem.length, 0)).toBe(22);
  });

  it('brownie tradicional offer is R$ 15 in BRL', () => {
    const brownies = ld.hasMenu.hasMenuSection.find((s) => s.name === 'Brownies')!;
    const tradicional = brownies.hasMenuItem.find((i) => i.name === 'Brownie Tradicional')!;
    expect(tradicional.offers).toEqual({ '@type': 'Offer', price: '15.00', priceCurrency: 'BRL' });
  });

  it('serves Vila Cosmopolita and Tatuapé', () => {
    expect(ld.areaServed.map((a) => a.name)).toEqual(['Vila Cosmopolita', 'Tatuapé']);
  });

  it('never publishes the CEP', () => {
    expect(JSON.stringify(ld)).not.toContain('08421');
  });
});
