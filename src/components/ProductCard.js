"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart, placeOrder } = useCart();

  const handleBuyNow = () => {
    addToCart(product);
    placeOrder({}); // Can be extended with customer info
    toast.success("Order placed successfully!");
  };

  return (
    <div className="bg-white shadow-md p-4 rounded hover:shadow-lg hover:scale-[1.03] transition-transform duration-300">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title || product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-md mb-3 cursor-pointer"
        />
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition mb-1">{product.title || product.name}</h2>
        <p className="text-gray-500 text-sm mb-2 truncate" title={product.description || "Great product."}>
          {product.description || "Great product."}
        </p>
        <p className="text-gray-700 font-semibold">₹{product.price}</p>
      </Link>

      <button
        onClick={() => { addToCart(product); toast.success("Added to cart!"); }}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
      >
        Add to Cart
      </button>

      <button
        onClick={handleBuyNow}
        className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:scale-105 transition-transform duration-200"
      >
        Buy Now
      </button>
    </div>
  );
}
