import { describe, expect, it } from 'vitest';
import { addItem, buildCakeMessage, buildOrderMessage, cartCount, cartTotal, removeItem, whatsappUrl } from './cart';

describe('sacolinha', () => {
  it('adding twice makes one line with qty 2', () => {
    expect(addItem(addItem([], 'pote-belga'), 'pote-belga')).toEqual([{ id: 'pote-belga', qty: 2 }]);
  });

  it('remove to zero drops the line', () => {
    const cart = addItem([], 'pote-belga');
    expect(removeItem(cart, 'pote-belga')).toEqual([]);
  });

  it('remove on empty cart returns []', () => {
    expect(removeItem([], 'pote-belga')).toEqual([]);
  });

  it('remove decrements without touching other lines', () => {
    const cart = [{ id: 'pote-belga', qty: 2 }, { id: 'fatia-pudim', qty: 1 }];
    expect(removeItem(cart, 'pote-belga')).toEqual([{ id: 'pote-belga', qty: 1 }, { id: 'fatia-pudim', qty: 1 }]);
  });

  it('count and total', () => {
    const cart = [{ id: 'pote-choco-maracuja', qty: 2 }, { id: 'coxinha-belga', qty: 1 }];
    expect(cartCount(cart)).toBe(3);
    expect(cartTotal(cart)).toBe(64);
  });

  it('unknown ids are ignored in totals', () => {
    expect(cartTotal([{ id: 'nao-existe', qty: 3 }])).toBe(0);
  });
});

describe('mensagens', () => {
  it('order message', () => {
    expect(buildOrderMessage([{ id: 'pote-prestigio', qty: 2 }, { id: 'coxinha-ninho-nutella', qty: 1 }])).toBe(
      'Oi, Jeni! Quero fazer um pedido:\n\n' +
        '• 2× Bolo de pote Prestígio (R$ 40)\n' +
        '• 1× Coxinha de morango Ninho com Nutella (R$ 20)\n\n' +
        'Total: R$ 60\n\n' +
        'Retirar ou receber em casa?\n' +
        'Pode ser para quando? Se algum sabor tiver acabado, combinamos uma data.',
    );
  });

  it('items without prefix use the name alone', () => {
    expect(buildOrderMessage([{ id: 'surpresa-de-uva', qty: 1 }])).toContain('• 1× Surpresa de uva (R$ 15)');
  });

  it('cake message', () => {
    const msg = buildCakeMessage('20');
    expect(msg).toContain('bolo inteiro');
    expect(msg).toContain('20 pessoas');
    expect(msg).toContain('data');
  });

  it('whatsappUrl encodes once', () => {
    expect(whatsappUrl('Prestígio & cia')).toMatch(/\?text=Prest%C3%ADgio%20%26%20cia$/);
    expect(whatsappUrl()).toContain('?text=Oi');
  });
});
