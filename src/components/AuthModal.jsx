
import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import SocialLoginButtons from "../components/Forms/SocialLoginButtons";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import ForgotPasswordForm from "../components/Forms/ForgotPasswordForm";

export default function AuthModal({ onClose , onLoginSuccess}) {
  const [tab, setTab] = useState("login"); 
  const [error, setError] = useState("");
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full relative transform transition-all duration-200 flex flex-col h-[580px] max-w-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1">
            {tab === "forgot" && (
              <button
                onClick={() => setTab("login")}
                className="text-gray-600 hover:text-black"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-lg font-semibold text-center flex-1">
              {tab === "login"
                ? "Log in"
                : tab === "register"
                ? "Register"
                : "Forgot Password"}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={20} />
          </button>
          <div className="w-5" />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Tab buttons */}
          {tab !== "forgot" && (
            <div className="flex justify-center mb-6">
              <div className="flex border rounded-md overflow-hidden w-80">
                <button
                  className={`w-1/2 py-3 text-sm font-medium ${
                    tab === "register"
                      ? "bg-gray-100 text-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setTab("register")}
                >
                  Register
                </button>
                <button
                  className={`w-1/2 py-3 text-sm font-medium ${
                    tab === "login" ? "bg-gray-100 text-black" : "text-gray-500"
                  }`}
                  onClick={() => setTab("login")}
                >
                  Log in
                </button>
              </div>
            </div>
          )}

          {tab === "login" && (
            <>
            <SocialLoginButtons onLoginSuccess={onLoginSuccess} setError={setError} error={error} />
                <div className="flex items-center my-6">
                <hr className="flex-1 border-gray-300" />
                <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                  or with your email address
                </span>
                <hr className="flex-1 border-gray-300" />
              </div>
            <LoginForm onLoginSuccess={onLoginSuccess} setTab={setTab} error={error} setError={setError} />
            </>
          )}

          {tab === "register" && (
            <>
              <SocialLoginButtons onLoginSuccess={onLoginSuccess} setError={setError} error={error} />
              <div className="flex items-center my-6">
                <hr className="flex-1 border-gray-300" />
                <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                  or with your email address
                </span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <RegisterForm />
            </>
          )}

          {tab === "forgot" && <ForgotPasswordForm  switchTab={setTab}/>}
        </div>
      </div>
    </div>
  );
}
