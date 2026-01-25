"use client";

import cal from "../../public/cal.jpg"
export default function calender() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const firstday = new Date(year, month, 1).getDay();
  const daysinmonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstday; i++) {
    days.push("");
  }
  for (let d = 1; d <= daysinmonth; d++) {
    days.push(d);
  }
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow bg-center bg-cover" 
     style={{ backgroundImage: `url(${cal.src})` }}>
      <h1 className="text-xl font-bold text-center">
        {year}-{month + 1}{" "}
      </h1>
       <div className="grid grid-cols-7 text-center mt-4 text-gray-500 text-sm font-semibold">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
        <div className="grid grid-cols-7 gap-2 mt-2">
        {days.map((day, index) => (
          <div
            key={index}
            className="h-12 flex items-center justify-center border rounded-lg hover:bg-blue-100 cursor-pointer"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
