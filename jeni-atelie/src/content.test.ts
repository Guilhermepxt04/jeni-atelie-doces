import { describe, expect, it } from 'vitest';
import { findItem, formatBRL, menu } from './content';

const price = (id: string) => findItem(id)?.price;

describe('cardápio', () => {
  it('menu has 22 priced items across 6 groups', () => {
    expect(menu).toHaveLength(6);
    expect(menu.reduce((n, g) => n + g.items.length, 0)).toBe(22);
  });

  it('brownie prices', () => {
    expect(price('brownie-tradicional')).toBe(15);
    expect(price('brownie-ferrero')).toBe(22);
    expect(price('brownie-ninho')).toBe(20);
    expect(price('brownie-cacau-50')).toBe(18);
  });

  it('pote prices', () => {
    expect(price('pote-choco-maracuja')).toBe(22);
    expect(price('pote-branca-maracuja')).toBe(22);
    expect(price('pote-ninho-morango')).toBe(20);
    expect(price('pote-belga')).toBe(20);
    expect(price('pote-cenoura')).toBe(22);
    expect(price('pote-prestigio')).toBe(20);
    expect(price('pote-pudim')).toBe(20);
  });

  it('fatias prices', () => {
    expect(price('fatia-choco-maracuja')).toBe(15);
    expect(price('fatia-ninho-morango')).toBe(18);
    expect(price('fatia-torta-maracuja')).toBe(14);
    expect(price('fatia-pudim')).toBe(16);
    expect(price('fatia-banoffee')).toBe(18);
  });

  it('coxinhas prices', () => {
    expect(price('coxinha-belga')).toBe(20);
    expect(price('coxinha-ninho-nutella')).toBe(20);
    expect(price('coxinha-ferrero')).toBe(22);
  });

  it('unitarios and salgado', () => {
    expect(price('surpresa-de-uva')).toBe(15);
    expect(price('morango-cravejado')).toBe(18);
    expect(price('empadao-frango')).toBe(18);
  });

  it('ids are unique', () => {
    const ids = menu.flatMap((g) => g.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('findItem tells the group', () => {
    expect(findItem('coxinha-belga')?.group).toBe('coxinhas');
    expect(findItem('nao-existe')).toBeUndefined();
  });
});

describe('formatBRL', () => {
  it('whole reais without cents, with a regular space', () => {
    expect(formatBRL(15)).toBe('R$ 15');
    expect(formatBRL(64)).toBe('R$ 64');
  });
  it('cents when present', () => {
    expect(formatBRL(6.5)).toBe('R$ 6,50');
  });
});
