"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryIconBar from "../components/CategoryIconBar";
import FeaturedCarousel from "../components/FeaturedCarousel";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setRandomProducts(data.sort(() => 0.5 - Math.random()).slice(0, 5));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  const clearCategory = () => setSelectedCategory("All");

  return (
    <>
      <div className="sticky top-[64px] z-40 bg-purple-600 text-white shadow-md w-full">
        <div className="max-w-7xl mx-auto p-4 space-y-2">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search products..." />
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
        {randomProducts.length === 0 ? (
          <p className="text-gray-500">No featured products available.</p>
        ) : (
          <FeaturedCarousel products={randomProducts} />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 bg-white rounded-md shadow-md mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </div>
    </>
  );
}
