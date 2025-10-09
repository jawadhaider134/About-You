import { FaRegBell, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function IconButtons({ setNotifOpen }) {
  const navigate = useNavigate();

  const handleHeartClick = () => {
    navigate("/favourite");
  };
  const handleCart = () => {
    navigate("/cart")
  }

  return (
    <>
      <button aria-label="Coupons" className="hover:text-black">
        <RiCoupon2Line />
      </button>

      <button
        aria-label="Notifications"
        onClick={() => setNotifOpen(true)}
        className="hover:text-black"
      >
        <FaRegBell />
      </button>

      <button
        aria-label="Favorites"
        onClick={handleHeartClick}
        className="hover:text-black"
      >
        <FaRegHeart />
      </button>

      <button aria-label="Shopping Bag" className="hover:text-black" onClick={handleCart}>
        <FaShoppingBag />
      </button>
    </>
  );
}
