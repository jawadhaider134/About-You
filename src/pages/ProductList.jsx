import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the category from your API
    axios.get(`https://tashya-mendez.onrender.com/api/products/filter?category=${category}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold capitalize">{category} Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-xl mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
