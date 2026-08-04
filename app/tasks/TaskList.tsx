"use client";

import TaskItem from "./TaskItem";
import { AnimatePresence, motion } from "framer-motion";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="mt-6">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: -40,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="mb-4"
          >
            <TaskItem
              task={task}
              onToggle={() => onToggle(task.id)}
              onDelete={() => onDelete(task.id)}
              onEdit={(newTitle) => onEdit(task.id, newTitle)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}