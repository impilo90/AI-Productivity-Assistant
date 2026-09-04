import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useTaskStore,
  TASK_CATEGORIES,
  type TaskCategory,
  type TaskStatus,
} from "@/stores/taskStore";
import { Check, Circle, Loader, X } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
  head: () => ({
    meta: [
      { title: "Tasks — Rebuild, Build and Sell Studio Board" },
      {
        name: "description",
        content:
          "A minimal task board for running Rebuild, Build and Sell: capture work, move it through doing, and mark it done.",
      },
      { property: "og:title", content: "Tasks — Rebuild, Build and Sell Studio Board" },
      {
        property: "og:description",
        content:
          "A minimal task board for running Rebuild, Build and Sell: capture work, move it through doing, and mark it done.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const FILTERS: { key: TaskStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "todo", label: "To do" },
  { key: "doing", label: "Doing" },
  { key: "done", label: "Done" },
];

function TasksPage() {
  const { tasks, addTask, setStatus, removeTask, clearDone } = useTaskStore();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Personal");
  const [filter, setFilter] = useState<TaskStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">(
    "all",
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const visible = hydrated
    ? tasks.filter(
        (t) =>
          (filter === "all" || t.status === filter) &&
          (categoryFilter === "all" || t.category === categoryFilter),
      )
    : [];
  const open = tasks.filter((t) => t.status !== "done").length;

  const next = (s: TaskStatus): TaskStatus =>
    s === "todo" ? "doing" : s === "doing" ? "done" : "todo";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 sm:px-6">
        <header className="mb-10">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Tasks
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {hydrated ? `${open} open` : "\u00a0"}
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            addTask(title, category);
            setTitle("");
          }}
          className="flex gap-2"
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs doing?"
            aria-label="New task"
            className="h-11 rounded-full border-border/70 bg-transparent px-5"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            aria-label="Task category"
            className="h-11 rounded-full border border-border/70 bg-transparent px-4 text-sm text-foreground"
          >
            {TASK_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Button type="submit" className="h-11 rounded-full px-6">
            Add
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(["all", ...TASK_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                categoryFilter === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c === "all" ? "All categories" : c}
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-b pb-3">
          <div className="flex gap-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={clearDone}
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Clear done
          </button>
        </div>

        <ul className="mt-2 space-y-2">
          {visible.map((t) => (
            <li
              key={t.id}
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setStatus(t.id, next(t.status))}
                aria-label={`Mark task as ${next(t.status)}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.status === "done" ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : t.status === "doing" ? (
                  <Loader className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>
              <span
                className={`flex-1 text-sm ${
                  t.status === "done"
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {t.title}
              </span>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
                {t.category}
              </span>
              <button
                onClick={() => removeTask(t.id)}
                aria-label="Delete task"
                className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        {hydrated && visible.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Nothing here yet.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
