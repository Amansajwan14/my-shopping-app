"use client";

import { useCart } from "../../context/CartContext";

export default function MyOrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return <p className="p-6 text-gray-500">You haven&apos;t placed any orders yet.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {orders.map((order) => (
        <div
          key={order.id}
          className="mb-6 p-4 border border-gray-300 rounded shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
          <p className="text-sm text-gray-500 mb-4">Placed on: {order.date}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {order.items.map((item) => (
              <li key={item.id} className="p-2 border rounded bg-gray-50">
                <p className="font-semibold">{item.title || item.name}</p>
                <p className="text-gray-500">Qty: {item.quantity || 1}</p>
                <p className="text-gray-700 font-semibold">₹{item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
