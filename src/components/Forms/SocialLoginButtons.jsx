import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SocialLoginButtons({ onLoginSuccess, setError, error }) {
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      setLoading(true);
      setError && setError("");
      try {
        const { code } = response;
        console.log("🔹 Google Authorization Code:", code);
        const backendRes = await axios.post(
          "https://tashya-mendez.onrender.com/auth/code-exchange",
          { code },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = backendRes.data;
        localStorage.setItem("user", JSON.stringify(data));
        onLoginSuccess && onLoginSuccess(data);
        setLoading(false);
      } catch (err) {
        console.error(
          "❌ Error sending code to backend:",
          err.response?.data || err.message
        );
        setError("Google login failed. See console for details.");
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("⚠️ Google login failed:", error);
      setError("Google login failed. See console for details.");
    },
  });

  return (
    <div className="space-y-3 mb-6 flex flex-col items-center">
      <button
        className={`w-80 border rounded-md py-3 flex items-center gap-12 px-5 hover:bg-gray-50 ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
        onClick={() => login()}
        disabled={loading}
      >
        <FaGoogle size={25} />{" "}
        <span>{loading ? "Logging in..." : "Sign up with Google"}</span>
      </button>

      {/* Facebook Login placeholder */}
      <button
        className="w-80 border rounded-md py-3 flex items-center gap-12 px-5 hover:bg-gray-50"
        disabled
      >
        <FaFacebook size={25} /> <span>Sign up with Facebook</span>
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
