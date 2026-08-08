"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutList,
  CalendarDays,
  Timer,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";

import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ---------------- Authentication State ----------------

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");

      setIsLoggedIn(Boolean(user));
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]);

  // ---------------- Link Style ----------------

  const linkClass = (path: string) => {
    const active = pathname === path;

    return `
      flex
      items-center
      gap-2
      rounded-lg
      px-3
      py-2
      text-sm
      font-medium
      transition-all
      duration-200

      ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }
    `;
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-200
        bg-white/95
        shadow-sm
        backdrop-blur
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-6xl
          items-center
          justify-between
          px-4
          py-3
          sm:px-6
        "
      >
        {/* ================= LEFT ================= */}

        <div className="flex items-center gap-2">
          {/* Brand */}

          <Link
            href="/"
            className="
              mr-2
              flex
              items-center
              gap-2
              text-lg
              font-bold
              text-gray-900
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-blue-600
                text-white
              "
            >
              ✓
            </span>

            <span className="hidden sm:inline">
              TaskBoard
            </span>
          </Link>

          {!isLoggedIn ? (
            <>
              {/* Home */}

              <Link
                href="/"
                className={linkClass("/")}
                title="Home"
              >
                <Home size={18} />

                <span className="hidden sm:inline">
                  Home
                </span>
              </Link>

              {/* Login */}

              <Link
                href="/auth/login"
                className={linkClass("/auth/login")}
                title="Login"
              >
                <LogIn size={18} />

                <span className="hidden sm:inline">
                  Login
                </span>
              </Link>

              {/* Signup */}

              <Link
                href="/auth/signup"
                className={linkClass("/auth/signup")}
                title="Sign Up"
              >
                <UserPlus size={18} />

                <span className="hidden sm:inline">
                  Sign Up
                </span>
              </Link>
            </>
          ) : (
            <>
              {/* Tasks */}

              <Link
                href="/tasks"
                className={linkClass("/tasks")}
                title="Tasks"
              >
                <LayoutList size={18} />

                <span className="hidden sm:inline">
                  Tasks
                </span>
              </Link>

              {/* Pomodoro */}

              <Link
                href="/pomodoro"
                className={linkClass("/pomodoro")}
                title="Focus Mode"
              >
                <Timer size={18} />

                <span className="hidden sm:inline">
                  Focus
                </span>
              </Link>

              {/* Calendar */}

              <Link
                href="/calender"
                className={linkClass("/calender")}
                title="Calendar"
              >
                <CalendarDays size={18} />

                <span className="hidden sm:inline">
                  Calendar
                </span>
              </Link>
            </>
          )}
        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center">
          {isLoggedIn && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}