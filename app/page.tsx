"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import home from "../public/home.jpg";

export default function Home() {
  return (
    <div
      className="min-h-[calc(100vh-72px)] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${home.src})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-6 text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          Organize Your Life
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-gray-200">
          Stay productive by managing your daily tasks, planning your schedule,
          and focusing with the built-in Pomodoro timer.
        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            href="/auth/signup"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/auth/login"
            className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Login
          </Link>

        </div>

        {/* Features */}

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg">
            <CheckCircle2
              className="mx-auto mb-3 text-green-400"
              size={40}
            />

            <h2 className="text-xl font-semibold text-white">
              Task Management
            </h2>

            <p className="mt-2 text-gray-300">
              Create, edit, complete, and organize your daily tasks with ease.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg">
            <Clock3
              className="mx-auto mb-3 text-yellow-400"
              size={40}
            />

            <h2 className="text-xl font-semibold text-white">
              Pomodoro Timer
            </h2>

            <p className="mt-2 text-gray-300">
              Stay focused with a built-in productivity timer designed for deep
              work sessions.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg">
            <CalendarDays
              className="mx-auto mb-3 text-blue-400"
              size={40}
            />

            <h2 className="text-xl font-semibold text-white">
              Calendar
            </h2>

            <p className="mt-2 text-gray-300">
              Plan your schedule and keep track of important upcoming tasks.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}