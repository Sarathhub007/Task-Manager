"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/tasks");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Error during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-700 flex justify-center items-center">
      <div className="flex flex-col items-center gap-4 bg-gray-800 rounded-xl py-10 px-10 shadow-lg hover:shadow-gray-400 w-full max-w-sm">
        <h1 className="text-white text-2xl font-semibold">Login</h1>

        {error && (
          <div className="w-full bg-red-500 text-white text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-white bg-gray-600 px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-white bg-gray-600 px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-300 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
