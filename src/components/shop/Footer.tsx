export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-primary">
            Documentation
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            Certification standards
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            Shipping hub
          </a>
        </div>
        <p>© {new Date().getFullYear()} Launch Pad Integrated Tech</p>
      </div>
    </footer>
  );
}
