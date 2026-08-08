"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  Mail,
  Lock,
} from "lucide-react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      // Keep your existing localStorage authentication state.
      localStorage.setItem(
        "user",
        JSON.stringify(data.user || { email })
      );

      // Tell Navbar that login state changed.
      window.dispatchEvent(new Event("storage"));

      router.push("/tasks");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Background */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
        "
        style={{
          backgroundImage:
            "url('/login.jpg')",
        }}
      />

      {/* Dark overlay */}

      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}

      <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8">
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            border
            border-white/20
            bg-black/40
            p-6
            shadow-2xl
            backdrop-blur-md
            sm:p-8
          "
        >
          {/* Header */}

          <div className="mb-7 text-center">
            <div
              className="
                mx-auto
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-600
                text-white
                shadow-lg
              "
            >
              <LogIn size={26} />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-300">
              Login to continue to TaskBoard.
            </p>
          </div>

          {/* Error */}

          {error && (
            <div
              role="alert"
              className="
                mb-5
                rounded-lg
                border
                border-red-400/30
                bg-red-500/20
                px-4
                py-3
                text-sm
                text-red-200
              "
            >
              {error}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-200
                "
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    py-3
                    pl-10
                    pr-4
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-400/30
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-200
                "
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    py-3
                    pl-10
                    pr-12
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-400/30
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    transition
                    hover:text-white
                  "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-3
                font-semibold
                text-white
                shadow-lg
                transition-all
                hover:bg-blue-700
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Signup */}

          <p className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="
                font-medium
                text-blue-400
                hover:text-blue-300
                hover:underline
              "
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}