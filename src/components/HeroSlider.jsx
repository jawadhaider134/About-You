import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const progressInterval = useRef(null);
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("https://tashya-mendez.onrender.com/api/hero");
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error("Failed to fetch hero slides:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);
  useEffect(() => {
    if (slides.length === 0) return;
    startProgress();
    return stopProgress;
  }, [current, slides]);

  const startProgress = () => {
    stopProgress();
    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / 5000) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        nextSlide();
      }
    }, 50);
  };

  const stopProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  // Show loader
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[600px] bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slides.map((slide, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-white p-6">
            {slide.description && (
              <p className="uppercase text-sm tracking-wide mb-2">
                {slide.description}
              </p>
            )}
            {slide.title && (
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {slide.title}
              </h1>
            )}
            {slide.buttons && slide.buttons.length > 0 && (
              <div className="flex gap-3">
                {slide.buttons.map((btn) => (
                  <a
                    key={btn.id}
                    href={btn.link}
                    className="bg-white text-black px-6 py-3 font-semibold rounded hover:bg-gray-200 transition"
                  >
                    {btn.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 w-full max-w-xs px-4">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1 bg-white/40 overflow-hidden rounded"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width:
                  idx === current
                    ? `${progress}%`
                    : idx < current
                    ? "100%"
                    : "0%",
              }}
              transition={{ duration: 0.1, ease: "linear" }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 flex gap-2">
        <button
          onClick={() => {
            prevSlide();
            stopProgress();
          }}
          className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-black hover:bg-white transition"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => {
            nextSlide();
            stopProgress();
          }}
          className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-black hover:bg-white transition"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
