"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryIconBar from "../components/CategoryIconBar";
import FeaturedCarousel from "../components/FeaturedCarousel";
import Fuse from "fuse.js";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [randomProducts, setRandomProducts] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setRandomProducts(data.sort(() => 0.5 - Math.random()).slice(0, 5));
    }
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const fuse = new Fuse(products, {
    keys: ["title", "description", "category"],
    threshold: 0.3,
  });

  const fuzzyResults = searchTerm.trim()
    ? fuse.search(searchTerm.trim()).map((result) => result.item)
    : products;

  const filteredProducts = fuzzyResults.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  );

  useEffect(() => {
    if (!searchTerm) {
      setSuggestion("");
      return;
    }
    const results = fuse.search(searchTerm.trim());
    if (results.length > 0 && results[0].item.title.toLowerCase() !== searchTerm.toLowerCase()) {
      setSuggestion(results[0].item.title);
    } else {
      setSuggestion("");
    }
  }, [searchTerm, fuse]);

  const clearCategory = () => setSelectedCategory("All");

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products.slice(0, 5);

  return (
    <>
      <div className="sticky top-[64px] z-40 bg-purple-600 text-white shadow-md w-full">
        <div className="max-w-7xl mx-auto p-4 space-y-2">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search products..."
          />
          <CategoryIconBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onClearCategory={clearCategory}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 bg-purple-50 rounded-md shadow">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Featured Products</h2>
        <FeaturedCarousel products={randomProducts} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 bg-white rounded-md shadow-md mt-8">
        {products.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="bg-gray-200 h-64 rounded animate-pulse" />
              ))}
          </div>
        )}

        {filteredProducts.length === 0 && suggestion && (
          <p className="mb-4 text-gray-700">
            Did you mean:{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => setSearchTerm(suggestion)}
            >
              {suggestion}
            </span>
            ?
          </p>
        )}

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {filteredProducts.length > 0 ? "All Products" : "Suggestions for you"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayProducts.map((product, idx) => (
            <div
              key={product.id}
              className="transition-opacity duration-700 ease-in-out opacity-0 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s forwards;
        }
      `}</style>
    </>
  );
}
