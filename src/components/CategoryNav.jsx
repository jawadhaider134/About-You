import { useState, useRef, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { LuBadgePercent } from "react-icons/lu";

export default function CategoryNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const categories = [
    { name: "Drops", hasIcon: false },
    { name: "Clothing", hasIcon: true },
    { name: "Shoes", hasIcon: true },
    { name: "Sportswear", hasIcon: true },
    { name: "Accessories", hasIcon: true },
    { name: "Streetwear", hasIcon: true },
    { name: "Premium", hasIcon: true},
    { name: "SALE", hasIcon: true },
    { name: "Top 100", hasIcon: true },
    { name: "Second-Hand", hasIcon: true },
    { name: "Brands", hasIcon: false },
    { name: "Inspiration", hasIcon: false },
  ];

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <nav className="w-full border-b border-gray-200">
      <div className="relative flex items-center justify-between px-10 py-3 h-12 overflow-hidden">
        {/* Categories */}
        <ul
          className={`flex items-center gap-6 text-sm font-medium text-black whitespace-nowrap overflow-x-auto transition-opacity duration-300 ${
            searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className={`flex  items-center gap-1 cursor-pointer hover:text-gray-600  text-medium ${
                cat.name === "SALE" ? "text-red-500" : ""
              }`}
            >
              {cat.name}
              {cat.hasIcon && (
                <LuBadgePercent  className="text-white mt-1" fill="#f97316"/>
              )}
            </li>
          ))}
        </ul>

        {/* Search icon */}
        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="ml-auto text-xl text-black hover:text-gray-600"
          >
            <FiSearch />
          </button>
        )}

        {/* Search Bar (inside same height container) */}
        <div
          className={`absolute inset-0 flex items-center px-6 gap-3 bg-white transition-all duration-500 ease-in-out ${
            searchOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products, brands, or categories..."
            className="flex-grow border border-gray-300 rounded-md px-5 py-1.5 
                       focus:outline-none focus:ring-1 focus:ring-black
                       text-sm"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="text-xl text-gray-600 hover:text-black"
          >
            <FiX />
          </button>
        </div>
      </div>
    </nav>
  );
}
