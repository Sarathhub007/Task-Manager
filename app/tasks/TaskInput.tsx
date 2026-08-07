"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

// type Props = {
//   onAdd: (title: string) => void;
// };

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
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const [category, setCategory] = useState("PERSONAL");

  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    onAdd(task, description, priority, category, dueDate);

    setTask("");
    setDescription("");
    setPriority("MEDIUM");
    setCategory("PERSONAL");
    setDueDate("");
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        placeholder="What do you need to do today?"
        className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        text-gray-800
        placeholder:text-gray-400
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
      "
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full rounded-xl border border-gray-300 p-3"
        rows={3}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
        }
        className="w-full rounded-xl border border-gray-300 p-3"
      >
        <option value="LOW">🟢 Low</option>
        <option value="MEDIUM">🟠 Medium</option>
        <option value="HIGH">🔴 High</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl border border-gray-300 p-3"
      >
        <option value="PERSONAL">🏠 Personal</option>
        <option value="COLLEGE">🎓 College</option>
        <option value="PLACEMENT">🚀 Placement</option>
        <option value="WORK">💼 Work</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full rounded-xl border border-gray-300 p-3"
      />

      <button
        onClick={handleAdd}
        className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-5
        py-3
        font-semibold
        text-white
        shadow-md
        transition
        hover:bg-blue-700
        active:scale-95
      "
      >
        <Plus size={18} />
        Add Task
      </button>
    </div>
  );
}
