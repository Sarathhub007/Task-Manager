"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Briefcase,
} from "lucide-react";

import timer from "../../public/timer.jpg";

const WORK = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

export default function Pomodoro() {
  const [seconds, setSeconds] = useState(WORK);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "short" | "long">("work");

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          alert("🎉 Time's Up!");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  const totalSeconds =
    mode === "work"
      ? WORK
      : mode === "short"
      ? SHORT_BREAK
      : LONG_BREAK;

  const progress = (seconds / totalSeconds) * 100;

  const changeMode = (
    newMode: "work" | "short" | "long",
    value: number
  ) => {
    setMode(newMode);
    setSeconds(value);
    setIsRunning(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${timer.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-[420px] text-center">

        <h1 className="text-4xl font-bold mb-2">
          🍅 Pomodoro Timer
        </h1>

        <p className="text-gray-600 mb-8">
          Stay focused and productive.
        </p>

        {/* Mode Buttons */}

        <div className="flex justify-center gap-3 mb-8">

          <button
            onClick={() => changeMode("work", WORK)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "work"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            <Briefcase className="inline mr-2" size={18} />
            Work
          </button>

          <button
            onClick={() =>
              changeMode("short", SHORT_BREAK)
            }
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "short"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            <Coffee className="inline mr-2" size={18} />
            Break
          </button>

          <button
            onClick={() =>
              changeMode("long", LONG_BREAK)
            }
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "long"
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            🌙 Long
          </button>

        </div>

        {/* Progress Ring */}

        <div className="relative w-64 h-64 mx-auto mb-8">

          <svg
            className="absolute inset-0 -rotate-90"
            width="256"
            height="256"
          >
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="#2563eb"
              strokeWidth="12"
              fill="none"
              strokeDasharray={691}
              strokeDashoffset={
                691 - (691 * progress) / 100
              }
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <div>

              <div className="text-6xl font-bold">

                {minutes}:
                {remaining
                  .toString()
                  .padStart(2, "0")}

              </div>

              <p className="mt-2 text-gray-500">

                {mode === "work"
                  ? "Focus Time"
                  : mode === "short"
                  ? "Short Break"
                  : "Long Break"}

              </p>

            </div>

          </div>

        </div>

        {/* Controls */}

        <div className="flex justify-center gap-4">

          <button
            onClick={() => setIsRunning(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          >
            <Play size={18} />
            Start
          </button>

          <button
            onClick={() => setIsRunning(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            <Pause size={18} />
            Pause
          </button>

          <button
            onClick={() => {
              setIsRunning(false);

              setSeconds(totalSeconds);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

      </div>
    </div>
  );
}