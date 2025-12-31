"use client";
import { usePomodoro } from "@/app/hooks/usePomodoro";
import TimeCircle from "./TimeCircle";
export default function PomodoroTimer() {
 const { timeLeft, mode, isRunning, start, pause, reset } = usePomodoro();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-xl bg-white dark:bg-gray-900 shadow">
      <h2 className="text-xl font-semibold text-center mb-2">
        {mode === "focus" ? "Focus Time" : "Break Time"}
      </h2>

      <TimeCircle minutes={minutes} seconds={seconds} mode={mode} />

      <div className="flex justify-center gap-4 mt-6">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Pause
          </button>
        )}
        <button onClick={reset}
        className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Reset
        </button>
      </div>
    </div>
  );
}
