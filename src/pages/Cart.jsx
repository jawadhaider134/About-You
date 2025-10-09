// Cart.jsx
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import EmptyImage from "../assets/cart1.png";

export default function Cart({setShowModal}) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;
  const token = localStorage.getItem("access");

  // Fetch cart items
  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://tashya-mendez.onrender.com/api/carts/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      const userCart = data.find((c) => c.user === user.pk);
      console.log(user.pk)
      setCartItems(userCart?.items || []);
    } catch (err) {
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]); // refetch when user changes

  // Listen for login/logout events in other tabs or components
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-600">Loading cart...</p>
      </div>
    );

  if (!isLoggedIn)
    return (
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] gap-10">
        <div className="relative">
          <div className="bg-gray-100 rounded-xl shadow-md p-12 flex items-center justify-center">
            <img
              src={EmptyImage}
              alt="Empty Cart"
              className="w-[180px] h-[180px] object-contain"
            />
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-200 rounded-full p-4 shadow-md">
            <FaRegHeart className="text-black text-2xl" />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-black mb-2">
            You are not logged in!
          </h2>
          <p className="text-gray-600 mb-6 max-w-sm">
            Please login to see your cart items.
          </p>
          <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-black text-white font-semibold px-6 py-3 rounded-lg shadow-md 
                hover:-translate-y-1 hover:shadow-[-4px_4px_10px_rgba(0,0,0,0.25)] 
                transition-all duration-200 ease-out"
              >
                Log In
              </button>
        </div>
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] gap-10">
        <div className="relative">
          <div className="bg-gray-100 rounded-xl shadow-md p-12 flex items-center justify-center">
            <img
              src={EmptyImage}
              alt="Empty Cart"
              className="w-[180px] h-[180px] object-contain"
            />
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-200 rounded-full p-4 shadow-md">
            <FaRegHeart className="text-black text-2xl" />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-black mb-2">
            You don’t have anything in your cart
          </h2>
          <p className="text-gray-600 mb-6 max-w-sm">
            Add products to your cart to get started.
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-semibold text-black mb-6">Your Basket</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {item.product_name}
              </span>
              <span className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </span>
              <span className="text-sm text-gray-600">
                Price: ${item.product_price}
              </span>
            </div>
            <div className="font-semibold text-gray-800">
              ${item.total_price.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right text-lg font-semibold text-gray-800">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
