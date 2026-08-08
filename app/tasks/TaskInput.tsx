"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Props = {
  onAdd: (
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    category: string,
    dueDate: string
  ) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH"
  >("MEDIUM");
  const [category, setCategory] = useState("PERSONAL");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    const title = task.trim();

    if (!title) return;

    onAdd(
      title,
      description.trim(),
      priority,
      category,
      dueDate
    );

    setTask("");
    setDescription("");
    setPriority("MEDIUM");
    setCategory("PERSONAL");
    setDueDate("");
  };

  return (
    <div className="space-y-3">

      {/* Title + Add */}

      <div className="flex flex-col gap-2 sm:flex-row">
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
            min-w-0
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
          type="button"
          onClick={handleAdd}
          disabled={!task.trim()}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-blue-700
            hover:shadow-md
            active:scale-95
            disabled:cursor-not-allowed
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:shadow-none
          "
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* Description */}

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Description (optional)"
        rows={3}
        className="
          w-full
          resize-none
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

      {/* Options */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value as
                | "LOW"
                | "MEDIUM"
                | "HIGH"
            )
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-3
            py-3
            text-gray-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
          "
        >
          <option value="LOW">
            🟢 Low Priority
          </option>

          <option value="MEDIUM">
            🟠 Medium Priority
          </option>

          <option value="HIGH">
            🔴 High Priority
          </option>
        </select>

        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-3
            py-3
            text-gray-700
            outline-none
            transition
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
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-3
            py-3
            text-gray-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
          "
        />

      </div>
    </div>
  );
}