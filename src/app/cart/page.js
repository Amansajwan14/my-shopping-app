"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { useState } from "react";
import NameAddressModal from "../../components/NameAddressModal";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, removeFromCart, placeOrder } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = (customer) => {
    placeOrder(customer);
    setModalOpen(false);

    // Show thank-you toast
    toast.success(
      `🎉 Thank you ${customer.name}! Your order with ${customer.paymentMethod} has been placed.`
    );

    // Redirect to Home after 3 seconds
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Toaster />
      <section>
        <h1 className="text-2xl font-bold mb-4">My Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name || "Cart item"}
                  width={64}
                  height={64}
                  className="object-contain rounded"
                />
                <div className="flex-1">{item.name || "Unnamed item"}</div>
                <div>Qty: {item.quantity}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </>
        )}
      </section>

      <NameAddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePlaceOrder}
      />
    </div>
  );
}
