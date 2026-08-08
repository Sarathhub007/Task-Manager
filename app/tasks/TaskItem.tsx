"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  Pencil,
  X,
  Save,
  Circle,
  CircleCheckBig,
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
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    category: string,
    dueDate: string
  ) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );

  const [editPriority, setEditPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH"
  >(task.priority);

  const [editCategory, setEditCategory] = useState(
    task.category || "PERSONAL"
  );

  const [editDueDate, setEditDueDate] = useState(
    task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : ""
  );

  // Keep edit fields synchronized if the task
  // changes outside this component.
  useEffect(() => {
    if (!isEditing) {
      setEditTitle(task.title);
      setEditDescription(task.description || "");
      setEditPriority(task.priority);
      setEditCategory(task.category || "PERSONAL");
      setEditDueDate(
        task.dueDate
          ? new Date(task.dueDate)
              .toISOString()
              .split("T")[0]
          : ""
      );
    }
  }, [task, isEditing]);

  const resetEditFields = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
    setEditCategory(task.category || "PERSONAL");
    setEditDueDate(
      task.dueDate
        ? new Date(task.dueDate)
            .toISOString()
            .split("T")[0]
        : ""
    );
  };

  const handleEdit = () => {
    if (task.completed) return;

    resetEditFields();
    setIsEditing(true);
  };

  const handleSave = () => {
    const title = editTitle.trim();

    if (!title) return;

    onEdit(
      title,
      editDescription.trim(),
      editPriority,
      editCategory,
      editDueDate
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    resetEditFields();
    setIsEditing(false);
  };

  return (
    <div
      className={`
        flex
        items-start
        gap-4
        rounded-xl
        border
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md

        ${
          task.completed
            ? "border-green-200 bg-green-50"
            : "border-gray-200 bg-white"
        }
      `}
    >
      {/* ================= TOGGLE ================= */}

      <button
        type="button"
        onClick={onToggle}
        className="
          mt-1
          shrink-0
          text-green-600
          transition
          hover:scale-110
        "
        aria-label={
          task.completed
            ? "Mark task as pending"
            : "Mark task as completed"
        }
      >
        {task.completed ? (
          <CircleCheckBig size={24} />
        ) : (
          <Circle size={24} />
        )}
      </button>

      {/* ================= CONTENT ================= */}

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="space-y-3">
            {/* Title */}

            <input
              type="text"
              value={editTitle}
              onChange={(e) =>
                setEditTitle(e.target.value)
              }
              placeholder="Task title"
              autoFocus
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                text-gray-900
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />

            {/* Description */}

            <textarea
              value={editDescription}
              onChange={(e) =>
                setEditDescription(e.target.value)
              }
              placeholder="Description (optional)"
              rows={3}
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                text-gray-900
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />

            {/* Priority */}

            <select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(
                  e.target.value as
                    | "LOW"
                    | "MEDIUM"
                    | "HIGH"
                )
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-3
                py-2
                text-gray-900
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
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

            {/* Category */}

            <select
              value={editCategory}
              onChange={(e) =>
                setEditCategory(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-3
                py-2
                text-gray-900
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
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

            {/* Due Date */}

            <input
              type="date"
              value={editDueDate}
              onChange={(e) =>
                setEditDueDate(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-3
                py-2
                text-gray-900
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />

            {/* Edit Actions */}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-gray-100
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-200
                "
              >
                <X size={16} />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!editTitle.trim()}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Title */}

            <h3
              className={`
                text-lg
                font-semibold

                ${
                  task.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }
              `}
            >
              {task.title}
            </h3>

            {/* Description */}

            {task.description && (
              <p className="mt-1 text-sm text-gray-500">
                {task.description}
              </p>
            )}

            {/* Metadata */}

            <div className="mt-3 flex flex-wrap gap-2">
              {/* Priority */}

              <span
                className={`
                  rounded-full
                  px-2
                  py-1
                  text-xs
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

              {/* Category */}

              {task.category && (
                <span
                  className="
                    rounded-full
                    bg-blue-100
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    text-blue-700
                  "
                >
                  {task.category}
                </span>
              )}

              {/* Due Date */}

              {task.dueDate && (
                <span
                  className="
                    rounded-full
                    bg-gray-100
                    px-2
                    py-1
                    text-xs
                    text-gray-700
                  "
                >
                  📅{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* ================= ACTIONS ================= */}

      <div className="flex shrink-0 gap-2">
        {isEditing ? null : (
          <>
            {/* Edit */}

            <button
              type="button"
              onClick={handleEdit}
              disabled={task.completed}
              title={
                task.completed
                  ? "Completed tasks cannot be edited"
                  : "Edit task"
              }
              className={`
                rounded-lg
                p-2
                transition

                ${
                  task.completed
                    ? "cursor-not-allowed text-gray-300"
                    : "text-blue-600 hover:bg-blue-100"
                }
              `}
            >
              <Pencil size={18} />
            </button>

            {/* Delete */}

            <button
              type="button"
              onClick={onDelete}
              title="Delete task"
              className="
                rounded-lg
                p-2
                text-red-600
                transition
                hover:bg-red-100
              "
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}