import { FaShoppingCart } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { SiKlarna } from "react-icons/si";

export default function TopBanner() {
  const items = [
    {
      icon: <FaShoppingCart className="text-white text-lg" />,
      text: "FREE DELIVERY* & RETURNS",
    },
    {
      icon: <BiTransfer className="text-white text-lg" />,
      text: "30 DAY RETURN POLICY",
    },
    {
      icon: <SiKlarna className="text-white text-lg" />,
      text: "BUY NOW PAY LATER",
    },
  ];

  return (
    <div className="w-full bg-black text-white text-xs font-semibold">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between px-4 py-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 whitespace-nowrap mx-4"
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
