import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

function LogIn() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { logIn,isUpdating } = useUserStore();

  const handleLogIn = async (e) => {
    e.preventDefault(); // prevent page refresh
    try {
      const success = await logIn(formData.email, formData.password);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.log("log in failed");
      navigate("/login");
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] transition-colors duration-300">
      <div className="relative w-[90%] max-w-md px-8 py-10 rounded-2xl shadow-xl bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 transition-colors duration-300">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center drop-shadow-sm">
          Welcome Back
        </h2>

        <form onSubmit={handleLogIn}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:bg-white/20 transition duration-200"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:bg-white/20 transition duration-200"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Submit Button */}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full py-2 flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-lg transition duration-200 shadow-md ${
              isUpdating
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-cyan-600 hover:to-sky-700"
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
            {isUpdating ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-700 dark:text-white/80">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-600 dark:text-cyan-300 hover:underline hover:text-cyan-500 dark:hover:text-cyan-200 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
