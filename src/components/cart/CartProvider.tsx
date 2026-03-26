"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";
import { CartContext } from "@/components/cart/CartContext";
import { readCart, writeCart } from "@/components/cart/cartStorage";

export default function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [item, ...prev];
    });
  }, []);

  const updateItem = useCallback((id: string, next: CartItem) => {
    setItems((prev) => prev.map((x) => (x.id === id ? next : x)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const api = useMemo(
    () => ({
      items,
      addItem,
      updateItem,
      removeItem,
      clear,
    }),
    [items, addItem, updateItem, removeItem, clear],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

