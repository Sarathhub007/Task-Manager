"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { motion } from "framer-motion";
import {
  ListTodo,
  CircleCheckBig,
  Clock3,
  Search,
  Trash2,
} from "lucide-react";

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";
import { useTasks } from "./useTasks";

export default function TasksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ==================================================
  // Selected Task
  // ==================================================

  const [selectedTaskId, setSelectedTaskId] =
    useState<string | null>(null);

  // ==================================================
  // Authentication
  // ==================================================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "/api/auth/verify",
        );

        if (!res.ok) {
          router.push("/auth/login");
        }
      } catch {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  // ==================================================
  // Tasks
  // ==================================================

  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    search,
    setSearch,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
    total,
    completed,
    pending,
    loading,
  } = useTasks();

  // ==================================================
  // Read task from URL
  // ==================================================

  useEffect(() => {
    const taskId = searchParams.get("task");

    if (!taskId) {
      return;
    }

    const taskExists = allTasks.some(
      (task) => task.id === taskId,
    );

    if (taskExists) {
      setSelectedTaskId(taskId);
    }
  }, [searchParams, allTasks]);

  // ==================================================
  // Selected Task
  // ==================================================

  const selectedTask =
    allTasks.find(
      (task) => task.id === selectedTaskId,
    ) || null;

  // ==================================================
  // Keep Selected Task Valid
  // ==================================================

  useEffect(() => {
    if (
      selectedTaskId &&
      !allTasks.some(
        (task) => task.id === selectedTaskId,
      )
    ) {
      setSelectedTaskId(null);
    }
  }, [allTasks, selectedTaskId]);

  // ==================================================
  // Select Task
  // ==================================================

  const selectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  // ==================================================
  // Close Details
  // ==================================================

  const closeDetails = () => {
    setSelectedTaskId(null);

    router.replace("/tasks");
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        mx-auto
        w-full
        max-w-7xl
        px-4
        py-6
        sm:px-6
        sm:py-8
      "
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          📋 TaskBoard
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Organize your day. Stay productive. Finish your goals.
        </p>
      </div>

      {/* ==================================================
          STATISTICS
      ================================================== */}

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">

        {/* Total */}

        <div
          className="
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            p-4
            text-center
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <ListTodo
            className="mx-auto mb-2 text-blue-600"
            size={26}
          />

          <p className="text-sm text-gray-600">
            Total
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {total}
          </h2>
        </div>

        {/* Pending */}

        <div
          className="
            rounded-xl
            border
            border-yellow-100
            bg-yellow-50
            p-4
            text-center
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <Clock3
            className="mx-auto mb-2 text-yellow-600"
            size={26}
          />

          <p className="text-sm text-gray-600">
            Pending
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {pending}
          </h2>
        </div>

        {/* Completed */}

        <div
          className="
            rounded-xl
            border
            border-green-100
            bg-green-50
            p-4
            text-center
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <CircleCheckBig
            className="mx-auto mb-2 text-green-600"
            size={26}
          />

          <p className="text-sm text-gray-600">
            Completed
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {completed}
          </h2>
        </div>

      </div>

      {/* ==================================================
          MAIN WORKSPACE
      ================================================== */}

      <div
        className={`
          grid
          gap-6
          ${
            selectedTask
              ? "lg:grid-cols-[minmax(0,1fr)_380px]"
              : "grid-cols-1"
          }
        `}
      >

        {/* ==================================================
            TASKBOARD
        ================================================== */}

        <section>

          {/* Search */}

          <div className="relative mb-5">

            <Search
              size={19}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tasks..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                py-3
                pl-11
                pr-4
                text-gray-800
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />

          </div>

          {/* Add Task */}

          <div className="mb-6">
            <TaskInput onAdd={addTask} />
          </div>

          {/* ==================================================
              FILTERS
          ================================================== */}

          <div className="mb-5 flex flex-wrap items-center gap-2">

            {(
              [
                "all",
                "pending",
                "completed",
              ] as const
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setFilter(item)
                }
                className={`
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all

                  ${
                    filter === item
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {item.charAt(0).toUpperCase() +
                  item.slice(1)}
              </button>
            ))}

            {/* Clear Completed */}

            <button
              type="button"
              onClick={clearCompleted}
              disabled={completed === 0}
              className={`
                ml-auto
                inline-flex
                items-center
                gap-2
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                transition

                ${
                  completed === 0
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }
              `}
            >
              <Trash2 size={16} />

              Clear Completed
            </button>

          </div>

          {/* ==================================================
              TASK LIST
          ================================================== */}

          {loading ? (

            <div className="space-y-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-24
                    animate-pulse
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                  "
                />
              ))}

            </div>

          ) : tasks.length === 0 ? (

            <div
              className="
                rounded-xl
                border
                border-dashed
                border-gray-300
                px-6
                py-14
                text-center
              "
            >

              <div className="mb-3 text-5xl">
                {search
                  ? "🔍"
                  : filter === "completed"
                    ? "🎉"
                    : "📝"}
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {search
                  ? "No matching tasks"
                  : filter === "completed"
                    ? "No completed tasks"
                    : filter === "pending"
                      ? "No pending tasks"
                      : "No Tasks Yet"}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {search
                  ? "Try a different search term."
                  : filter === "completed"
                    ? "Complete a task and it will appear here."
                    : filter === "pending"
                      ? "You're all caught up!"
                      : "Add your first task above to get started."}
              </p>

            </div>

          ) : (

            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
              onSelect={(task) =>
                selectTask(task.id)
              }
              selectedTaskId={selectedTaskId}
            />

          )}

          {/* Footer */}

          {!loading &&
            allTasks.length > 0 && (
              <p
                className="
                  mt-6
                  text-center
                  text-xs
                  text-gray-400
                "
              >
                Showing {tasks.length} of{" "}
                {allTasks.length} tasks
              </p>
            )}

        </section>

        {/* ==================================================
            TASK DETAILS
        ================================================== */}

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={closeDetails}
          />
        )}

      </div>
    </motion.main>
  );
}