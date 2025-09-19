"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <nav className="bg-purple-700 text-white shadow sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold hover:text-yellow-400 transition">
        <Link href="/">🛍️ MyShop</Link>
      </div>

      <ul className="flex space-x-6 items-center font-medium">
        <li>
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
        </li>

        {user ? (
          <>
            <li>Hello, {user}</li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-400 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-yellow-400 transition">
                Signup
              </Link>
            </li>
          </>
        )}

        <li>
          <Link href="/my-orders" className="hover:text-yellow-400 transition">
            My Orders
          </Link>
        </li>

        <li className="relative">
          <Link href="/cart" className="hover:text-yellow-400 transition">
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
