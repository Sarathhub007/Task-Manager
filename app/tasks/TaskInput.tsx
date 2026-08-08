"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type Props = {
  onAdd: (
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    category: string,
    dueDate: string,
  ) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH"
  >("MEDIUM");

  const [category, setCategory] =
    useState("PERSONAL");

  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    onAdd(
      task.trim(),
      description.trim(),
      priority,
      category,
      dueDate,
    );

    // Reset form

    setTask("");
    setDescription("");
    setPriority("MEDIUM");
    setCategory("PERSONAL");
    setDueDate("");

    setIsOpen(false);
  };

  const handleClose = () => {
    setTask("");
    setDescription("");
    setPriority("MEDIUM");
    setCategory("PERSONAL");
    setDueDate("");

    setIsOpen(false);
  };

  return (
    <>
      {/* ==================================================
          ADD TASK BUTTON
      ================================================== */}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-dashed
            border-gray-300
            bg-gray-50
            px-4
            py-3
            font-medium
            text-gray-600
            transition
            hover:border-blue-400
            hover:bg-blue-50
            hover:text-blue-600
          "
        >
          <Plus size={19} />

          Add a new task
        </button>
      )}

      {/* ==================================================
          MODAL
      ================================================== */}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">

          <div
            className="
              w-full
              max-w-lg
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
          >

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add Task
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create a task and organize it.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="
                  rounded-lg
                  p-2
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                "
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <div className="space-y-4">

              {/* Title */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Task title
                </label>

                <input
                  type="text"
                  value={task}
                  onChange={(e) =>
                    setTask(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      task.trim()
                    ) {
                      handleAdd();
                    }

                    if (e.key === "Escape") {
                      handleClose();
                    }
                  }}
                  placeholder="What do you need to do?"
                  autoFocus
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-gray-900
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                  "
                />
              </div>

              {/* Description */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                  <span className="ml-1 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Add some details..."
                  rows={3}
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-gray-900
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                  "
                />
              </div>

              {/* Priority */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value as
                        | "LOW"
                        | "MEDIUM"
                        | "HIGH",
                    )
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-gray-900
                    outline-none
                  "
                >
                  <option value="LOW">
                    🟢 Low
                  </option>

                  <option value="MEDIUM">
                    🟠 Medium
                  </option>

                  <option value="HIGH">
                    🔴 High
                  </option>
                </select>
              </div>

              {/* Category */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-gray-900
                    outline-none
                  "
                >
                  <option value="PERSONAL">
                    🏠 Personal
                  </option>

                  <option value="COLLEGE">
                    🎓 College
                  </option>

                  <option value="PLACEMENT">
                    🚀 Placement
                  </option>

                  <option value="WORK">
                    💼 Work
                  </option>
                </select>
              </div>

              {/* Due Date */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Due date
                  <span className="ml-1 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(e.target.value)
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-gray-900
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                  "
                />
              </div>
            </div>

            {/* ==================================================
                ACTIONS
            ================================================== */}

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={handleClose}
                className="
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-100
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAdd}
                disabled={!task.trim()}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Plus size={17} />

                Add Task
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}