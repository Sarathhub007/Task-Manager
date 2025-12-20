"use client";
import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;
    onAdd(task);
    setTask("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        className="border border-amber-200 p-2 flex-1 bg-white text-black font-bold rounded"
        placeholder="Enter Task"
      />

      <button
        onClick={handleAdd}
        className="text-black px-4 py-2 bg-white rounded cursor-pointer
                   transition duration-100 active:scale-95 active:bg-amber-200"
      >
        ADD
      </button>
    </div>
  );
}
