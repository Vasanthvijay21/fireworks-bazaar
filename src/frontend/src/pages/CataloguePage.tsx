import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  Flame,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { categories, products } from "../data/products";
import type { Category, Product } from "../types/product";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

const categoryDisplayMap: Record<Category | "all", string> = {
  all: "All Fireworks",
  Sparklers: "Sparklers",
  Rockets: "Rockets",
  FlowerPots: "Flower Pots",
  GroundChakkar: "Ground Chakkar",
  AerialShots: "Aerial Shots",
  Bombs: "Bombs",
  Novelty: "Novelty",
};

const categoryIcons: Partial<Record<Category, React.ReactNode>> = {
  AerialShots: <Flame className="w-3.5 h-3.5" />,
  Rockets: <Sparkles className="w-3.5 h-3.5" />,
  Bombs: <Zap className="w-3.5 h-3.5" />,
};

const badgeColors: Record<string, string> = {
  "Family Favorite": "bg-accent/20 text-accent border border-accent/40",
  "Best Seller": "bg-accent/20 text-accent border border-accent/40",
  "Crowd Pleaser": "bg-primary/15 text-primary border border-primary/30",
  "New Arrival": "bg-secondary text-secondary-foreground border border-border",
  Traditional: "bg-primary/15 text-primary border border-primary/30",
  Premium: "bg-accent/20 text-accent border border-accent/40",
  Classic: "bg-muted text-foreground border border-border",
  Professional: "bg-primary/15 text-primary border border-primary/30",
  "Grand Finale": "bg-accent/20 text-accent border border-accent/40",
  "Limited Stock": "bg-muted text-foreground border border-border",
  "Puja Special": "bg-secondary text-secondary-foreground border border-border",
  "Photo Worthy": "bg-accent/20 text-accent border border-accent/40",
};

function SafetyStars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Safety rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => `star-${i}`).map((key, i) => (
        <Star
          key={key}
          className={`w-3 h-3 ${i < rating ? "fill-accent text-accent" : "text-border fill-border"}`}
        />
      ))}
      <span className="text-[10px] text-muted-foreground ml-1 font-medium">
        Safety
      </span>
    </div>
  );
}

