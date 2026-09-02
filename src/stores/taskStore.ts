import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
}

interface TaskState {
  tasks: Task[];
  addTask: (title: string) => void;
  setStatus: (id: string, status: TaskStatus) => void;
  removeTask: (id: string) => void;
  clearDone: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title) =>
        set((s) => ({
          tasks: [
            {
              id: crypto.randomUUID(),
              title: title.trim(),
              status: "todo",
              createdAt: Date.now(),
            },
            ...s.tasks,
          ],
        })),
      setStatus: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),
      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      clearDone: () =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.status !== "done") })),
    }),
    { name: "launchpad-tasks" },
  ),
);
