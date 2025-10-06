import { useState } from "react";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://tashya-mendez.onrender.com/auth/registration/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            password1: password,
            password2: password,
            gender,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          "Register successfully, now you can login to your account!"
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setGender("");
      } else {
        // Only show one error message at a time
        let firstError = "";
        for (const key in data) {
          if (Array.isArray(data[key]) && data[key].length > 0) {
            firstError = data[key][0];
            break;
          }
        }
        setError(firstError || "Registration failed");
      }
    } catch (err) {
      setError("Registration failed: Unknown error");
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      {/* Grid: First/Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative w-full">
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            disabled={loading}
            required
          />
          <label
            htmlFor="first-name"
            className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black
                   cursor-text"
          >
            First Name
          </label>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            disabled={loading}
            required
          />
          <label
            htmlFor="last-name"
            className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black
                   cursor-text"
          >
            Last Name
          </label>
        </div>

        {/* Email */}
        <div className="relative w-full">
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            disabled={loading}
            required
          />
          <label
            htmlFor="register-email"
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
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            disabled={loading}
            required
          />
          <label
            htmlFor="register-password"
            className="absolute left-3 top-3 text-gray-500 text-base transition-all bg-white px-1
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-black
                   cursor-text"
          >
            Password
          </label>
        </div>

        {/* Gender */}
        <div className="col-span-2 flex gap-6 mt-2">
          {["male", "female", "other"].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={g.toLowerCase()}
                onChange={(e) => setGender(e.target.value)}
                className="w-5 h-5 border-2 border-black"
                required
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Error / Success */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {success && <p className="text-green-500 text-center mt-2">{success}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-80 mx-auto block text-white py-3 rounded-lg font-medium mt-4 ${
          loading ? "bg-gray-700 cursor-not-allowed" : "bg-black hover:bg-gray-900"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            Registering
            <span className="flex space-x-1">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="dot dot3"></span>
            </span>
          </span>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
}
