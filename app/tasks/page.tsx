"use client";

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useTasks } from "./useTasks";
import { useTheme } from "../hooks/useTheme";
import { motion } from "framer-motion";

export default function TasksPage() {
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

  const { theme, toggleTheme } = useTheme();

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
            onClick={() => setFilter(f as any)}
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
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 bg-gray-200 dark:bg-gray-700"
      >
        <span
          className={`absolute text-xl transition-all duration-500 ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-180 scale-0 opacity-0"
          }`}
        >
          ☀️
        </span>

        <span
          className={`absolute text-xl transition-all duration-500 ${
            theme === "dark"
              ? "rotate-180 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        >
          🌙
        </span>
      </button>

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </motion.div>
  );
}
