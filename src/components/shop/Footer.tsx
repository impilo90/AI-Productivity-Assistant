export function Footer() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <p className="font-display text-sm font-semibold">
          Launch Pad — goods for the climb
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Launch Pad. Checkout powered by Shopify.
        </p>
      </div>
    </footer>
  );
}
