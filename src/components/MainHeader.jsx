import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaRegUser,
  FaRegBell,
  FaRegHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import logo from "../assets/logo.png";
import NotificationDrawer from "./NotificationDrawer";
import AuthModal from "./AuthModal";

export default function MainHeader() {
  const [activeCategory, setActiveCategory] = useState("Women");
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();

  const categories = [
    { name: "Women", path: "/women" },
    { name: "Men", path: "/men" },
    { name: "Kids", path: "/kids" },
    { name: "All Collections", path: "/collections" },
  ];


  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!headerRef.current) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > headerHeight) {
        setIsFixed(true);
      }
      else if (currentScrollY <= headerHeight) {
        setIsFixed(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);
  return (
    <>
      {isFixed && <div style={{ height: headerHeight }} />}
      <header
        ref={headerRef}
        className={`w-full border-b border-gray-300 transition-all duration-300 ${
          isFixed
            ? "fixed top-0 left-0 bg-white/70 backdrop-blur-md shadow-md z-50"
            : "relative bg-white"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-8">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-40 h-auto" />
          </div>
          <nav className="flex gap-6 text-gray-700 font-medium h-full">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className={`flex items-center ${
                  (cat.path === "/women" &&
                    (location.pathname === "/" ||
                      location.pathname === "/women")) ||
                  location.pathname === cat.path
                    ? "border-b-2 border-black text-black"
                    : "hover:text-black"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6 text-xl text-gray-700 relative">
            <button aria-label="Coupons" className="hover:text-black">
              <RiCoupon2Line />
            </button>
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => setUserOpen(true)}
              onMouseLeave={() => setUserOpen(false)}
            >
              <button
                aria-label="User account"
                className="hover:text-black"
                onClick={() => {
                  setUserOpen(false);
                  setShowModal(true);
                }}
              >
                <FaRegUser />
              </button>
              {userOpen && (
                <div className="absolute top-full right-[-20px] mt-3 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300">
                  <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"></div>

                  <div className="p-6 text-center border-b">
                    <p className="font-semibold text-gray-800 mb-4">
                      You are not logged in yet
                    </p>
                    <button
                      className="w-80 bg-black text-white py-2 rounded font-semibold hover:-translate-y-1 
             hover:shadow-[-4px_4px_10px_rgba(0,0,0,0.25)] 
             transition-all duration-200 ease-out"
                      onClick={() => {
                        setUserOpen(false);
                        setShowModal(true);
                      }}
                    >
                      Log in
                    </button>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="flex items-center justify-center gap-2 py-3 px-2">
                      <FaShoppingBag />
                      <span className="text-sm">Track your orders</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-3 px-2">
                      <FaRegHeart />
                      <span className="text-sm">Like your favorites</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              aria-label="Notifications"
              onClick={() => setNotifOpen(true)}
              className="hover:text-black"
            >
              <FaRegBell />
            </button>

            <button aria-label="Favorites" className="hover:text-black">
              <FaRegHeart />
            </button>
            <button aria-label="Shopping Bag" className="hover:text-black">
              <FaShoppingBag />
            </button>
          </div>
        </div>


      </header>
        <NotificationDrawer notifOpen={notifOpen} setNotifOpen={setNotifOpen} />
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
