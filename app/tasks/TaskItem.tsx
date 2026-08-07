"use client";

import { useState } from "react";
import { Trash2, Pencil, X, Save, Circle, CircleCheckBig } from "lucide-react";

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
    dueDate: string,
  ) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || "",
  );
  const [editPriority, setEditPriority] = useState<"LOW" | "MEDIUM" | "HIGH">(
    task.priority,
  );

  const [editCategory, setEditCategory] = useState(task.category || "PERSONAL");

  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
  );

  const handleSave = () => {
    if (!editTitle.trim()) return;

    onEdit(editTitle, editDescription, editPriority, editCategory, editDueDate);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-start gap-4 rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
        task.completed
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Toggle Button */}

      <button
        onClick={onToggle}
        className="mt-1 text-green-600 hover:scale-110 transition"
      >
        {task.completed ? <CircleCheckBig size={24} /> : <Circle size={24} />}
      </button>

      {/* Task Content */}

      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-3">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title"
              className="w-full rounded-lg border border-gray-300 p-2"
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description"
              className="w-full rounded-lg border border-gray-300 p-2"
            />

            <select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
              }
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="LOW">🟢 Low</option>
              <option value="MEDIUM">🟠 Medium</option>
              <option value="HIGH">🔴 High</option>
            </select>

            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="PERSONAL">🏠 Personal</option>
              <option value="COLLEGE">🎓 College</option>
              <option value="PLACEMENT">🚀 Placement</option>
              <option value="WORK">💼 Work</option>
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
        ) : (
          <>
            <h3
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-1 text-sm text-gray-500">{task.description}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  task.priority === "HIGH"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {task.priority}
              </span>

              {task.category && (
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                  {task.category}
                </span>
              )}

              {task.dueDate && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
            >
              <Save size={18} />
            </button>

            <button
              onClick={() => {
                setEditTitle(task.title);
                setEditDescription(task.description || "");
                setEditPriority(task.priority);
                setEditCategory(task.category || "PERSONAL");
                setEditDueDate(
                  task.dueDate
                    ? new Date(task.dueDate).toISOString().split("T")[0]
                    : "",
                );
                setIsEditing(false);
              }}
              className="rounded-lg bg-gray-400 p-2 text-white hover:bg-gray-500"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={task.completed}
              className={`rounded-lg p-2 ${
                task.completed
                  ? "cursor-not-allowed text-gray-300"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={onDelete}
              className="rounded-lg p-2 text-red-600 hover:bg-red-100"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
