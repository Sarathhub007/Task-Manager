"use client";

import TaskItem from "./TaskItem";

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
  tasks: Task[];

  onToggle: (id: string) => void;

  onDelete: (id: string) => void;

  onSelect: (task: Task) => void;

  selectedTaskId: string | null;

  onEdit: (
    id: string,
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    category: string,
    dueDate: string,
  ) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onSelect,
  selectedTaskId,
  onEdit,
}: Props) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`
            rounded-xl
            transition-all
            ${
              selectedTaskId === task.id
                ? "ring-2 ring-blue-500 ring-offset-2"
                : ""
            }
          `}
        >
          <TaskItem
            task={task}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onSelect={() => onSelect(task)}
            onEdit={(
              title,
              description,
              priority,
              category,
              dueDate,
            ) =>
              onEdit(
                task.id,
                title,
                description,
                priority,
                category,
                dueDate,
              )
            }
          />
        </div>
      ))}
    </div>
  );
}