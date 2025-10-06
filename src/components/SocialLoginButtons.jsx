import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { GoogleLogin } from "@react-oauth/google";

export default function SocialLoginButtons({ onLoginSuccess, setError }) {
  return (
    <div className="space-y-3 mb-6 flex flex-col items-center">
      {/* Google Login */}
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const token = credentialResponse.credential; // Google ID token
            const response = await fetch(
              "https://tashya-mendez.onrender.com/auth/google/",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
              }
            );
            const data = await response.json();
            if (response.ok) {
              onLoginSuccess(data.user);
            } else {
              setError && setError("Google login failed");
            }
          } catch (err) {
            setError && setError("Google login failed: Unknown error");
          }
        }}
        onError={() => setError && setError("Google login failed")}
        text="Sign in with Google"
        size="large"
        shape="rectangular"
      />

      {/* Facebook Login (kept as a placeholder) */}
      <button className="w-80 border rounded-md py-3 flex items-center gap-12 px-5 hover:bg-gray-50">
        <FaFacebook size={25} /> <span>Sign up with Facebook</span>
      </button>
      <div className="flex items-center my-6">
                <hr className="flex-1 border-gray-300" />
                <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                  or with your email address
                </span>
                <hr className="flex-1 border-gray-300" />
              </div>
    </div>
  );
}
