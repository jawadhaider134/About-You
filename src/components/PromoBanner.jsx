import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PromoInfoModal from "./PromoInfoModal";

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [endTime, setEndTime] = useState(null);

  // Fetch the data from API
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch("https://tashya-mendez.onrender.com/api/offers");
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log("Promo API data:", data);

        const apiDiscount = data[0].offer;
        const apiTimeLeft = data[0].timer;

        setDiscount(apiDiscount);
        setTimeLeft(apiTimeLeft);
        setEndTime(new Date(Date.now() + apiTimeLeft * 1000));

      } catch (err) {
        console.error("Error fetching promo data:", err);
      }
    };

    fetchPromo();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    let parts = [];
    if (d > 0) parts.push(`${d.toString().padStart(2, "0")}D`);
    if (h > 0 || d > 0) parts.push(`${h.toString().padStart(2, "0")}H`);
    if (m > 0 || h > 0 || d > 0) parts.push(`${m.toString().padStart(2, "0")}M`);
    parts.push(`${s.toString().padStart(2, "0")}S`);

    return parts.join(" ");
  };

  if (!discount || discount <= 0) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-orange-600 text-white py-2 flex items-center justify-center relative px-2 md:px-10">
        <div className="flex items-center gap-2 max-w-[85%]">
          <div className="bg-orange-700 px-2 py-1 rounded flex items-center space-x-1 text-sm shrink-0">
            <FaClock />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <p className="text-sm font-semibold break-words">
            ABOUT YOU SHOPPING MANIA: Bis zu -{discount}% EXTRA
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="absolute right-2 md:right-4 flex items-center justify-center"
        >
          <AiOutlineInfoCircle className="text-white text-lg" />
        </button>
      </div>

      {endTime && (
        <PromoInfoModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          endTime={endTime}
          discountAmount={discount}
        />
      )}
    </>
  );
}
