"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Loader2,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  category: string | null;
  dueDate: string | null;
};

export default function CalendarPage() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(
    today.getDate()
  );

  const [loading, setLoading] = useState(true);
  const [updatingTask, setUpdatingTask] = useState<string | null>(null);

  // =========================
  // Fetch Tasks
  // =========================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/tasks");

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // Calendar Information
  // =========================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const monthName = currentDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
    }
  );

  // =========================
  // Calendar Days
  // =========================

  const days = useMemo(() => {
    const calendarDays: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return calendarDays;
  }, [firstDay, daysInMonth]);

  // =========================
  // Date Helper
  // =========================

  const formatDate = (
    year: number,
    month: number,
    day: number
  ) => {
    return `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
  };

  // =========================
  // Tasks For Date
  // =========================

  const getTasksForDate = (day: number) => {
    const selectedDateString = formatDate(
      year,
      month,
      day
    );

    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      const taskDate = new Date(task.dueDate);

      const taskDateString = formatDate(
        taskDate.getFullYear(),
        taskDate.getMonth(),
        taskDate.getDate()
      );

      return taskDateString === selectedDateString;
    });
  };

  const selectedTasks = selectedDate
    ? getTasksForDate(selectedDate)
    : [];

  // =========================
  // Task Indicator
  // =========================

  const hasTasksOnDate = (day: number) => {
    return getTasksForDate(day).length > 0;
  };

  // =========================
  // Today
  // =========================

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // =========================
  // Complete / Uncomplete
  // =========================

  const toggleTask = async (task: Task) => {
    if (updatingTask) return;

    try {
      setUpdatingTask(task.id);

      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await res.json();

      setTasks((previousTasks) =>
        previousTasks.map((currentTask) =>
          currentTask.id === task.id
            ? updatedTask
            : currentTask
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setUpdatingTask(null);
    }
  };

  // =========================
  // Month Navigation
  // =========================

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );

    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );

    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

    setSelectedDate(today.getDate());
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">

      {/* ================= HEADER ================= */}

      <div className="mb-6">
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CalendarDays size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Calendar
            </h1>

            <p className="text-sm text-gray-500">
              View and manage your tasks by due date.
            </p>
          </div>

        </div>
      </div>

      {/* ================= CALENDAR ================= */}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

        {/* Month Navigation */}

        <div className="mb-6 flex items-center justify-between">

          <button
            type="button"
            onClick={previousMonth}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="text-center">

            <h2 className="text-xl font-bold text-gray-900">
              {monthName} {year}
            </h2>

            <button
              type="button"
              onClick={goToToday}
              className="mt-1 text-xs font-medium text-blue-600 hover:underline"
            >
              Go to today
            </button>

          </div>

          <button
            type="button"
            onClick={nextMonth}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight size={22} />
          </button>

        </div>

        {/* Week Days */}

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
              className="py-2 text-center text-xs font-semibold text-gray-400 sm:text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}

        <div className="grid grid-cols-7 gap-1 sm:gap-2">

          {days.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="aspect-square"
                />
              );
            }

            const todayDate = isToday(day);
            const hasTasks = hasTasksOnDate(day);
            const selected = selectedDate === day;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={`
                  relative
                  flex
                  aspect-square
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  transition-all

                  ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white shadow-md"
                      : todayDate
                        ? "border-blue-300 bg-blue-50 text-blue-700"
                        : "border-gray-100 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                  }
                `}
              >
                <span
                  className={
                    todayDate ? "font-bold" : ""
                  }
                >
                  {day}
                </span>

                {hasTasks && (
                  <span
                    className={`
                      absolute
                      bottom-1
                      h-1.5
                      w-1.5
                      rounded-full
                      ${
                        selected
                          ? "bg-white"
                          : "bg-blue-600"
                      }
                    `}
                  />
                )}
              </button>
            );
          })}

        </div>

        {/* Legend */}

        <div className="mt-5 flex items-center justify-center gap-5 text-xs text-gray-500">

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Has tasks
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full border border-blue-500 bg-blue-50" />
            Today
          </div>

        </div>
      </div>

      {/* ================= SELECTED DATE ================= */}

      {selectedDate && (
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Selected date
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                {new Date(
                  year,
                  month,
                  selectedDate
                ).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {selectedTasks.length}{" "}
              {selectedTasks.length === 1
                ? "task"
                : "tasks"}
            </span>

          </div>

          {/* Loading */}

          {loading && (
            <div className="flex justify-center py-8">
              <Loader2
                size={24}
                className="animate-spin text-blue-600"
              />
            </div>
          )}

          {/* No Tasks */}

          {!loading &&
            selectedTasks.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">

                <div className="mb-2 text-3xl">
                  📝
                </div>

                <p className="font-medium text-gray-700">
                  No tasks for this day
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Add a task with this date as its due date.
                </p>

              </div>
            )}

          {/* Tasks */}

          {!loading &&
            selectedTasks.length > 0 && (
              <div className="space-y-3">

                {selectedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-gray-100
                      p-3
                      transition
                      hover:bg-gray-50
                    "
                  >

                    {/* Completion Button */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleTask(task)
                      }
                      disabled={
                        updatingTask === task.id
                      }
                      className="
                        shrink-0
                        transition
                        hover:scale-110
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                      aria-label={
                        task.completed
                          ? "Mark task as pending"
                          : "Mark task as completed"
                      }
                    >
                      {updatingTask === task.id ? (
                        <Loader2
                          size={21}
                          className="animate-spin text-blue-500"
                        />
                      ) : task.completed ? (
                        <CheckCircle2
                          size={21}
                          className="text-green-500"
                        />
                      ) : (
                        <Circle
                          size={21}
                          className="text-gray-400 hover:text-blue-500"
                        />
                      )}
                    </button>

                    {/* Task Content */}

                    <div className="min-w-0 flex-1">

                      <p
                        className={`
                          truncate
                          font-medium
                          ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-800"
                          }
                        `}
                      >
                        {task.title}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-2">

                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            font-semibold

                            ${
                              task.priority === "HIGH"
                                ? "bg-red-100 text-red-600"
                                : task.priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }
                          `}
                        >
                          {task.priority}
                        </span>

                        {task.category && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                            {task.category}
                          </span>
                        )}

                      </div>
                    </div>

                    {/* View Tasks */}

                    <Link
                      href="/tasks"
                      className="
                        shrink-0
                        rounded-lg
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-blue-600
                        hover:bg-blue-50
                      "
                    >
                      View
                    </Link>

                  </div>
                ))}

              </div>
            )}

        </div>
      )}

    </main>
  );
}