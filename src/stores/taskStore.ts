import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskStatus = "todo" | "doing" | "done";

export const TASK_CATEGORIES = [
  "Personal",
  "Work",
  "Shopping",
  "Ideas",
] as const;
export type TaskCategory = (typeof TASK_CATEGORIES)[number];

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  createdAt: number;
}

interface TaskState {
  tasks: Task[];
  addTask: (title: string, category: TaskCategory) => void;
  setStatus: (id: string, status: TaskStatus) => void;
  removeTask: (id: string) => void;
  clearDone: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, category) =>
        set((s) => ({
          tasks: [
            {
              id: crypto.randomUUID(),
              title: title.trim(),
              status: "todo",
              category,
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
    {
      name: "launchpad-tasks",
      version: 2,
      migrate: (state: any) => ({
        ...state,
        tasks: (state?.tasks ?? []).map((t: any) => ({
          category: "Personal",
          ...t,
        })),
      }),
    },
  ),
);
