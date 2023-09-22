'use client'

import { useContext } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CartContext } from "@/contexts/cart.context";
import { Product } from "@/types/product.type";

const ShoppingCart = () => {
  const { products } = useContext(CartContext);

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <Link href={'/'} className="self-start text-blue-500 hover:underline">← Back to home</Link>
      <h1 className="font-bold text-xl mt-4">Shopping Cart</h1>
      <ol
        className="mt-6 grid-cols-1 grid gap-row-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
      >
        {products.map((item: Product) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ol>
    </main>
  )
}

export default ShoppingCart;