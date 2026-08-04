"use client";

import { useState } from "react";
import { Trash2, Pencil, X, Save, Circle, CircleCheckBig } from "lucide-react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;

    onEdit(editText.trim());
    setIsEditing(false);
  };

  return (
    <div
      className={`
        flex items-center justify-between gap-4
        rounded-xl border p-4 shadow-sm
        transition-all duration-300
        hover:shadow-md hover:-translate-y-0.5
        ${
          task.completed
            ? "bg-green-50 border-green-200"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* Left Side */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onToggle}
          className="transition hover:scale-110"
        >
          {task.completed ? (
            <CircleCheckBig
              size={24}
              className="text-green-600"
            />
          ) : (
            <Circle
              size={24}
              className="text-gray-400 hover:text-blue-600"
            />
          )}
        </button>

        {isEditing ? (
          <input
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();

              if (e.key === "Escape") {
                setEditText(task.title);
                setIsEditing(false);
              }
            }}
            className="
              flex-1
              rounded-lg
              border
              border-blue-300
              px-3
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-200
            "
          />
        ) : (
          <span
            className={`
              flex-1 cursor-pointer text-lg
              transition-all duration-300
              ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }
            `}
            onClick={onToggle}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="
                rounded-lg
                bg-green-500
                p-2
                text-white
                transition
                hover:bg-green-600
              "
            >
              <Save size={18} />
            </button>

            <button
              onClick={() => {
                setEditText(task.title);
                setIsEditing(false);
              }}
              className="
                rounded-lg
                bg-gray-400
                p-2
                text-white
                transition
                hover:bg-gray-500
              "
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={task.completed}
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

            <button
              onClick={onDelete}
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