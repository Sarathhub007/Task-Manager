"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const linkClass = (path: string) =>
    `px-3 py-1 rounded-md transition font-medium ${
      pathname === path
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-black border-b dark:border-gray-800">
      {/* Left Nav */}
      <div className="flex gap-3">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>
        <Link href="/tasks" className={linkClass("/tasks")}>
          Tasks
        </Link>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="
          relative flex items-center justify-center 
          w-10 h-10 rounded-full 
          bg-gray-200 dark:bg-gray-800
          hover:bg-gray-300 dark:hover:bg-gray-700
          transition-all duration-300
          shadow-sm
        "
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </nav>
  );
}
