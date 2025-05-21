import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Register() {
  return (

      <div className="h-[calc(100vh-60px)] flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-600">
        <div className="relative w-128 flex flex-col justify-center p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center">
            Register
          </h2>

          {/* Name Input */}
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-white text-lg font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:shadow-outline border-white/20 placeholder-white/50"
              placeholder="Name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-white text-lg font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:shadow-outline border-white/20 placeholder-white/50"
              placeholder="Email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-lg font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:shadow-outline border-white/20 placeholder-white/50"
              placeholder="Password"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-white text-lg font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:shadow-outline border-white/20 placeholder-white/50"
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 mt-2 rounded-xl focus:outline-none focus:shadow-outline transition duration-200 cursor-pointer">
            Submit
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="border-b cursor-pointer">
              Log In
            </Link>
          </p>
        </div>
      </div>
  );
}

export default Register;
