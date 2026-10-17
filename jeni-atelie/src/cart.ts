// Sacolinha: funções puras do pedido e as mensagens prontas para o WhatsApp.
import { WHATSAPP_NUMBER, findGroup, findItem, formatBRL } from './content';

export type CartLine = { id: string; qty: number };
export type Cart = CartLine[];
export type CakeSize = 'ate-10' | '20' | '30-mais';

export const cakeSizes: { id: CakeSize; label: string }[] = [
  { id: 'ate-10', label: 'até 10 pessoas' },
  { id: '20', label: '20 pessoas' },
  { id: '30-mais', label: '30 ou mais' },
];

export const addItem = (cart: Cart, id: string): Cart =>
  cart.some((l) => l.id === id)
    ? cart.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
    : [...cart, { id, qty: 1 }];

export const removeItem = (cart: Cart, id: string): Cart =>
  cart.flatMap((l) => (l.id !== id ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []));

export const cartCount = (cart: Cart): number => cart.reduce((n, l) => n + l.qty, 0);

export const cartTotal = (cart: Cart): number =>
  cart.reduce((sum, l) => sum + (findItem(l.id)?.price ?? 0) * l.qty, 0);

/** "Bolo de pote Prestígio"; itens sem prefixo (surpresa, empadão) usam só o nome */
export const itemLabel = (id: string): string => {
  const item = findItem(id);
  if (!item) return id;
  const { prefix } = findGroup(item.group);
  return prefix ? `${prefix} ${item.name}` : item.name;
};

export const buildOrderMessage = (cart: Cart): string => {
  const lines = cart
    .filter((l) => findItem(l.id))
    .map((l) => `• ${l.qty}× ${itemLabel(l.id)} (${formatBRL(findItem(l.id)!.price * l.qty)})`);
  return [
    'Oi, Jeni! Quero fazer um pedido:',
    '',
    ...lines,
    '',
    `Total: ${formatBRL(cartTotal(cart))}`,
    '',
    'Retirar ou receber em casa?',
    'Pode ser para quando? Se algum sabor tiver acabado, combinamos uma data.',
  ].join('\n');
};

export const buildCakeMessage = (size: CakeSize): string => {
  const label = cakeSizes.find((s) => s.id === size)!.label;
  return [
    `Oi, Jeni! Quero encomendar um bolo inteiro para ${label}.`,
    '',
    'Sabor que estou pensando: ',
    'A data da festa é: ',
    'Retirar ou receber em casa?',
  ].join('\n');
};

export const whatsappUrl = (text = 'Oi, Jeni! Vim pelo site e queria fazer um pedido.'): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
