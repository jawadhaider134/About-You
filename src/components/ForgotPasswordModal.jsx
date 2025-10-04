import { useState } from "react";
import { AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";

export default function ForgotPasswordModal({ open, onClose, onBack }) {
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    // 🔥 Here you’d call your API to send reset email
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal */}
      <div className="bg-white w-[400px] rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <button onClick={onBack}>
            <AiOutlineArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">Forgot your password?</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
          <p className="text-sm text-gray-600 text-center">
            Please enter an email address and we will send you a link to reset
            your password.
          </p>

          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Reset password
          </button>
        </form>

        {/* Footer */}
        <div className="border-t px-6 py-4 text-center text-sm">
          No account yet?{" "}
          <button className="text-black font-medium hover:underline">
            Register now
          </button>
        </div>
      </div>
    </div>
  );
}
