import React, { useState } from "react";
import supabase from "../helper/supabaseClient"; // adjust path

export function LoginForm({ onLogin, className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else onLogin(data.session);
  };

  return (
    <div className={`flex flex-col gap-6 items-center justify-center ${className || ""}`}>
      {/* Card container */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center">Welcome back</h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Login with your Apple or Google account
        </p>

        {/* Social login buttons (placeholders) */}
        <div className="flex flex-col gap-3 mt-4">
          <button className="w-full border rounded py-2 flex items-center justify-center hover:bg-gray-100 transition">
            {/* Apple icon placeholder */}
            Login with Apple
          </button>
          <button className="w-full border rounded py-2 flex items-center justify-center hover:bg-gray-100 transition">
            {/* Google icon placeholder */}
            Login with Google
          </button>
        </div>

        <div className="relative text-center my-4">
          <span className="bg-white px-2 text-gray-500 text-sm">Or continue with</span>
          <hr className="absolute inset-x-0 top-1/2 border-gray-300" />
        </div>

        {/* Email/password login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="text-sm">Password</label>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot your password?</a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>

      <p className="text-center text-xs text-gray-500">
        By clicking continue, you agree to our <a href="#" className="hover:underline">Terms of Service</a> and <a href="#" className="hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
}
