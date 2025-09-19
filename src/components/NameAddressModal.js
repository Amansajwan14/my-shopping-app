"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function NameAddressModal({ product, onClose }) {
  const { placeOrder } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handlePlaceOrder = () => {
    if (!name.trim() || !address.trim()) {
      toast.error("Please enter both name and address.");
      return;
    }

    // Place order with only this product
    placeOrder([ { ...product, quantity: 1 } ]);
    toast.success("Order placed successfully!");

    // Reset and close modal
    setName("");
    setAddress("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
