import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

function Register() {
  const { register, isUpdating } = useUserStore(); // add isUpdating for loading state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await register(name, email, password, confirmPassword);
    if (res) {
      console.log("Registration successful");
      navigate("/");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] transition-colors duration-300">
      <div className="relative w-[90%] max-w-lg px-8 py-10 rounded-2xl shadow-xl bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 transition-colors duration-300">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center drop-shadow-sm">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              autoComplete="name"
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:bg-white/20 transition duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:bg-white/20 transition duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:bg-white/20 transition duration-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:bg-white/20 transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full py-2 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-sky-700 transition duration-200 shadow-md flex justify-center items-center gap-2 ${
              isUpdating ? "opacity-70 cursor-not-allowed" : ""
            }`}>
            {isUpdating && (
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {isUpdating ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-700 dark:text-white/80">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-600 dark:text-cyan-300 hover:underline hover:text-cyan-500 dark:hover:text-cyan-200 transition">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
