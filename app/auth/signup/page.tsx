"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import login from "../../../public/login.jpg";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/login");
      } else {
        setError(data.error || "Signup failed.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${login.src})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/60" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4">

            <UserPlus className="text-white" size={30} />

          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2">
            Join TaskBoard and stay productive.
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/80 p-3 text-white text-sm">
            {error}
          </div>
        )}

        {/* Name */}

        <div className="relative mb-4">

          <User
            className="absolute left-3 top-3.5 text-gray-300"
            size={18}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-white/20 border border-white/20 py-3 pl-11 pr-4 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        {/* Email */}

        <div className="relative mb-4">

          <Mail
            className="absolute left-3 top-3.5 text-gray-300"
            size={18}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/20 border border-white/20 py-3 pl-11 pr-4 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        {/* Password */}

        <div className="relative mb-6">

          <Lock
            className="absolute left-3 top-3.5 text-gray-300"
            size={18}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-white/20 border border-white/20 py-3 pl-11 pr-12 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-300"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* Button */}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-gray-200">

          Already have an account?{" "}

          <Link
            href="/auth/login"
            className="font-semibold text-blue-300 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}