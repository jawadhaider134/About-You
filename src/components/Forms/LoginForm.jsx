import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function LoginForm({ onLoginSuccess, setTab , error , setError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  //
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://tashya-mendez.onrender.com/custom/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const userRole = data.role;
        if (userRole === "admin") {
          window.location.href = "https://tashya-mendez.onrender.com/admin/";
        } else {
          window.location.href = "http://localhost:3000/women";
          console.log(data)
          onLoginSuccess(data);
        }
      } else {
        setError("Login failed: check your credentials.");
      }
    } catch (err) {
      setError("Login failed: Unknown error");
    }
    setLoading(false);
  };

  return (
    <>
    
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="grid grid-cols-2 gap-4">
        {/* Email */}
        <div className="relative w-full">
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            disabled={loading}
            required
          />
          <label
            htmlFor="login-email"
            className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black
                   cursor-text"
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            disabled={loading}
            required
          />
          <label
            htmlFor="login-password"
            className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black
                   cursor-text"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="mt-2 text-right">
        <button
          type="button"
          onClick={() => setTab("forgot")}
          className="text-sm font-medium text-gray-900"
        >
          Forgot your password?
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-80 mx-auto block text-white py-3 rounded-lg font-medium mt-4 ${
          loading
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-black hover:bg-gray-900"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            Logging in
            <span className="flex space-x-1">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="dot dot3"></span>
            </span>
          </span>
        ) : (
          "Log in"
        )}
      </button>
    </form>
    </>
  );
}
