"use client";

import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  return (
    <ul className="mt-4 space-y-2">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <TaskItem
              task={task}
              onToggle={() => onToggle(task.id)}
              onDelete={() => onDelete(task.id)}
              onEdit={(newText) => onEdit(task.id, newText)}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
