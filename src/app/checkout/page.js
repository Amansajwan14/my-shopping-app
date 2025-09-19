"use client";

import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, placeOrder } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    placeOrder();
    toast.success("Order placed successfully!");
    router.push("/thank-you");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
