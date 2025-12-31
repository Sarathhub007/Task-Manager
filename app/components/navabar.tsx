"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-1 rounded transition ${
      pathname === path
        ? "bg-black text-white"
        : "text-gray-600 hover:text-black"
    }`;

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/" className={linkClass("/")}>Home</Link>
      <Link href="/tasks" className={linkClass("/tasks")}>Tasks</Link>
      <Link href="/pomodoro" className={linkClass("/pomodoro")}>Pomodoro</Link>
    </nav>
  );
}
