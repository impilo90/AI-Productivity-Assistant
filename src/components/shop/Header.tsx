import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useTheme } from "@/hooks/useTheme";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            L
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-tighter">
            Launch <span className="text-primary">Pad</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:block"
          >
            Shop
          </Link>
          <Link
            to="/tasks"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Tasks
          </Link>

          <ThemeToggle />
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
}
