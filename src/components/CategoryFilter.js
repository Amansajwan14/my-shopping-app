"use client";

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded flex-grow"
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {selectedCategory !== 'All' && (
        <button
          onClick={() => setSelectedCategory("All")}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          aria-label="Clear category filter"
        >
          Clear
        </button>
      )}
    </div>
  );
}
