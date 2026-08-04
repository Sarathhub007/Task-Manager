"use client";

import { useEffect, useState } from "react";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  category: string | null;
  dueDate: string | null;
};

export type Filter = "all" | "completed" | "pending";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  // ---------------- Fetch Tasks ----------------

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/tasks");

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- Filter ----------------

  useEffect(() => {
    const savedFilter = localStorage.getItem("taskFilter") as Filter | null;

    if (savedFilter) {
      setFilter(savedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskFilter", filter);
  }, [filter]);

  // ---------------- Add ----------------

  const addTask = async (title: string) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Toggle ----------------

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Edit ----------------

  const editTask = async (id: string, newTitle: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit task");
      }

      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Delete ----------------

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Clear Completed ----------------

  const clearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed);

    for (const task of completedTasks) {
      await deleteTask(task.id);
    }

    await fetchTasks();
  };

  // ---------------- Filtered Tasks ----------------

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.completed;

      case "pending":
        return !task.completed;

      default:
        return true;
    }
  });

  // ---------------- Statistics ----------------

  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = total - completed;

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
    loading,
    refresh: fetchTasks,
  };
}