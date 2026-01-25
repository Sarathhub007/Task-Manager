"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, Home, KeyRound, LayoutList, LogIn, Moon, SignalIcon, Sun, Timer } from "lucide-react";
// import { useTheme } from "@/components/useTheme";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

export default function Navbar() {
  const route = useRouter();
  const pathname = usePathname();
  // const { theme, toggleTheme } = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    checkAuth();

    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname]);

  const linkClass = (path: string) =>
    `px-3 py-1 rounded-md transition font-medium ${
      pathname === path
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-black border-b dark:border-gray-800 ">
      {/* Left */}
      <div className="flex gap-3">
        {!isLoggedIn ? (
          <>
            <Link href="/" className={linkClass("/")}>
              <Home/>
            </Link>
            <Link href="/auth/login" className={linkClass("/auth/login")}>
              Login
            </Link>

            <Link href="/auth/signup" className={linkClass("/auth/signup")}>
            SignIn
            </Link>
          </>
        ) : (
          <>
            

            <Link href="/tasks" className={linkClass("/tasks")}>
              <LayoutList/>
            </Link>
            
            <Link href="/pomodoro" className={linkClass("/pomodoro")}>
            
              <Timer/>
            </Link>
            <Link href="/calender" className={linkClass("/calender")}>
              
              <Calendar/>
            </Link>
          </>
          
        )}
      </div>

      {/* Right */}
      <div className="flex flex-row gap-4">
        {/* <button
          onClick={toggleTheme}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button> */}

        {isLoggedIn && <LogoutButton />}
      </div>
    </nav>
  );
}
