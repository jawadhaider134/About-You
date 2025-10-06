import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import g1 from "../assets/g1.jpg";
import g2 from "../assets/g2.webp";
import g3 from "../assets/g3.webp";
import g4 from "../assets/g5.webp";
import m1 from "../assets/m1.webp"
import m2 from "../assets/m2.avif"
import m3 from "../assets/m3.avif"
import m4 from "../assets/m4.webp"
import m5 from "../assets/m5.webp"

export default function CurrentTrends() {
  const [trends, setTrends] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const location = useLocation();

  // Mock datasets for each category
  const dataSets = {
    "/women": [
      { id: 1, image: g1, title: "DRESSES", subtitle: "Trending now" },
      { id: 2, image: g2, title: "HEELS", subtitle: "Best picks" },
      { id: 3, image: g3, title: "HANDBAGS", subtitle: "Fresh arrivals" },
      { id: 4, image: g4, title: "ACCESSORIES", subtitle: "Top rated" },
      { id: 1, image: g1, title: "DRESSES", subtitle: "Trending now" },
      { id: 2, image: g2, title: "HEELS", subtitle: "Best picks" },
      { id: 3, image: g3, title: "HANDBAGS", subtitle: "Fresh arrivals" },
      { id: 4, image: g4, title: "ACCESSORIES", subtitle: "Top rated" },
    ],
    "/men": [
      { id: 5, image: m1, title: "SHIRTS", subtitle: "Popular now" },
      { id: 6, image: m2, title: "SUITS", subtitle: "Smart look" },
      { id: 7, image: m3, title: "SNEAKERS", subtitle: "Street style" },
      { id: 8, image: m4, title: "WATCHES", subtitle: "Luxury picks" },
      { id: 8, image: m5, title: "Jeans", subtitle: "Luxury picks" },
    ],
    "/kids": [
      { id: 9, image: g1, title: "T-SHIRTS", subtitle: "Playtime ready" },
      { id: 10, image: g2, title: "SHORTS", subtitle: "Summer vibe" },
      { id: 11, image: g3, title: "SNEAKERS", subtitle: "Little trends" },
      { id: 12, image: g4, title: "JACKETS", subtitle: "Season must-haves" },
    ],
    "/collections": [
      { id: 13, image: g1, title: "NEW ARRIVALS", subtitle: "Fresh drop" },
      { id: 14, image: g2, title: "SALE", subtitle: "Don’t miss out" },
      { id: 15, image: g3, title: "LIMITED EDITION", subtitle: "Rare finds" },
      { id: 16, image: g4, title: "EDITOR’S PICK", subtitle: "Curated" },
      { id: 5, image: m1, title: "SHIRTS", subtitle: "Popular now" },
      { id: 6, image: m2, title: "SUITS", subtitle: "Smart look" },
      { id: 7, image: m3, title: "SNEAKERS", subtitle: "Street style" },
      { id: 8, image: m4, title: "WATCHES", subtitle: "Luxury picks" },
    ],
  };

 useEffect(() => {
  let currentPath = location.pathname;

  if (currentPath === "/") {
    currentPath = "/women";
  }

  if (dataSets[currentPath]) {
    setTrends(dataSets[currentPath]);
  } else {
    setTrends([]); 
  }
}, [location.pathname]);

  const getCardStep = () => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return 0;
    const cardWidth = el.firstElementChild.getBoundingClientRect().width;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.gap) || 0;
    return cardWidth + gap;
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const tolerance = 2;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - tolerance);
  };

  const handleScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(checkScroll);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const initial = setTimeout(checkScroll, 50);
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const imgs = Array.from(el.querySelectorAll("img"));
    const onImgLoad = () => handleScroll();
    imgs.forEach((img) => img.addEventListener("load", onImgLoad));

    return () => {
      clearTimeout(initial);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trends]);

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getCardStep() || el.clientWidth;
    const target = Math.min(el.scrollLeft + step * 4, el.scrollWidth - el.clientWidth);
    el.scrollTo({ left: target, behavior: "smooth" });
    const tolerance = 2;
    setCanScrollLeft(target > tolerance);
    setCanScrollRight(target < el.scrollWidth - el.clientWidth - tolerance);
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getCardStep() || el.clientWidth;
    const target = Math.max(el.scrollLeft - step * 4, 0);
    el.scrollTo({ left: target, behavior: "smooth" });
    const tolerance = 2;
    setCanScrollLeft(target > tolerance);
    setCanScrollRight(target < el.scrollWidth - el.clientWidth - tolerance);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="uppercase text-gray-600 font-semibold tracking-wide">
            Curated by us
          </h4>
          <h2 className="text-3xl font-bold">Current trends</h2>
        </div>
        <div className="flex">
          <button
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            className={`p-3 border border-gray-200 rounded-l-full rounded-r-none transition
              ${!canScrollLeft ? "opacity-40 cursor-default" : "hover:bg-gray-100"}`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollRight}
            className={`p-3 border border-gray-200 rounded-r-full rounded-l-none transition
              ${!canScrollRight ? "opacity-40 cursor-default" : "hover:bg-gray-100"}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {trends.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="min-w-[250px] md:min-w-[300px] rounded-lg overflow-hidden flex-shrink-0 
                       cursor-pointer transition-transform duration-300 block"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-3 text-left">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
