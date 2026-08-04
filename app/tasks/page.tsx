"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ListTodo, CircleCheckBig, Clock3, Timer } from "lucide-react";

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useTasks } from "./useTasks";

export default function TasksPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify");

        if (!res.ok) {
          router.push("/auth/login");
        }
      } catch {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  const {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    total,
    completed,
    pending,
  } = useTasks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto px-6 py-8"
    >
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          📋 TaskBoard
        </h1>

        <p className="text-gray-500 mt-2">
          Organize your day. Stay productive. Finish your goals.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="rounded-xl bg-blue-100 p-5 text-center shadow-sm">
          <ListTodo
            className="mx-auto mb-2 text-blue-700"
            size={28}
          />

          <p className="text-sm text-gray-600">
            Total
          </p>

          <h2 className="text-3xl font-bold">
            {total}
          </h2>
        </div>

        <div className="rounded-xl bg-yellow-100 p-5 text-center shadow-sm">
          <Clock3
            className="mx-auto mb-2 text-yellow-700"
            size={28}
          />

          <p className="text-sm text-gray-600">
            Pending
          </p>

          <h2 className="text-3xl font-bold">
            {pending}
          </h2>
        </div>

        <div className="rounded-xl bg-green-100 p-5 text-center shadow-sm">
          <CircleCheckBig
            className="mx-auto mb-2 text-green-700"
            size={28}
          />

          <p className="text-sm text-gray-600">
            Completed
          </p>

          <h2 className="text-3xl font-bold">
            {completed}
          </h2>
        </div>

      </div>

      {/* Add Task */}

      <div className="mb-6">
        <TaskInput onAdd={addTask} />
      </div>

      {/* Focus Button */}

      <div className="mb-6">

        <Link
          href="/pomodoro"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          <Timer size={18} />
          Focus Mode
        </Link>

      </div>

      {/* Filters */}

      <div className="flex gap-3 mb-6">

        {["all", "pending", "completed"].map((f) => (

          <button
            key={f}
            onClick={() =>
              setFilter(f as "all" | "pending" | "completed")
            }
            className={`rounded-lg px-5 py-2 font-medium transition-all duration-200 ${
              filter === f
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>

        ))}

      </div>

      {/* Task List */}

      {tasks.length === 0 ? (

        <div className="rounded-xl border border-dashed border-gray-300 py-14 text-center">

          <div className="text-6xl mb-3">
            📝
          </div>

          <h2 className="text-xl font-semibold">
            No Tasks Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Add your first task above to get started.
          </p>

        </div>

      ) : (

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

      )}
    </motion.div>
  );
}