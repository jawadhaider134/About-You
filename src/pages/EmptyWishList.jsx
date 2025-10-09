import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import EmptyImage from "../assets/whishlist.webp";

export default function Wishlist({ user, setShowModal }) {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!user;
  const token = localStorage.getItem("access");

  // Base URL for product images (adjust to your backend)
  const BASE_IMAGE_URL = "https://tashya-mendez.onrender.com/media/products/";

  useEffect(() => {
    const fetchLikedItems = async () => {
      if (!isLoggedIn) {
        setLikedItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch("https://tashya-mendez.onrender.com/api/favorites/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch liked items");

        const data = await res.json();
        setLikedItems(data || []);
      } catch (err) {
        console.error(err);
        setLikedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedItems();
  }, [user, token, isLoggedIn]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] bg-white px-6 gap-10">
      {!isLoggedIn ? (
        // Not logged in view
        <>
          {/* Left illustration */}
          <div className="relative">
            <div className="rounded-xl shadow-md p-12 flex items-center justify-center">
              <img
                src={EmptyImage}
                alt="Empty Wishlist"
                className="w-[230px] h-[230px] object-contain"
              />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-200 rounded-full p-4 shadow-md">
              <FaRegHeart className="text-black text-2xl" />
            </div>
          </div>

          {/* Right side text */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-black mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6 max-w-sm">
              Click on the heart to add an item to your wishlist or log into your account.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white font-semibold px-6 py-3 rounded-lg shadow-md 
                hover:-translate-y-1 hover:shadow-[-4px_4px_10px_rgba(0,0,0,0.25)] 
                transition-all duration-200 ease-out"
            >
              Log In
            </button>
          </div>
        </>
      ) : likedItems.length === 0 ? (
        // Logged in but no liked items
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-black mb-2">You didn't like anything</h2>
          <p className="text-gray-600 mb-6 max-w-sm">Start liking products to see them here.</p>
        </div>
      ) : (
        // Logged in and has liked items
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {likedItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={`${BASE_IMAGE_URL}${item.product_name}`} // Construct full image URL
                alt={item.product_name}
                className="w-40 h-40 object-contain mb-2"
              />
              <h3 className="text-lg font-semibold text-black">{item.product_name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
