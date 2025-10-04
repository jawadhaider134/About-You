import { useEffect, useState } from "react";

export default function Sweaters() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Premium Styles</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-contain rounded-md"
              />
              <span className="absolute top-2 left-2 bg-green-700 text-white text-xs px-2 py-1 rounded">
                -15% EXTRA
              </span>
            </div>

            {/* Product Info */}
            <div className="mt-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 text-xs mb-2">{product.category}</p>

              {/* Prices */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-600 font-bold text-lg">
                  € {(product.price * 0.85).toFixed(2)}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  € {product.price}
                </span>
              </div>

              {/* Dummy Colors */}
              <div className="flex gap-2 mb-3">
                <span className="w-4 h-4 bg-black rounded-full border"></span>
                <span className="w-4 h-4 bg-gray-400 rounded-full border"></span>
                <span className="w-4 h-4 bg-brown-600 rounded-full border"></span>
              </div>

              {/* Add to Cart */}
              <button className="mt-auto bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
