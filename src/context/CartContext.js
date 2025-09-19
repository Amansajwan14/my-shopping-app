"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCartItems([]);
  }

  function placeOrder(customerDetails) {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems,
      customer: customerDetails || {},
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, placeOrder, orders }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
