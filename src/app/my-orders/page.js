"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";

export default function MyOrdersPage() {
  const { orders } = useCart();

  // Sort orders latest-first
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {sortedOrders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        sortedOrders.map((order, index) => (
          <div
            key={`${order.id}-${index}`} // <-- Use index to ensure uniqueness
            className="mb-6 p-4 border border-gray-300 rounded shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p className="text-sm text-gray-500 mb-1">
              Placed on: {order.date}
            </p>
            {order.customer && (
              <p className="text-sm text-gray-500 mb-2">
                Customer: {order.customer.name}, Address: {order.customer.address}
              </p>
            )}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.items.map((item, idx) => (
                <li
                  key={`${order.id}-${item.id || idx}`}
                  className="bg-gray-100 p-3 rounded"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name || "Product"}
                      width={50}
                      height={50}
                      className="object-contain rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity || 1}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
