export default function ForgotPasswordForm({switchTab}) {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center space-y-6">
      <p className="text-gray-700 text-sm max-w-sm">
        Enter your email address and we’ll send you a link to reset your password.
      </p>
      <input
        type="email"
        placeholder="Email address"
        className="w-80 border border-gray-400 rounded-md px-3 py-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
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
          onClick={() => switchTab("register")}
          className="underline text-black font-medium"
        >
          Register now
        </button>
      </p>
    </div>
  );
}
