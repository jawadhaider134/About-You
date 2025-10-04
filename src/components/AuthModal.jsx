import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react"; // ⬅️ Added ArrowLeft
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import axios from "axios";

export default function AuthModal({ onClose }) {
  const [tab, setTab] = useState("login"); // login | register | forgot
  const [showMore, setShowMore] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  // Close modal on ESC key
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
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://tashya-mendez.onrender.com/custom/login/",
      {
        email: loginEmail,      
        password: loginPassword 
      }
    );

    // Assuming backend sends user role
    const userRole = response.data.role;
    console.log(userRole)

    if (userRole === "admin") {
      // Redirect to external admin panel
      window.location.href = "https://tashya-mendez.onrender.com/admin/";
    } else {
      // Redirect to internal dashboard
      window.location.href = "/women";
    }
  } catch (error) {
    console.error("Login failed", error);
    alert("Login failed: check your credentials.");
  }
};


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className={`bg-white rounded-2xl shadow-xl w-full relative transform transition-all duration-200 flex flex-col 
        h-[580px] max-w-xl`}
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
          {/* Tabs (hide for forgot) */}
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

          {/* Forgot Password */}
          {tab === "forgot" && (
            <div className="flex flex-col justify-center items-center h-full text-center space-y-6">
              <p className="text-gray-700 text-sm max-w-sm">
                Enter your email address and we’ll send you a link to reset your
                password.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className="w-80 border border-gray-400 rounded-md px-3 py-3 
                  focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
              <button
                type="button"
                className="w-80 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900"
              >
                Send Reset Link
              </button>
              <p className="text-sm text-gray-600">
                No account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("register")}
                  className="underline text-black font-medium"
                >
                  Register now
                </button>
              </p>
            </div>
          )}

          {/* Forms */}
          {tab !== "forgot" && (
            <>
              {/* Social Logins */}
              <div className="space-y-3 mb-6 flex flex-col items-center">
                <button className="w-80 border rounded-md py-3 flex items-center gap-12 px-5 hover:bg-gray-50">
                  <FaGoogle size={25} /> <span>Sign up with Google</span>
                </button>
                <button className="w-80 border rounded-md py-3 flex items-center gap-12 px-5 hover:bg-gray-50">
                  <FaFacebook size={25} /> <span>Sign up with Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-1 border-gray-300" />
                <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                  or with your email address
                </span>
                <hr className="flex-1 border-gray-300" />
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                {/* LOGIN */}
                {tab === "login" && (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="relative">
                        <input
                          type="email"
                          id="login-email"
                          name="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder=" "
                          className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 
             focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                        <label
                          htmlFor="login-email"
                          className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                                     peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                     peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                                     peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black"
                        >
                          Email
                        </label>
                      </div>

                      {/* Password */}
                      <div>
                        <div className="relative">
                          <input
                            type="password"
                            id="login-password"
                            name="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder=" "
                            className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 
             focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                          />
                          <label
                            htmlFor="login-password"
                            className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                                       peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                       peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                                       peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black"
                          >
                            Password
                          </label>
                        </div>

                        {/* Forgot password */}
                        <div className="mt-2 text-right">
                          <button
                            type="button"
                            onClick={() => setTab("forgot")}
                            className="text-sm font-medium text-gray-900"
                          >
                            Forgot your password?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* REGISTER */}
                {tab === "register" && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        placeholder=" "
                        className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 
                                   focus:outline-none focus:border-black hover:border-black focus:ring-1 focus:ring-black"
                      />
                      <label
                        htmlFor="first-name"
                        className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black"
                      >
                        First name
                      </label>
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        placeholder=" "
                        className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 
                                   focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-black"
                      />
                      <label
                        htmlFor="last-name"
                        className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black"
                      >
                        Last name
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        id="register-email"
                        name="registerEmail"
                        placeholder=" "
                        className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 
                                   focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                      <label
                        htmlFor="register-email"
                        className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black"
                      >
                        Email
                      </label>
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <input
                        type="password"
                        id="register-password"
                        name="registerPassword"
                        placeholder=" "
                        className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 
                                   focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                      <label
                        htmlFor="register-password"
                        className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black"
                      >
                        Password
                      </label>
                    </div>

                    {/* Gender Section */}
                    <div className="col-span-2 mt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        How should we address you?
                      </p>
                      <div className="flex gap-6">
                        {["Male", "Female", "Other"].map((gender) => (
                          <label
                            key={gender}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={gender.toLowerCase()}
                              className="w-5 h-5 border-2 border-black text-black focus:ring-black"
                            />
                            <span>{gender}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Newsletter Checkbox */}
                    <div className="col-span-2 mt-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="newsletter"
                          className="w-10 h-4 border-2 border-gray-400 text-black focus:ring-black"
                        />
                        <span className="text-sm text-gray-700">
                          I would like to receive newsletters from ABOUT YOU
                          about current trends, offers and vouchers in
                          accordance with the Privacy Policy.{" "}
                          {showMore ? (
                            <>
                              You can withdraw your consent at any time with
                              effect for the future by sending a message to{" "}
                              <a
                                href="mailto:customerservice@aboutyou.de"
                                className="underline"
                              >
                                customerservice@aboutyou.de
                              </a>{" "}
                              or using the unsubscribe option at the end of each
                              newsletter.
                              <button
                                type="button"
                                className="text-black underline ml-1"
                                onClick={() => setShowMore(false)}
                              >
                                Show less
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="text-black underline ml-1"
                              onClick={() => setShowMore(true)}
                            >
                              Show more
                            </button>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-80 mx-auto block bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 mt-4"
                >
                  {tab === "login" ? "Log in" : "Register"}
                </button>
                {error && (
                  <p className="text-red-500 text-center mt-2">{error}</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
