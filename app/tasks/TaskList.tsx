"use client";

import TaskItem from "./TaskItem";
import { AnimatePresence, motion } from "framer-motion";

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
  onEdit: (
    id: string,
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    category: string,
    dueDate: string
  ) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  return (
    <ul className="mt-4 space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            layout
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <TaskItem
              task={task}
              onToggle={() => onToggle(task.id)}
              onDelete={() => onDelete(task.id)}
              onEdit={(
                title,
                description,
                priority,
                category,
                dueDate
              ) =>
                onEdit(
                  task.id,
                  title,
                  description,
                  priority,
                  category,
                  dueDate
                )
              }
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}