"use client";

import {
  CalendarDays,
  CircleCheckBig,
  Clock3,
  Flag,
  Folder,
  X,
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

type Props = {
  task: Task | null;
  onClose?: () => void;
};

export default function TaskDetails({
  task,
  onClose,
}: Props) {
  // ==================================================
  // No task selected
  // ==================================================

  if (!task) {
    return null;
  }

  // ==================================================
  // Format due date
  // ==================================================

  const formattedDate = task.dueDate
    ? new Date(
        task.dueDate,
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <>
      {/* ==================================================
          DESKTOP DETAILS
      ================================================== */}

      <aside
        className="
          hidden
          min-h-[500px]
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          lg:block
        "
      >
        <div className="sticky top-0 p-6">

          {/* Header */}

          <div className="mb-8 flex items-start justify-between gap-4">

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Task Details
              </p>

              <h2
                className="
                  mt-2
                  break-words
                  text-2xl
                  font-bold
                  text-gray-900
                "
              >
                {task.title}
              </h2>

            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="
                  shrink-0
                  rounded-lg
                  p-2
                  text-gray-400
                  transition
                  hover:bg-gray-200
                  hover:text-gray-700
                "
                aria-label="Close task details"
              >
                <X size={20} />
              </button>
            )}

          </div>

          <TaskInformation
            task={task}
            formattedDate={formattedDate}
          />

        </div>
      </aside>

      {/* ==================================================
          MOBILE DETAILS
      ================================================== */}

      <div
        className="
          fixed
          inset-0
          z-50
          bg-black/30
          backdrop-blur-sm
          lg:hidden
        "
      >

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            max-h-[85vh]
            overflow-y-auto
            rounded-t-3xl
            bg-white
            p-5
            shadow-2xl
          "
        >

          {/* Mobile Header */}

          <div className="mb-5 flex items-start justify-between gap-4">

            <div className="min-w-0">

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Task Details
              </p>

              <h2
                className="
                  mt-1
                  break-words
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                {task.title}
              </h2>

            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="
                  shrink-0
                  rounded-full
                  bg-gray-100
                  p-2
                  text-gray-500
                  transition
                  hover:bg-gray-200
                "
                aria-label="Close task details"
              >
                <X size={20} />
              </button>
            )}

          </div>

          <TaskInformation
            task={task}
            formattedDate={formattedDate}
          />

        </div>
      </div>
    </>
  );
}

// ======================================================
// Task Information
// ======================================================

function TaskInformation({
  task,
  formattedDate,
}: {
  task: Task;
  formattedDate: string | null;
}) {
  return (
    <div>

      {/* ==================================================
          STATUS
      ================================================== */}

      <div className="mb-6">

        <div
          className="
            mb-2
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-500
          "
        >
          <CircleCheckBig size={17} />

          <span>
            Status
          </span>
        </div>

        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1.5
            text-sm
            font-semibold

            ${
              task.completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {task.completed
            ? "Completed"
            : "Pending"}
        </span>

      </div>

      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <div className="mb-6">

        <div className="mb-2 text-sm font-medium text-gray-500">
          Description
        </div>

        <p
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-4
            text-sm
            leading-6
            text-gray-700
          "
        >
          {task.description ||
            "No description added."}
        </p>

      </div>

      {/* ==================================================
          TASK INFORMATION
      ================================================== */}

      <div className="space-y-3">

        {/* ==================================================
            PRIORITY
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-gray-200
            bg-white
            p-4
          "
        >

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-red-50 p-2">
              <Flag
                size={18}
                className="text-red-500"
              />
            </div>

            <span className="text-sm text-gray-500">
              Priority
            </span>

          </div>

          <span
            className={`
              text-sm
              font-semibold

              ${
                task.priority === "HIGH"
                  ? "text-red-600"
                  : task.priority === "MEDIUM"
                    ? "text-yellow-600"
                    : "text-green-600"
              }
            `}
          >
            {task.priority}
          </span>

        </div>

        {/* ==================================================
            CATEGORY
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-gray-200
            bg-white
            p-4
          "
        >

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-blue-50 p-2">
              <Folder
                size={18}
                className="text-blue-500"
              />
            </div>

            <span className="text-sm text-gray-500">
              Category
            </span>

          </div>

          <span className="text-sm font-semibold text-gray-800">
            {task.category || "None"}
          </span>

        </div>

        {/* ==================================================
            DUE DATE
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-gray-200
            bg-white
            p-4
          "
        >

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-purple-50 p-2">
              <CalendarDays
                size={18}
                className="text-purple-500"
              />
            </div>

            <span className="text-sm text-gray-500">
              Due date
            </span>

          </div>

          <span className="text-sm font-semibold text-gray-800">
            {formattedDate || "No due date"}
          </span>

        </div>

      </div>

      {/* ==================================================
          HINT
      ================================================== */}

      <div
        className="
          mt-6
          flex
          items-center
          gap-2
          text-xs
          text-gray-400
        "
      >
        <Clock3 size={14} />

        <span>
          Select another task to view its details.
        </span>
      </div>

    </div>
  );
}