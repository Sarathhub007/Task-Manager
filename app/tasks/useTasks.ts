"use client";

import { useEffect, useState } from "react";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  category: string | null;
  dueDate: string | null;
};

export type Filter = "all" | "completed" | "pending";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Tasks
  // =========================

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
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // Load Filter
  // =========================

  useEffect(() => {
    const savedFilter = localStorage.getItem(
      "taskFilter"
    ) as Filter | null;

    if (
      savedFilter === "all" ||
      savedFilter === "completed" ||
      savedFilter === "pending"
    ) {
      setFilter(savedFilter);
    }
  }, []);

  // =========================
  // Save Filter
  // =========================

  useEffect(() => {
    localStorage.setItem("taskFilter", filter);
  }, [filter]);

  // =========================
  // Add Task
  // =========================

  const addTask = async (
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    category: string,
    dueDate: string
  ) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          category,
          dueDate,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      await fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // =========================
  // Toggle Task
  // =========================

  const toggleTask = async (id: string) => {
    const task = tasks.find(
      (task) => task.id === id
    );

    if (!task) return;

    try {
      const res = await fetch(
        `/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to update task"
        );
      }

      await fetchTasks();
    } catch (err) {
      console.error(
        "Failed to toggle task:",
        err
      );
    }
  };

  // =========================
  // Edit Task
  // =========================

  const editTask = async (
    id: string,
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    category: string,
    dueDate: string
  ) => {
    try {
      const res = await fetch(
        `/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            description:
              description.trim() || null,
            priority,
            category,
            dueDate: dueDate
              ? new Date(dueDate)
              : null,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to update task"
        );
      }

      await fetchTasks();
    } catch (err) {
      console.error(
        "Failed to edit task:",
        err
      );
    }
  };

  // =========================
  // Delete Task
  // =========================

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(
        `/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to delete task"
        );
      }

      await fetchTasks();
    } catch (err) {
      console.error(
        "Failed to delete task:",
        err
      );
    }
  };

  // =========================
  // Clear Completed
  // =========================

  const clearCompleted = async () => {
    const completedTasks =
      tasks.filter(
        (task) => task.completed
      );

    try {
      await Promise.all(
        completedTasks.map((task) =>
          fetch(`/api/tasks/${task.id}`, {
            method: "DELETE",
          })
        )
      );

      await fetchTasks();
    } catch (err) {
      console.error(
        "Failed to clear completed tasks:",
        err
      );
    }
  };

  // =========================
  // Search + Filter
  // =========================

  const filteredTasks = tasks.filter(
    (task) => {
      const matchesFilter =
        filter === "completed"
          ? task.completed
          : filter === "pending"
            ? !task.completed
            : true;

      const searchText =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        task.title
          .toLowerCase()
          .includes(searchText) ||
        task.description
          ?.toLowerCase()
          .includes(searchText) ||
        task.category
          ?.toLowerCase()
          .includes(searchText);

      return (
        matchesFilter && matchesSearch
      );
    }
  );

  // =========================
  // Statistics
  // =========================

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  // =========================
  // Return
  // =========================

  return {
    tasks: filteredTasks,
    allTasks: tasks,

    filter,
    setFilter,

    search,
    setSearch,

    loading,

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