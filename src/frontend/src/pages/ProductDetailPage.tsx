import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Package,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { categories, products } from "../data/products";

const categoryLabel = (cat: string): string =>
  categories.find((c) => c.value === cat)?.label ?? cat;

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Safety rating: ${rating} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => `star-${i}`).map((key, i) => (
        <Star
          key={key}
          className={`w-4 h-4 ${i < rating ? "fill-accent text-accent" : "fill-muted text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

const SAFETY_TIPS: Record<number, { label: string; tips: string[] }> = {
  1: {
    label: "Extreme Caution",
    tips: [
      "Only trained adults (18+) should handle this product",
      "Maintain a minimum 50-metre clearance radius",
      "Never hold in hand — use a launch tube or stake",
      "Keep a bucket of water and fire extinguisher nearby",
      "Check local regulations before use — permit may be required",
    ],
  },
  2: {
    label: "High Caution",
    tips: [
      "Adults only (18+) — no exceptions",
      "Light fuse and immediately retreat 15 metres",
      "Never re-light a dud fuse — soak in water and discard",
      "Use in an open, outdoor area away from crowds",
      "Keep children and pets indoors during use",
    ],
  },
  3: {
    label: "Moderate Caution",
    tips: [
      "Adult supervision required at all times",
      "Place on flat, non-flammable ground surface",
      "Stand at least 5 metres away after lighting",
      "Never hold in hand or point at people",
      "Store away from heat and moisture before use",
    ],
  },
  4: {
    label: "Family Friendly",
    tips: [
      "Supervise children at all times",
      "Keep young children (under 6) away from the lighting area",
      "Use in an open outdoor area",
      "Dispose safely — douse used items with water",
    ],
  },
  5: {
    label: "Very Safe",
    tips: [
      "Safe for children with adult supervision",
      "Hold at arm's length while lit — never point at face",
      "Do not hold near clothing or hair",
      "Let used sparklers cool on the ground before touching",
    ],
  },
};

const CATEGORY_EFFECTS: Record<string, string> = {
  Sparklers:
    "Emits a shower of bright sparks and glittering stars as it burns. Creates magical light trails when waved in the air — perfect for photos and festive moments.",
  Rockets:
    "Launches into the sky with a whistling ascent before detonating in a brilliant aerial burst of stars, comets, and crackling effects.",
  FlowerPots:
    "A ground-based fountain of sparks that erupts upward in a flower-like plume of colors. Produces a rich, sustained visual display.",
  GroundChakkar:
    "Spins rapidly on the ground, emitting colorful sparks in a circular wheel pattern. Builds speed before a final burst of light.",
  AerialShots:
    "Launches high-altitude bursts creating large, symmetrical patterns of stars and effects visible from a wide area.",
  Bombs:
    "Produces a sharp, satisfying report (bang) with a flash on detonation. Primarily an auditory effect — the classic Diwali sound.",
  Novelty:
    "A mixed display product combining multiple effects — smoke, sparks, whistles, or confetti — for a varied festive experience.",
};

export function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);
  const related = products
    .filter((p) => p.id !== id && p.category === product?.category)
    .slice(0, 3);

  if (!product) {
    return (
      <div
        className="container max-w-7xl mx-auto px-4 py-24 text-center"
        data-ocid="product-not-found"
      >
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-display text-2xl font-bold mb-2">
          Product not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This item may have sold out or been removed from our catalogue.
        </p>
        <Link to="/" search={{ q: "", category: "all" }}>
          <Button data-ocid="back-to-catalogue">Back to Catalogue</Button>
        </Link>
      </div>
    );
  }

  const safetyInfo = SAFETY_TIPS[product.safetyRating] ?? SAFETY_TIPS[3];
  const categoryEffect =
    CATEGORY_EFFECTS[product.category] ??
    "This product creates a visual display effect when ignited.";
  const isHighRisk = product.minAge >= 18;

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product!);
    toast.success(`${qty}× ${product!.name} added to cart`, { duration: 2500 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            to="/"
            search={{ q: "", category: "all" }}
            className="hover:text-foreground transition-colors"
            data-ocid="product-back"
          >
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Catalogue
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">
            {categoryLabel(product.category)}
          </span>
          <span>/</span>
          <span className="text-foreground font-medium truncate">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main product section */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-warm-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* In stock / Out of stock ribbon */}
            <div
              className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                product.inStock
                  ? "bg-green-600/90 text-white"
                  : "bg-destructive/90 text-destructive-foreground"
              }`}
              data-ocid="product-stock-badge"
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Age badge overlay */}
            <div
              className={`absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold shadow-warm-md ${
                isHighRisk
                  ? "bg-destructive text-destructive-foreground"
                  : product.minAge >= 12
                    ? "bg-amber-500 text-white"
                    : "bg-green-600 text-white"
              }`}
              data-ocid="product-age-badge"
            >
              <Users className="w-4 h-4" />
              {product.minAge}+ Only
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category */}
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="text-xs font-semibold uppercase tracking-wide"
              >
                {categoryLabel(product.category)}
              </Badge>
              {product.badge && (
                <Badge className="text-xs font-semibold bg-accent text-accent-foreground">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Name */}
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
              {product.name}
            </h1>

            {/* Safety rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.safetyRating} />
              <span className="text-sm font-medium text-foreground">
                {safetyInfo.label}
              </span>
              <span className="text-muted-foreground text-xs">
                ({product.safetyRating}/5 safety)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-5">
              <span className="font-display text-4xl font-bold text-foreground">
                ₹{product.price.toFixed(0)}
              </span>
              <span className="text-muted-foreground text-sm">
                / {product.packSize}
              </span>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/50">
                <Timer className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground mb-0.5">Duration</p>
                <p className="text-xs font-semibold text-foreground leading-tight">
                  {product.effectDuration}
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 text-center border border-border/50">
                <Package className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground mb-0.5">
                  Pack Size
                </p>
                <p className="text-xs font-semibold text-foreground leading-tight">
                  {product.packSize}
                </p>
              </div>
              <div
                className={`rounded-xl p-3 text-center border ${
                  isHighRisk
                    ? "bg-destructive/10 border-destructive/30"
                    : "bg-muted/50 border-border/50"
                }`}
              >
                <ShieldAlert
                  className={`w-4 h-4 mx-auto mb-1 ${isHighRisk ? "text-destructive" : "text-accent"}`}
                />
                <p className="text-xs text-muted-foreground mb-0.5">Min Age</p>
                <p
                  className={`text-xs font-bold leading-tight ${isHighRisk ? "text-destructive" : "text-foreground"}`}
                >
                  {product.minAge}+
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Quantity + Add to Cart */}
            <div
              className="flex items-center gap-3 mb-5"
              data-ocid="product-cart-controls"
            >
              {/* Qty selector */}
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="px-3 py-2.5 text-foreground hover:bg-muted transition-colors text-lg font-bold disabled:opacity-40"
                  disabled={qty <= 1}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  data-ocid="product-qty-decrease"
                >
                  −
                </button>
                <span
                  className="px-4 py-2.5 font-semibold text-foreground text-sm min-w-[2.5rem] text-center"
                  data-ocid="product-qty-value"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="px-3 py-2.5 text-foreground hover:bg-muted transition-colors text-lg font-bold"
                  onClick={() => setQty((q) => q + 1)}
                  data-ocid="product-qty-increase"
                >
                  +
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-smooth text-base"
                onClick={handleAdd}
                disabled={!product.inStock || added}
                data-ocid="product-add-to-cart"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </Button>
            </div>

            <Link to="/cart" className="mb-8">
              <Button
                variant="outline"
                className="w-full rounded-xl border-border transition-smooth"
                data-ocid="product-view-cart"
              >
                View Cart
              </Button>
            </Link>

            {/* Age / stock strip */}
            <div className="flex flex-wrap gap-2">
              {isHighRisk ? (
                <Badge variant="destructive" className="text-xs gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  Adults Only (18+)
                </Badge>
              ) : (
                <Badge className="text-xs gap-1 bg-green-600 text-white hover:bg-green-600">
                  <ShieldCheck className="w-3 h-3" />
                  {product.minAge}+ Suitable
                </Badge>
              )}
              {product.safetyRating >= 4 && (
                <Badge
                  variant="secondary"
                  className="text-xs gap-1 border-accent/30 text-accent"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Family Safe
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Effect description */}
      <section className="bg-muted/30 border-y border-border py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visual effect */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-warm-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-accent" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  Visual Effect
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {categoryEffect}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-muted/60 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Effect Duration
                  </p>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5 text-accent" />
                    {product.effectDuration}
                  </p>
                </div>
                <div className="bg-muted/60 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Safety Rating
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <StarRating rating={product.safetyRating} max={5} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Safety warnings panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`rounded-2xl p-6 border shadow-warm-sm ${
                isHighRisk
                  ? "bg-destructive/10 border-destructive/40"
                  : "bg-amber-950/80 border-amber-700/50"
              }`}
              data-ocid="product-safety-panel"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle
                  className={`w-5 h-5 ${isHighRisk ? "text-destructive" : "text-amber-400"}`}
                />
                <h2
                  className={`font-display text-lg font-bold ${
                    isHighRisk ? "text-destructive" : "text-amber-200"
                  }`}
                >
                  Safety Warnings
                </h2>
                <span
                  className={`ml-auto text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isHighRisk
                      ? "bg-destructive/20 text-destructive"
                      : "bg-amber-700/50 text-amber-300"
                  }`}
                >
                  {safetyInfo.label}
                </span>
              </div>

              <ul className="space-y-2" aria-label="Safety instructions">
                {safetyInfo.tips.map((tip) => (
                  <li
                    key={tip}
                    className={`flex items-start gap-2 text-sm ${
                      isHighRisk ? "text-destructive/90" : "text-amber-100/90"
                    }`}
                  >
                    <Zap
                      className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                        isHighRisk ? "text-destructive" : "text-amber-400"
                      }`}
                    />
                    {tip}
                  </li>
                ))}
              </ul>

              <p
                className={`mt-4 text-xs leading-relaxed ${
                  isHighRisk ? "text-destructive/70" : "text-amber-300/70"
                }`}
              >
                Always follow the manufacturer's instructions. Misuse of
                fireworks is illegal and dangerous. Keep a fire extinguisher or
                bucket of water close at hand.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-background py-10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              More {categoryLabel(product.category)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                >
                  <Link
                    to="/products/$id"
                    params={{ id: p.id }}
                    className="block group"
                    data-ocid={`related-product-${p.id}`}
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5 border border-border/50">
                      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                          loading="lazy"
                        />
                        {!p.inStock && (
                          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider bg-card/80 px-3 py-1 rounded-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-display font-bold text-sm text-foreground line-clamp-1 mb-1">
                          {p.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-body font-bold text-foreground text-sm">
                            ₹{p.price.toFixed(0)}
                          </p>
                          {p.minAge >= 18 && (
                            <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                              18+
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer back link */}
      <div className="bg-muted/40 border-t border-border py-6">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            to="/"
            search={{ q: "", category: "all" }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="product-back-bottom"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Full Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
