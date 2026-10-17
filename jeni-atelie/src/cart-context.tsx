import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { addItem, cartCount, cartTotal, removeItem, type Cart } from './cart';

type Action = { type: 'add' | 'remove'; id: string } | { type: 'clear' };

const reducer = (cart: Cart, action: Action): Cart => {
  if (action.type === 'add') return addItem(cart, action.id);
  if (action.type === 'remove') return removeItem(cart, action.id);
  return [];
};

type CartApi = {
  lines: Cart;
  count: number;
  total: number;
  add(id: string): void;
  remove(id: string): void;
  clear(): void;
  qtyOf(id: string): number;
};

const CartContext = createContext<CartApi | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, dispatch] = useReducer(reducer, []);
  const api = useMemo<CartApi>(() => ({
    lines,
    count: cartCount(lines),
    total: cartTotal(lines),
    add: (id) => dispatch({ type: 'add', id }),
    remove: (id) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
    qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
  }), [lines]);
  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components -- o hook mora junto do provider
export const useCart = (): CartApi => {
  const api = useContext(CartContext);
  if (!api) throw new Error('useCart precisa estar dentro de <CartProvider>');
  return api;
};
