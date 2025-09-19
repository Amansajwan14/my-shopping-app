// src/components/CategoryIconBar.js

import React from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  GiftIcon,
  TrophyIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const categoriesWithIcons = [
  { label: "Home", icon: <HomeIcon className="w-6 h-6 text-white" /> },
  { label: "Fashion", icon: <ShoppingBagIcon className="w-6 h-6 text-white" /> },
  { label: "Mobile", icon: <DevicePhoneMobileIcon className="w-6 h-6 text-white" /> },
  { label: "Electronics", icon: <ComputerDesktopIcon className="w-6 h-6 text-white" /> },
  { label: "Beauty", icon: <SparklesIcon className="w-6 h-6 text-white" /> },
  { label: "Toys", icon: <GiftIcon className="w-6 h-6 text-white" /> },
  { label: "Sports", icon: <TrophyIcon className="w-6 h-6 text-white" /> },
  { label: "Furniture", icon: <HomeIcon className="w-6 h-6 text-white" /> },
  { label: "Books", icon: <BookOpenIcon className="w-6 h-6 text-white" /> },
];

export default function CategoryIconBar({ categories, selectedCategory, onSelectCategory, onClearCategory }) {
  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {categories.map((category) => {
        const cat = categoriesWithIcons.find((c) => c.label.toLowerCase() === category.toLowerCase());
        const icon = cat ? cat.icon : <ShoppingBagIcon className="w-6 h-6 text-white" />;
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl font-semibold text-sm whitespace-nowrap
              ${isSelected ? "bg-white text-purple-700" : "bg-purple-700 text-white"} hover:bg-white hover:text-purple-700 transition`}
            onClick={() => onSelectCategory(category)}
          >
            {icon}
            {category}
          </button>
        );
      })}
      {selectedCategory && selectedCategory !== "All" && (
        <button
          className="text-white underline ml-2"
          onClick={onClearCategory}
        >
          Clear
        </button>
      )}
    </div>
  );
}
