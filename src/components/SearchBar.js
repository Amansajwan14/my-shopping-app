"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ searchTerm, setSearchTerm, placeholder = "Search products..." }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue, setSearchTerm]);

  return (
    <div className="flex overflow-x-auto gap-4 py-4 px-2 bg-purple-100 rounded">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 rounded bg-white text-black shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        aria-label="Search products"
      />
    </div>
  );
}
