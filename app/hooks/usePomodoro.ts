"use client";

import { useEffect, useState } from "react";

export type PomodoroMode = "focus" | "break";

export function usePomodoro() {
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // TIMER EFFECT (runs ONLY when isRunning or mode changes)
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);
          return nextMode === "focus" ? 25 * 60 : 5 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setMode("focus");
    setTimeLeft(25 * 60);
  };

  return {
    timeLeft,
    mode,
    isRunning,
    start,
    pause,
    reset,
  };
}
