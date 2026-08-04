"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cal from "../../public/cal.jpg";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${cal.src})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Calendar Card */}
      <div className="relative z-10 w-full max-w-3xl rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl p-8">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <ChevronLeft />
          </button>

          <h1 className="text-3xl font-bold">
            📅 {monthNames[month]} {year}
          </h1>

          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <ChevronRight />
          </button>

        </div>

        {/* Week Days */}

        <div className="grid grid-cols-7 gap-3 mb-4 text-center font-semibold text-gray-600">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days */}

        <div className="grid grid-cols-7 gap-3">

          {days.map((day, index) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={index}
                className={`
                  h-16
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-lg
                  font-semibold
                  transition-all
                  cursor-pointer
                  ${
                    day === null
                      ? "bg-transparent cursor-default"
                      : isToday
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-blue-100 hover:scale-105"
                  }
                `}
              >
                {day}
              </div>
            );
          })}

        </div>

        {/* Footer */}

        <div className="mt-8 text-center text-gray-500">

          <p>
            📌 Click a date to schedule future tasks.
          </p>

        </div>

      </div>
    </div>
  );
}