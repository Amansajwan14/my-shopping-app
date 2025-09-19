"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import NameAddressModal from "./NameAddressModal";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  HomeIcon,
  BookOpenIcon,
  GiftIcon,
  SparklesIcon,
  TrophyIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const categoriesWithIcons = {
  Home: <HomeIcon className="w-6 h-6 text-white" />,
  Fashion: <ShoppingBagIcon className="w-6 h-6 text-white" />,
  Mobile: <DevicePhoneMobileIcon className="w-6 h-6 text-white" />,
  Electronics: <ComputerDesktopIcon className="w-6 h-6 text-white" />,
  Beauty: <SparklesIcon className="w-6 h-6 text-white" />,
  Toys: <GiftIcon className="w-6 h-6 text-white" />,
  Sports: <TrophyIcon className="w-6 h-6 text-white" />,
  Furniture: <HomeIcon className="w-6 h-6 text-white" />,
  Books: <BookOpenIcon className="w-6 h-6 text-white" />,
};

export default function ProductCard({ product }) {
  const { addToCart, placeOrder } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const categoryIcon =
    categoriesWithIcons[product.category] || (
      <ShoppingBagIcon className="w-6 h-6 text-white" />
    );

  const handleBuyNow = (customer) => {
    const singleOrder = [{ ...product, quantity: 1 }];
    placeOrder(customer, singleOrder);
    setModalOpen(false);

    toast.success(`🎉 Thank you ${customer.name}, your order has been placed!`);
    router.push("/thank-you");
  };

  return (
    <div className="bg-white shadow-md p-4 rounded hover:shadow-lg hover:scale-[1.03] transition-transform duration-300">
      <Toaster />

      {/* Category */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{categoryIcon}</span>
        <span className="text-sm font-semibold text-gray-500">
          {product.category || "General"}
        </span>
      </div>

      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title || product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-md mb-3 cursor-pointer"
        />
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition mb-1">
          {product.title || product.name}
        </h2>
        <p
          className="text-gray-500 text-sm mb-2 truncate"
          title={product.description || "Great product."}
        >
          {product.description || "Great product."}
        </p>
        <p className="text-gray-700 font-semibold">₹{product.price}</p>
      </Link>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
        >
          Add to Cart
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:scale-105 transition-transform duration-200"
        >
          Buy Now
        </button>
      </div>

      <NameAddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBuyNow}
      />
    </div>
  );
}
