"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import Image from "next/image";
import NameAddressModal from "../../../components/NameAddressModal";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, placeOrder } = useCart();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  const handleBuyNow = (customer) => {
    const singleOrderItems = [{ ...product, quantity: 1 }];

    placeOrder(customer, singleOrderItems);
    setModalOpen(false);
    toast.success(
      `🎉 Thank you ${customer.name}! Your order with ${customer.paymentMethod} has been placed.`
    );

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (!product) {
    return <p className="p-8">Loading product...</p>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Toaster />
      <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-4">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="rounded"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">₹{product.price}</p>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <NameAddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBuyNow}
      />
    </div>
  );
}
