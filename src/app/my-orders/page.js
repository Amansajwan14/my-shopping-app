"use client";

import { useCart } from "../../context/CartContext";

export default function MyOrdersPage() {
  const { orders } = useCart();

  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {sortedOrders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        sortedOrders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-4 border border-gray-300 rounded shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p className="text-sm text-gray-500 mb-4">Placed on: {order.date}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.items.map((item) => (
                <li key={item.id} className="border p-2 rounded">
                  <p className="font-semibold">{item.title || item.name}</p>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Price: ₹{item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
