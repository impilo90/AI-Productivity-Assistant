import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { useCartSync } from "@/hooks/useCartSync";
import heroImage from "@/assets/hero.jpg";
import { ArrowRight, PackageOpen } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Launch Pad — Thoughtful Goods, Ready for Liftoff" },
      {
        name: "description",
        content:
          "Shop curated, well-made goods at Launch Pad. Free-flowing cart, secure Shopify checkout.",
      },
      { property: "og:title", content: "Launch Pad — Thoughtful Goods, Ready for Liftoff" },
      {
        property: "og:description",
        content: "Shop curated, well-made goods at Launch Pad. Secure checkout powered by Shopify.",
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

      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              New season, new gear
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Everything you need,
              <br />
              ready for liftoff.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Launch Pad is a curated shop for well-made, everyday goods.
              Add to cart, check out securely — done.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src={heroImage}
              alt="Warm studio scene with curated goods on terracotta plinths"
              width={1920}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            The collection
          </h2>
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
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-24 text-center">
              <PackageOpen className="h-10 w-10 text-muted-foreground" />
              <p className="mt-4 font-display text-xl font-semibold">
                No products found
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                The shelves are still being stocked. Tell us what you'd like to
                sell and we'll add it to the store.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
