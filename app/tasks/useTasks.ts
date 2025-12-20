"use client";
import { useEffect, useState } from "react";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type Filter = "all" | "completed" | "pending";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // Load tasks
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch {
      localStorage.removeItem("tasks");
    }
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Load filter
  useEffect(() => {
    const savedFilter = localStorage.getItem("taskFilter") as Filter | null;
    if (savedFilter) {
      setFilter(savedFilter);
    }
  }, []);

  // Save filter
  useEffect(() => {
    localStorage.setItem("taskFilter", filter);
  }, [filter]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
    total,
    completed,
    pending,
  };
}
