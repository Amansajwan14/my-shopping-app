"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function SimpleImageCarousel({ products = [], height = "400px" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState({}); // track loaded images

  // Reset and start timer for auto slide
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (products.length === 0) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => resetTimeout();
  }, [currentIndex, products]);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height, width: "100%" }}>
        <p className="text-gray-500">No featured products available.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {products.map((product, index) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          aria-hidden={index !== currentIndex}
          tabIndex={index === currentIndex ? 0 : -1}
          className={`absolute top-1/2 left-1/2 max-w-full max-h-full transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="relative w-auto h-full">
            {/* Shimmer placeholder */}
            {!loadedImages[product.id] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
            )}
            <img
              src={product.image}
              alt={product.title || product.name || "Product image"}
              className="object-contain rounded w-auto h-full relative"
              style={{ aspectRatio: "211 / 35" }}
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [product.id]: true }))
              }
            />
          </div>
        </Link>
      ))}

      {/* Dots for navigation */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {products.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentIndex ? "true" : "false"}
            className={`w-4 h-4 rounded-full transition-all ${
              idx === currentIndex ? "bg-white w-5 h-5" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
