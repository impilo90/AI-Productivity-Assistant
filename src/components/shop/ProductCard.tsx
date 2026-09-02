import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const [justAdded, setJustAdded] = useState(false);

  const image = product.images?.edges?.[0]?.node;
  const variant = product.variants?.edges?.[0]?.node;
  const price = product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className="group flex flex-col">
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        className="relative block overflow-hidden rounded-2xl bg-secondary/50 aspect-square"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
        {!variant?.availableForSale && (
          <Badge className="absolute top-3 left-3 rounded-full bg-foreground/80 text-background border-0">
            Sold out
          </Badge>
        )}
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-medium leading-snug">
            <Link
              to="/product/$handle"
              params={{ handle: product.handle }}
              className="hover:underline underline-offset-4"
            >
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
        <Button
          size="icon"
          aria-label={`Add ${product.title} to cart`}
          className="rounded-full shrink-0"
          onClick={handleAddToCart}
          disabled={isLoading || !variant || !variant.availableForSale}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : justAdded ? (
            <span className="text-xs font-bold">✓</span>
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </article>
  );
}
