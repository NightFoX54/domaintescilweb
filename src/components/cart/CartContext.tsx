"use client";

import { createContext } from "react";
import type { CartItem } from "@/types/cart";

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  updateItem: (id: string, next: CartItem) => void;
};

export type CartApi = CartState & CartActions;

export const CartContext = createContext<CartApi | null>(null);

