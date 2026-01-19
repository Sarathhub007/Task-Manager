"use client";

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useTasks } from "./useTasks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TasksPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has a valid token
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "GET",
        });
        if (!res.ok) {
          router.push("/auth/login");
        }
      } catch (error) {
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
    clearCompleted,
    total,
    completed,
    pending,
    allTasks,
  } = useTasks();

  <Link
    href="/pomodoro"
    className="inline-block mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
  >
    Go to Pomodoro ⏱️
  </Link>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative p-6 max-w-md mx-auto bg-white rounded-xl shadow dark:bg-gray-900 transition-colors duration-300"
    >
      <h1 className="text-xl font-bold mb-2">TaskBoard</h1>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 flex gap-4">
        <span>Total: {total}</span>
        <span>Pending: {pending}</span>
        <span>Completed: {completed}</span>
      </div>

      <TaskInput onAdd={addTask} />

      <div className="flex gap-2 my-4">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as "all" | "completed" | "pending")}
            className={`px-3 py-1 border rounded transition-colors ${
              filter === f
                ? "bg-black text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <button
        onClick={clearCompleted}
        disabled={!allTasks.some((t) => t.completed)}
        className={`mb-4 px-3 py-1 border rounded transition-all ${
          allTasks.some((t) => t.completed)
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Clear Completed
      </button>

      {/* Dark mode toggle */}

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </motion.div>
  );
}
