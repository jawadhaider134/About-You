import { useState, useRef, useEffect } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoGlobeSharp } from "react-icons/io5";

export default function LanguageSelector() {
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const flag = language === "German" ? "🇩🇪" : "🇺🇸";

  return (
    <div className="w-full h-9 bg-gray-100 flex justify-between items-center px-6 relative">
      {/* Left side */}
      <div className="flex items-center gap-2 font-semibold text-gray-800 border-x border-gray-400 h-full px-2 hover:bg-gray-300 cursor-pointer">
        <span className="text-lg"><FaRegCircleQuestion /></span>
        <span className="text-gray-600 ">
          {language === "German" ? "Kontakt & Hilfe" : "Contact & Help"}
        </span>
      </div>

      {/* Right side - Language Section */}
      <div ref={dropdownRef} className="relative h-full">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 h-full px-3 border-x border-gray-400 hover:bg-gray-100"
        >
          <span>{flag}</span>
          <span>{language}</span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-1 w-72 bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><IoGlobeSharp /> <span>Language and Country</span></h3>

            {/* Language buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleSelect("German")}
                className={`flex-1 py-2 border rounded ${
                  language === "German" ? "bg-gray-800 text-white" : "hover:bg-gray-100"
                }`}
              >
                German
              </button>
              <button
                onClick={() => handleSelect("English")}
                className={`flex-1 py-2 border rounded ${
                  language === "English" ? "bg-gray-800 text-white" : "hover:bg-gray-100"
                }`}
              >
                English
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
