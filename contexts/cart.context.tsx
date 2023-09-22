'use client'

import React, { createContext, useState } from "react";
import { Product } from "@/types/product.type";

interface CartContextProps {
  products: Product[]
  onAddToCart: (product: Product) => void;
}

export const CartContext = createContext<CartContextProps>({
  products: [],
  onAddToCart: () => {}
})

export const CartContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    let existsInCart = false;
    let result = [];
    for (let p of products) {
      if (p.id === product.id) {
        existsInCart = true;
        result.push({ ...p, quantityInCart: (p.quantityInCart ?? 0) + 1 })
      } else {
        result.push({ ...p })
      }
    }
    if (!existsInCart) {
      result.push({ ...product, quantityInCart: 1 })
    }
    setProducts(result)
  }

  return (
    <CartContext.Provider value={{ products, onAddToCart: handleAddToCart }}>
      {children}
    </CartContext.Provider>
  )
}
