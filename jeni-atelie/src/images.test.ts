import { describe, expect, it } from 'vitest';
import { menu } from './content';
import { photos, selo } from './images';

describe('fotos', () => {
  it('every photo has a responsive source, size and a Portuguese alt', () => {
    for (const [key, p] of Object.entries(photos)) {
      expect(p.srcSet, key).toMatch(/ \d+w$/);
      expect(p.width, key).toBeGreaterThan(300);
      expect(p.height, key).toBeGreaterThan(300);
      expect(p.alt.length, key).toBeGreaterThan(20);
    }
  });

  it('every menu group points to existing photos', () => {
    for (const g of menu) {
      expect(g.photos.length, g.id).toBeGreaterThan(0);
      for (const k of g.photos) expect(photos[k], `${g.id}:${k}`).toBeDefined();
    }
  });

  it('whole cake photo is available for the cake section', () => {
    expect(photos['gerada-bolo-inteiro']?.alt).toMatch(/bolo/i);
  });

  it('seal is available', () => {
    expect(selo).toBeTruthy();
  });
});
