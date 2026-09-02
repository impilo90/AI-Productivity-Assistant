import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartSync } from "@/hooks/useCartSync";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Product — Launch Pad" },
      {
        name: "description",
        content: "Product details, pricing and secure checkout at Launch Pad.",
      },
      { property: "og:title", content: "Product — Launch Pad" },
      {
        property: "og:description",
        content: "Product details, pricing and secure checkout at Launch Pad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  useCartSync();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const addItem = useCartStore((state) => state.addItem);
  const isLoadingCart = useCartStore((state) => state.isLoading);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="font-display text-2xl font-semibold">Product not found</p>
          <p className="text-muted-foreground">
            This item may have been removed or renamed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges?.map((e) => e.node) ?? [];
  const variants = product.variants?.edges?.map((e) => e.node) ?? [];
  const selectedVariant =
    variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const price = product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the shop
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="grid gap-4">
            {images[0] && (
              <div className="overflow-hidden rounded-3xl bg-secondary/50">
                <img
                  src={images[0].url}
                  alt={images[0].altText ?? product.title}
                  className="aspect-square w-full object-cover"
                />
              </div>
            )}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl bg-secondary/50"
                  >
                    <img
                      src={img.url}
                      alt={img.altText ?? `${product.title} view ${i + 2}`}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">
              {product.title}
            </h1>
            <p className="mt-3 text-2xl font-semibold">
              {formatPrice(price.amount, price.currencyCode)}
            </p>

            {product.description && (
              <p className="mt-6 whitespace-pre-line leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {/* Variants */}
            {product.options?.some((o) => o.values.length > 1) && (
              <div className="mt-8 space-y-5">
                {product.options
                  .filter((o) => o.values.length > 1)
                  .map((option) => (
                    <div key={option.name}>
                      <p className="mb-2 text-sm font-medium">{option.name}</p>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const matching = variants.find((v) =>
                            v.selectedOptions?.some(
                              (so) =>
                                so.name === option.name && so.value === value
                            )
                          );
                          const isSelected =
                            selectedVariant?.selectedOptions?.some(
                              (so) =>
                                so.name === option.name && so.value === value
                            );
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                matching && setSelectedVariantId(matching.id)
                              }
                              disabled={!matching?.availableForSale}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "hover:bg-accent disabled:opacity-40"
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <Button
                size="lg"
                className="rounded-full px-8"
                onClick={handleAddToCart}
                disabled={
                  isLoadingCart ||
                  !selectedVariant ||
                  !selectedVariant.availableForSale
                }
              >
                {isLoadingCart ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : justAdded ? (
                  "Added to cart ✓"
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to cart
                  </>
                )}
              </Button>
              {selectedVariant && !selectedVariant.availableForSale && (
                <Badge variant="secondary" className="rounded-full">
                  Sold out
                </Badge>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
