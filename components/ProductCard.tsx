import Image from "next/image";
import { Product } from "@/types/product.type";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = (props: ProductCardProps) => {
  const { product, onAddToCart } = props;

  return (
    <div className="border border-blue-300 shadow rounded-xl p-4 w-80 text-base hover:scale-105">
      <div className={`relative w-full h-72 ${product.photos?.length ? '' : 'bg-slate-200'}`}>
        {!!product.photos?.length && (
          <Image
            src={product.photos[0]}
            alt="product image"
            loader={({src}) => src}
            fill
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <div className="mt-3 rounded-xl text-[20px]">{product.name}</div>
      <div className="mt-3 w-full flex items-center justify-between">
        <span className="inline-block">{`$${product.price}`}</span>
        {product.quantityInCart
            ? <span>Quantity: <span className="font-semibold text-orange-600">{product.quantityInCart}</span></span>
            : <button
                className="rounded-xl ml-6 flex-1 bg-red-500 text-amber-50 py-2 hover:scale-105 hover:opacity-75"
                onClick={() => onAddToCart && onAddToCart(product)}
              >
                Add to Cart
              </button>
        }
      </div>
    </div>
  )
}

export default ProductCard