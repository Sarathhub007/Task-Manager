"use client"

import home from "../public/home.jpg"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-[calc(100%-5rem)] 

      bg-cover bg-center"
       style={{ backgroundImage: `url(${home.src})` }}
       >


      <div className="flex flex-col justify-center items-center text-center gap-4">
        <h1 className="text-3xl font-bold text-white">Task Manager</h1>
        <p className="font-mono text-white">
          Track your daily workouts and the habits and the Tasks
        </p>
      </div>
    </div>
  );
}
