"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import login from "../../../public/login.jpg"

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("Error during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen   flex justify-center items-center bg-cover bg-center"style={{ backgroundImage: `url(${login.src})` }}>
      <div className="flex flex-col items-center gap-4  rounded-xl py-10 px-10 shadow-lg hover:shadow-gray-400 w-full max-w-sm ">
        <h1 className="text-white text-2xl font-semibold">Create Account</h1>

        {error && (
          <div className="w-full bg-red-500 text-white text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your username"
          className="w-full text-white bg-gray-600 px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="w-full text-white bg-gray-600 px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password (min 6 chars)"
          className="w-full text-white bg-gray-600 px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-gray-300 text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
