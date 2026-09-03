import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { useCartSync } from "@/hooks/useCartSync";
import heroImage from "@/assets/hero.jpg";
import { ArrowRight, PackageOpen, Package } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Launch Pad — Rebuild. Build. Sell." },
      {
        name: "description",
        content:
          "The technical standards marketplace: certified rebuilt tech, new components, and instant trade-in quotes. Secure Shopify checkout.",
      },
      { property: "og:title", content: "Launch Pad — Rebuild. Build. Sell." },
      {
        property: "og:description",
        content:
          "Certified rebuilt tech, new components, and instant trade-in quotes. Secure checkout powered by Shopify.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useCartSync();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(12),
  });

  const hasProducts = (products?.length ?? 0) > 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 md:py-16">
        {/* Header context */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b pb-6">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase tracking-tighter md:text-5xl">
              Launch <span className="text-primary">Pad</span>
            </h1>
            <p className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              The Technical Standards Marketplace
            </p>
          </div>
          <div className="hidden gap-8 font-display text-sm font-bold tracking-widest md:flex">
            <span className="text-tool">REBUILD</span>
            <span className="text-muted-foreground">/</span>
            <span>BUILD</span>
            <span className="text-muted-foreground">/</span>
            <span>SELL</span>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:h-[600px] md:grid-cols-4 md:grid-rows-2">
          {/* Rebuilt certified — large tile */}
          <a
            href="#products"
            className="group relative block overflow-hidden rounded-2xl bg-card md:col-span-2 md:row-span-2"
          >
            <img
              src={heroImage}
              alt="Certified rebuilt tech on the workshop bench"
              width={1920}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute left-6 top-6">
              <span className="rounded bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-primary-foreground">
                Certified Rebuilt
              </span>
            </div>
            <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8">
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
                Rebuilt Series 04
              </h2>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Factory-grade restoration on legacy workstations and
                peripherals. Guaranteed performance.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                Shop restoration
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-4 border-primary/20 transition-transform duration-700 group-hover:scale-110" />
          </a>

          {/* Build your own stack */}
          <a
            href="#products"
            className="group flex flex-col justify-between rounded-2xl border border-transparent bg-tile p-8 text-tile-foreground transition-all hover:border-tool md:col-span-2"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">
                  Build your
                  <br />
                  own stack
                </h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-current transition-colors group-hover:bg-tile-foreground group-hover:text-tile">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-tile-muted">
                Browse individual components, chassis, and modules to start from
                scratch.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Modules", "Chassis", "Circuitry"].map((chip) => (
                <span
                  key={chip}
                  className="rounded border border-current/30 px-2 py-1 text-[10px] font-medium uppercase tracking-wide"
                >
                  {chip}
                </span>
              ))}
            </div>
          </a>

          {/* Sell gear */}
          <div className="group flex flex-col items-center justify-center rounded-2xl bg-tool p-6 text-center text-tool-foreground">
            <Package className="mb-3 h-8 w-8 transition-transform group-hover:rotate-12" />
            <h3 className="font-display text-xl font-bold uppercase tracking-wide">
              Sell gear
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest opacity-80">
              Instant quote
            </p>
          </div>

          {/* Marketplace */}
          <a
            href="#products"
            className="flex flex-col justify-center rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
              Marketplace
            </p>
            <h3 className="font-display text-lg font-bold">
              User direct listings
            </h3>
            <div className="mt-4 flex items-center -space-x-2">
              <span className="h-6 w-6 rounded-full border border-border bg-muted" />
              <span className="h-6 w-6 rounded-full border border-border bg-accent" />
              <span className="h-6 w-6 rounded-full border border-border bg-secondary" />
              <span className="pl-4 text-[10px] font-bold text-muted-foreground">
                1.2k live
              </span>
            </div>
          </a>
        </div>

        {/* Inventory */}
        <section id="products" className="mt-16 scroll-mt-24">
          <div className="flex items-end justify-between border-b pb-4">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
              The inventory
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Verified units
            </span>
          </div>

          <div className="mt-8">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square rounded-2xl bg-secondary/60" />
                    <div className="mt-4 h-4 w-3/4 rounded bg-secondary/60" />
                    <div className="mt-2 h-4 w-1/3 rounded bg-secondary/60" />
                  </div>
                ))}
              </div>
            ) : hasProducts ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {products!.map((edge) => (
                  <ProductCard key={edge.node.id} product={edge.node} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-24 text-center">
                <PackageOpen className="h-10 w-10 text-muted-foreground" />
                <p className="mt-4 font-display text-xl font-bold uppercase tracking-tight">
                  No stock on the bench
                </p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  The shelves are still being stocked. Tell us what you'd like
                  to sell and we'll add it to the marketplace.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
