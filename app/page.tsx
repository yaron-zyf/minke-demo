'use client'

import { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import { CartContext } from "@/contexts/cart.context";
import { Product } from "@/types/product.type";

const PRODUCT_API_URL = 'https://staging.api.1m.app/api/merchants/merchandises?merchantUserName=wokcano_tustin'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const { products: cartItems, onAddToCart } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
  }, [])

  const loadProducts = async () => {
    try {
      await fetch(PRODUCT_API_URL)
        .then(res => res.json())
        .then(data => data?.merchandises && setProducts(data.merchandises))
    } catch (err) {
      console.error('Loading products failed: ' + err);
    } finally {
      setIsLoading(false);
    }
  }

  const cartItemsTotal = useMemo(() => {
    let total = 0;
    for (let cartItem of cartItems) {
      total += (cartItem.quantityInCart ?? 0);
    }
    return total;
  }, [cartItems]);

  const renderProducts = () => {
    if (isLoading) {
      return [...Array(6)].map((_, index) => <Skeleton key={`skeleton-${index}`}/>)
    }
    if (!products.length) {
      return <p className="font-semibold text-lg text-red-600">No products found!</p>
    }
    return products.map((product: Product) => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
      />
    ))
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <h1 className="font-bold text-xl">Product List</h1>
      {!isLoading && !!products.length &&
        <p className="mt-4 text-base text-gray-500">{`Total: ${products.length} item(s)`}</p>
      }
      <Link
        href={'/cart'}
        className="relative rounded-xl mt-4 bg-red-500 text-amber-50 py-2 px-4 hover:scale-110"
      >
        Shopping Cart
        {!!cartItemsTotal && (
          <span
            className="absolute text-center h-6 w-6 rounded-full bg-amber-100 text-stone-700 border border-amber-600 -right-3 -top-3"
          >
            {cartItemsTotal}
          </span>
        )}
      </Link>
      <ol
        className="mt-6 grid-cols-1 grid gap-row-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
        >
        {renderProducts()}
      </ol>
    </main>
  )
}
