"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Props = {
  onAdd: (title: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    const trimmedTask = task.trim();

    if (!trimmedTask) return;

    onAdd(trimmedTask);
    setTask("");
  };

  return (
    <div className="flex gap-3">
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
          flex-1
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

      <button
        onClick={handleAdd}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          font-semibold
          text-white
          shadow-md
          transition-all
          duration-200
          hover:bg-blue-700
          hover:shadow-lg
          active:scale-95
        "
      >
        <Plus size={18} />
        Add
      </button>
    </div>
  );
}