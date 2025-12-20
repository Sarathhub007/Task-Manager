"use client";
import { useEffect, useState } from "react";
import { Trash2, Pencil, X, Save } from "lucide-react";

type Task = {
  text: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

  const handleSave = () => {
    if (task.completed) return;
    if (!editText.trim()) return;
    onEdit(editText);
    setIsEditing(false);
  };

  return (
    <li className="
      flex justify-between items-center gap-2 p-2 rounded
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      transition-colors duration-300
    ">
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setIsEditing(false);
              setEditText(task.text);
            }
          }}
          className="border p-1 flex-1 rounded"
          autoFocus
        />
      ) : (
        <span
          onClick={onToggle}
          className={`
            cursor-pointer flex-1
            transition-all duration-300
            ${
              task.completed
                ? "line-through text-gray-400 opacity-70 scale-[0.98]"
                : "text-gray-800 dark:text-gray-200"
            }
          `}
        >
          {task.text}
        </span>
      )}

      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:bg-green-200 rounded"
          >
            <Save size={16} />
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditText(task.text);
            }}
            className="p-1 text-gray-500 hover:bg-gray-200 rounded"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              if (task.completed) return;
              setIsEditing(true);
            }}
            disabled={task.completed}
            className={`p-1 ${
              task.completed
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-200 rounded"
            }`}
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-500 hover:bg-red-100 rounded"
          >
            <Trash2 size={16} />
          </button>
        </>
      )}
    </li>
  );
}
