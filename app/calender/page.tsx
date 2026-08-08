"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { useTasks } from "../tasks/useTasks";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(),
  );

  const { allTasks } = useTasks();

  // ==================================================
  // Current month
  // ==================================================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );

  // ==================================================
  // Calendar calculations
  // ==================================================

  const firstDay = new Date(
    year,
    month,
    1,
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  const days: (number | null)[] = [];

  // Empty days before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // ==================================================
  // Date helper
  // ==================================================

  const isSameDate = (
    date1: Date,
    date2: Date,
  ) => {
    return (
      date1.getFullYear() ===
        date2.getFullYear() &&
      date1.getMonth() ===
        date2.getMonth() &&
      date1.getDate() ===
        date2.getDate()
    );
  };

  // ==================================================
  // Tasks for selected date
  // ==================================================

  const selectedTasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      return isSameDate(
        new Date(task.dueDate),
        selectedDate,
      );
    });
  }, [allTasks, selectedDate]);

  // ==================================================
  // Tasks for calendar day
  // ==================================================

  const getTasksForDay = (day: number) => {
    return allTasks.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      const taskDate = new Date(task.dueDate);

      return (
        taskDate.getFullYear() === year &&
        taskDate.getMonth() === month &&
        taskDate.getDate() === day
      );
    });
  };

  // ==================================================
  // Previous month
  // ==================================================

  const previousMonth = () => {
    const newDate = new Date(
      year,
      month - 1,
      1,
    );

    setCurrentDate(newDate);
    setSelectedDate(newDate);
  };

  // ==================================================
  // Next month
  // ==================================================

  const nextMonth = () => {
    const newDate = new Date(
      year,
      month + 1,
      1,
    );

    setCurrentDate(newDate);
    setSelectedDate(newDate);
  };

  // ==================================================
  // Today
  // ==================================================

  const goToToday = () => {
    const today = new Date();

    setCurrentDate(today);
    setSelectedDate(today);
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Calendar
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          View and manage your tasks by date.
        </p>
      </div>

      {/* ==================================================
          MAIN WORKSPACE
      ================================================== */}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

        {/* ==================================================
            CALENDAR
        ================================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          {/* Calendar Header */}

          <div className="mb-6 flex items-center justify-between">

            <button
              type="button"
              onClick={previousMonth}
              className="
                rounded-lg
                p-2
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-900
              "
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="text-center">

              <h2 className="text-xl font-bold text-gray-900">
                {monthName}
              </h2>

              <button
                type="button"
                onClick={goToToday}
                className="
                  mt-1
                  text-xs
                  font-medium
                  text-blue-600
                  hover:underline
                "
              >
                Today
              </button>

            </div>

            <button
              type="button"
              onClick={nextMonth}
              className="
                rounded-lg
                p-2
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-900
              "
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>

          </div>

          {/* ==================================================
              WEEKDAYS
          ================================================== */}

          <div className="mb-2 grid grid-cols-7">

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                key={day}
                className="
                  py-2
                  text-center
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-400
                "
              >
                {day}
              </div>
            ))}

          </div>

          {/* ==================================================
              DAYS
          ================================================== */}

          <div className="grid grid-cols-7 gap-2">

            {days.map((day, index) => {

              // Empty calendar cell

              if (day === null) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="min-h-20"
                  />
                );
              }

              const date = new Date(
                year,
                month,
                day,
              );

              const dayTasks =
                getTasksForDay(day);

              const selected =
                isSameDate(
                  date,
                  selectedDate,
                );

              const today =
                isSameDate(
                  date,
                  new Date(),
                );

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    setSelectedDate(date)
                  }
                  className={`
                    relative
                    min-h-20
                    rounded-xl
                    border
                    p-2
                    text-left
                    transition

                    ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50/50"
                    }
                  `}
                >

                  {/* Day number */}

                  <span
                    className={`
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                      font-semibold

                      ${
                        today
                          ? "bg-blue-600 text-white"
                          : selected
                            ? "text-blue-700"
                            : "text-gray-700"
                      }
                    `}
                  >
                    {day}
                  </span>

                  {/* Task indicator */}

                  {dayTasks.length > 0 && (
                    <div className="mt-2 space-y-1">

                      <div className="flex items-center gap-1">

                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                        <span className="truncate text-[11px] text-gray-500">
                          {dayTasks.length}{" "}
                          {dayTasks.length === 1
                            ? "task"
                            : "tasks"}
                        </span>

                      </div>

                      <div className="hidden text-[11px] text-gray-500 sm:block">
                        {dayTasks[0].title}
                      </div>

                    </div>
                  )}

                </button>
              );
            })}

          </div>

        </section>

        {/* ==================================================
            SELECTED DATE TASKS
        ================================================== */}

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">

          {/* Header */}

          <div className="mb-6">

            <div className="mb-2 flex items-center gap-2 text-blue-600">

              <CalendarDays size={19} />

              <span className="text-sm font-semibold">
                Selected Date
              </span>

            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              {selectedDate.toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                },
              )}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {selectedTasks.length}{" "}
              {selectedTasks.length === 1
                ? "task"
                : "tasks"}{" "}
              scheduled
            </p>

          </div>

          {/* ==================================================
              TASKS
          ================================================== */}

          {selectedTasks.length === 0 ? (

            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">

              <div className="mb-3 text-4xl">
                📅
              </div>

              <h3 className="font-semibold text-gray-800">
                No tasks for this date
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Select another date or create a
                task with a due date.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {selectedTasks.map((task) => (

                <Link
                  key={task.id}
                  href={`/tasks?task=${task.id}`}
                  className="
                    block
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                    hover:border-blue-300
                    hover:shadow-md
                  "
                >

                  <div className="flex items-start gap-3">

                    {/* Status icon */}

                    {task.completed ? (

                      <CircleCheckBig
                        size={20}
                        className="
                          mt-0.5
                          shrink-0
                          text-green-500
                        "
                      />

                    ) : (

                      <Clock3
                        size={20}
                        className="
                          mt-0.5
                          shrink-0
                          text-yellow-500
                        "
                      />

                    )}

                    {/* Task information */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center justify-between gap-3">

                        <h3
                          className={`font-semibold ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </h3>

                        <ArrowRight
                          size={16}
                          className="
                            shrink-0
                            text-gray-400
                          "
                        />

                      </div>

                      {/* Description */}

                      {task.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                          {task.description}
                        </p>
                      )}

                      {/* Tags */}

                      <div className="mt-2 flex flex-wrap gap-2">

                        <span
                          className={`
                            rounded-full
                            px-2
                            py-1
                            text-xs
                            font-semibold

                            ${
                              task.priority ===
                              "HIGH"
                                ? "bg-red-100 text-red-600"
                                : task.priority ===
                                    "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }
                          `}
                        >
                          {task.priority}
                        </span>

                        {task.category && (
                          <span className="
                            rounded-full
                            bg-blue-100
                            px-2
                            py-1
                            text-xs
                            font-semibold
                            text-blue-700
                          ">
                            {task.category}
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}

          {/* ==================================================
              OPEN TASKBOARD
          ================================================== */}

          <Link
            href="/tasks"
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Open TaskBoard

            <ArrowRight size={17} />
          </Link>

        </section>

      </div>
    </main>
  );
}