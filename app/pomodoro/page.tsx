"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
} from "lucide-react";

const INITIAL_TIME = 25 * 60;

export default function PomodoroPage() {
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // ---------------- Timer ----------------

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          setIsRunning(false);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // ---------------- Time ----------------

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  // ---------------- Progress ----------------

  const progress =
    ((INITIAL_TIME - seconds) / INITIAL_TIME) * 100;

  // ---------------- Reset ----------------

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(INITIAL_TIME);
  };

  return (
    <main
      className="
        min-h-[calc(100vh-64px)]
        flex
        items-center
        justify-center
        bg-gray-50
        px-4
        py-8
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-lg
          sm:p-8
        "
      >
        {/* ================= HEADER ================= */}

        <div className="mb-8 text-center">
          <div
            className="
              mx-auto
              mb-3
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-blue-100
              text-blue-600
            "
          >
            <Timer size={25} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Focus Mode
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Stay focused for 25 minutes.
          </p>
        </div>

        {/* ================= TIMER ================= */}

        <div className="relative mx-auto mb-8 flex h-64 w-64 items-center justify-center">
          {/* Progress Ring */}

          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background */}

            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="text-gray-100"
            />

            {/* Progress */}

            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              className="text-blue-600 transition-all duration-500"
              strokeDasharray="276.46"
              strokeDashoffset={
                276.46 -
                (276.46 * progress) / 100
              }
            />
          </svg>

          {/* Timer Text */}

          <div className="relative text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
              {seconds === 0
                ? "Complete"
                : isRunning
                  ? "Focus"
                  : "Ready"}
            </p>

            <div className="mt-1 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {formattedTime}
            </div>

            <p className="mt-2 text-xs text-gray-400">
              25 minute session
            </p>
          </div>
        </div>

        {/* ================= CONTROLS ================= */}

        <div className="flex justify-center gap-3">
          {/* Start / Pause */}

          <button
            type="button"
            onClick={() =>
              setIsRunning((previous) => !previous)
            }
            disabled={seconds === 0}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isRunning ? (
              <>
                <Pause size={18} />
                Pause
              </>
            ) : (
              <>
                <Play size={18} />
                Start
              </>
            )}
          </button>

          {/* Reset */}

          <button
            type="button"
            onClick={handleReset}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-gray-100
              px-5
              py-3
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-200
              active:scale-95
            "
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        {/* ================= STATUS ================= */}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            {seconds === 0
              ? "🎉 Great work! Session completed."
              : isRunning
                ? "Stay focused. You've got this."
                : "Press Start when you're ready."}
          </p>
        </div>
      </div>
    </main>
  );
}