"use client";
import timer from"../../public/timer.jpg";
import { useEffect, useState } from "react";

export default function pomodoro() {
  const [seconds, setSeconds] = useState(1500);
  const [IsRunning, setIsRunning] = useState(false);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  useEffect(() => {
    if (!IsRunning) return;
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          setIsRunning(false);
          return 0;
        }
       return  prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [IsRunning]);

 return (
  <div className="min-h-screen  flex items-center justify-center "
>
    <div className="shadow-xl rounded-2xl p-8 flex flex-col items-center gap-6 bg-cover bg-center"
    style={{ backgroundImage: `url(${timer.src})` }}>

      <div className="w-64 h-64 rounded-full flex items-center justify-center shadow-inner">
        <span className="text-5xl font-bold text-black">
          {minutes}:{remainingSeconds.toString().padStart(2, "0")}
        </span>
      </div>

      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>

        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
          onClick={() => setIsRunning(false)}
        >
          Stop
        </button>

        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition"
          onClick={() => {
            setIsRunning(false);
            setSeconds(1500);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  </div>
);
    
}