function SafetyWarning({ minAge }: { minAge: number }) {
  if (minAge <= 5) return null;
  return (
    <div className="flex items-center gap-1 text-[10px] font-semibold text-destructive/80">
      <AlertTriangle className="w-3 h-3" />
      <span>Age {minAge}+</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`, { duration: 2500 });
  }

  const catDisplay = categoryDisplayMap[product.category] ?? product.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group"
    >
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block"
        data-ocid={`product-card-${product.id}`}
      >
        <div className="bg-card rounded-xl overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 flex flex-col h-full">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
              loading="lazy"
            />
            {product.badge && (
              <span
                className={`absolute top-3 left-3 text-[10px] font-body font-bold uppercase tracking-wider px-2 py-1 rounded-md ${badgeColors[product.badge] ?? "bg-accent/20 text-accent"}`}
              >
                {product.badge}
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground bg-card px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            {/* Category */}
            <div className="flex items-center gap-1 mb-1">
              {product.category in categoryIcons && (
                <span className="text-accent">
                  {categoryIcons[product.category]}
                </span>
              )}
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                {catDisplay}
              </span>
            </div>

            <h3 className="font-display font-bold text-foreground leading-tight text-base mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-snug flex-1">
              {product.description}
            </p>

            {/* Safety row */}
            <div className="flex items-center justify-between mb-3">
              <SafetyStars rating={product.safetyRating} />
              <SafetyWarning minAge={product.minAge} />
            </div>

            {/* Pack size + price */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-bold text-foreground text-lg">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / {product.packSize}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  ⏱ {product.effectDuration}
                </div>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg shrink-0 transition-smooth"
                onClick={handleAdd}
                disabled={!product.inStock}
                data-ocid={`add-to-cart-${product.id}`}
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CataloguePage() {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [activeCategory, setActiveCategory] = useState<string>(
    search.category || "all",
  );
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.q) {
      const q = search.q.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    const sorted = [...result];
    if (sortOption === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-desc")
      sorted.sort((a, b) => b.price - a.price);
    else if (sortOption === "name-asc")
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [activeCategory, search.q, sortOption]);

  function handleCategory(cat: string) {
    setActiveCategory(cat);
    navigate({ search: { q: search.q || "", category: cat } });
  }

  const activeCatLabel =
    categoryDisplayMap[activeCategory as Category | "all"] ?? activeCategory;

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border overflow-hidden">
        {/* Decorative sparkle dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            "top-6 left-[10%]",
            "top-12 right-[15%]",
            "bottom-8 left-[25%]",
            "top-4 right-[40%]",
            "bottom-4 right-[8%]",
          ].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} w-1.5 h-1.5 bg-accent/40 rounded-full`}
            />
          ))}
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-accent/15 text-accent border-accent/30 mb-4 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 mr-1 fill-accent" />
                Diwali 2024 Collection
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Light Up Your
                <br />
                <span className="text-primary">Diwali Night</span>
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md mb-2">
                Celebrate the festival of lights with our premium range of
                fireworks — sparklers, rockets, aerial shells, and more.
                Safety-certified and festive-grade.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive/70 shrink-0" />
                <span>
                  Use fireworks responsibly. Always follow safety guidelines and
                  age recommendations.
                </span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-6 transition-smooth glow-festive-sm"
                  onClick={() =>
                    document
                      .getElementById("catalogue")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-ocid="hero-shop-cta"
                >
                  <Flame className="w-4 h-4 mr-1.5" />
                  Shop All Fireworks
                </Button>
                <Button
                  variant="outline"
                  className="border-border font-semibold rounded-lg px-6 transition-smooth"
                  onClick={() => handleCategory("Sparklers")}
                  data-ocid="hero-sparklers-cta"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Explore Sparklers
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden md:block"
            >
              <img
                src="/assets/generated/hero-diwali-fireworks.dim_1200x600.jpg"
                alt="Diwali fireworks celebration"
                className="w-full rounded-2xl shadow-warm-lg object-cover aspect-[16/9]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section
        className="bg-card border-b border-border sticky top-16 z-30"
        id="catalogue"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground border-primary shadow-warm-sm"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
                data-ocid={`filter-${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
            {search.q && (
              <span className="shrink-0 text-sm text-muted-foreground ml-2">
                Results for{" "}
                <strong className="text-foreground">"{search.q}"</strong>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24" data-ocid="catalogue-empty">
            <div className="text-5xl mb-4">🎆</div>
            <h2 className="font-display text-2xl font-bold mb-2 text-foreground">
              No fireworks found
            </h2>
            <p className="text-muted-foreground mb-6">
              Try a different search or browse all categories.
            </p>
            <Button
              onClick={() => {
                setActiveCategory("all");
                navigate({ search: { q: "", category: "all" } });
              }}
              data-ocid="empty-browse-all"
            >
              Browse All Fireworks
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <h2 className="font-display text-xl font-bold text-foreground">
                {activeCatLabel}
                <span className="text-muted-foreground font-body font-normal text-sm ml-2">
                  ({filtered.length} items)
                </span>
              </h2>
              <Select
                value={sortOption}
                onValueChange={(v) => setSortOption(v as SortOption)}
              >
                <SelectTrigger
                  className="w-48 text-sm"
                  data-ocid="sort-dropdown"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              data-ocid="product-grid"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Trust / Safety section */}
      <section className="bg-muted/30 border-t border-border py-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: "🎇",
                title: "Safety Certified",
                desc: "All products meet BIS & PESO safety standards",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Delivered before Diwali, guaranteed",
              },
              {
                icon: "🏷️",
                title: "Best Prices",
                desc: "Factory-direct pricing, no middlemen",
              },
              {
                icon: "⭐",
                title: "5-Star Ratings",
                desc: "Trusted by 10,000+ families every year",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="text-3xl">{item.icon}</div>
                <p className="font-display font-semibold text-sm text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety advisory banner */}
      <section className="bg-destructive/8 border-t border-destructive/20 py-5">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive/80 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm text-foreground mb-0.5">
                Fireworks Safety Advisory
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Always read the instructions on each product. Keep children
                under 12 away from high-intensity fireworks. Never hold lit
                fireworks in your hand. Use in open spaces away from buildings
                and trees. Keep a bucket of water nearby at all times.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
