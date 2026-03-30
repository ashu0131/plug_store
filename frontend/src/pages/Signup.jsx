import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== repassword) {
      alert("Passwords do not match ❌");
      return;
    }

    const { error } = await signUp(email, password);

    if (error) alert(error.message);
    else {
      alert("Signup successful ✅ Check email");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
     style={{
    backgroundImage:
      "url('https://cdn.pixabay.com/photo/2019/12/05/10/01/forest-4674703__340.jpg')",
  }}
    >
      
      <form
        onSubmit={handleSignup}
        className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md"
        
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account ✨
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-white text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-white text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-white text-sm">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setRepassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
        >
          Signup
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}