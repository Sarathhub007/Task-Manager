"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  LayoutList,
  Timer,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsername(user.name || "User");
        setIsLoggedIn(true);
      } else {
        setUsername("");
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]);

  const linkClass = (path: string) =>
    `flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
      pathname === path
        ? "bg-blue-600 text-white shadow-md scale-105"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md shadow-sm border-b">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <LayoutList className="text-blue-600" size={26} />
        <span className="text-xl font-bold text-gray-800">
          TaskBoard
        </span>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">

        {!isLoggedIn ? (
          <>
            <Link
              href="/"
              title="Home"
              className={linkClass("/")}
            >
              <Home size={20} />
            </Link>

            <Link
              href="/auth/login"
              className="font-medium hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/tasks"
              title="Tasks"
              className={linkClass("/tasks")}
            >
              <LayoutList size={20} />
            </Link>

            <Link
              href="/pomodoro"
              title="Pomodoro Timer"
              className={linkClass("/pomodoro")}
            >
              <Timer size={20} />
            </Link>

            <Link
              href="/calender"
              title="Calendar"
              className={linkClass("/calender")}
            >
              <Calendar size={20} />
            </Link>
          </>
        )}
      </div>

      {/* User */}
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <>
            <span className="hidden sm:block font-medium text-gray-700">
              Hi, {username} 👋
            </span>

            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}