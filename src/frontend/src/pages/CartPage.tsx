import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  function handleRemove(productId: string, name: string) {
    removeItem(productId);
    toast.success(`${name} removed from cart`, { duration: 2000 });
  }

  if (items.length === 0) {
    return (
      <div
        className="container max-w-2xl mx-auto px-4 py-24 text-center"
        data-ocid="cart-empty"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-2 text-lg">
            🎆 No fireworks added yet!
          </p>
          <p className="text-muted-foreground mb-8">
            Light up your Diwali — browse our collection of rockets, sparklers,
            flower pots, and aerial shots.
          </p>
          <Link to="/" search={{ q: "", category: "all" }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 font-semibold"
              data-ocid="cart-browse-cta"
            >
              Browse Fireworks
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const shipping = totalPrice >= 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/"
          search={{ q: "", category: "all" }}
          className="text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="cart-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Your Cart
          <span className="text-muted-foreground font-body font-normal text-base ml-2">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        {/* Cart Items */}
        <div className="space-y-4" data-ocid="cart-items">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="bg-card rounded-xl border border-border/50 shadow-warm-sm p-4"
                data-ocid={`cart-item-${item.product.id}`}
              >
                <div className="flex gap-4">
                  <Link
                    to="/products/$id"
                    params={{ id: item.product.id }}
                    className="shrink-0"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-muted"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to="/products/$id"
                          params={{ id: item.product.id }}
                        >
                          <h3 className="font-display font-bold text-foreground text-sm leading-tight hover:text-primary transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 font-medium capitalize"
                          >
                            {item.product.category}
                          </Badge>
                          {item.product.packSize && (
                            <span className="text-xs text-muted-foreground">
                              {item.product.packSize}
                            </span>
                          )}
                        </div>
                        {item.product.effectDuration && (
                          <p className="text-xs text-accent mt-0.5 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {item.product.effectDuration}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(item.product.id, item.product.name)
                        }
                        className="shrink-0 p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                        aria-label={`Remove ${item.product.name}`}
                        data-ocid={`remove-item-${item.product.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                        <button
                          type="button"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          data-ocid={`qty-decrease-${item.product.id}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className="w-8 text-center text-sm font-semibold text-foreground"
                          data-ocid={`qty-value-${item.product.id}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          data-ocid={`qty-increase-${item.product.id}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <div className="font-display font-bold text-foreground">
                          ₹{(item.product.price * item.quantity).toFixed(0)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[11px] text-muted-foreground">
                            ₹{item.product.price.toFixed(0)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clear cart */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              data-ocid="cart-clear"
            >
              Clear all items
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-card rounded-xl border border-border/50 shadow-warm-sm p-6 sticky top-24"
          data-ocid="order-summary"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-5">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
              <span className="text-foreground font-medium">
                ₹{totalPrice.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span
                className={
                  shipping === 0
                    ? "text-accent font-medium"
                    : "text-foreground font-medium"
                }
              >
                {shipping === 0 ? "Free!" : `₹${shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST (5%)</span>
              <span className="text-foreground font-medium">₹{tax}</span>
            </div>
          </div>

          {shipping > 0 && (
            <p className="text-xs text-accent bg-accent/10 rounded-lg px-3 py-2 mt-3">
              Add ₹{(999 - totalPrice).toFixed(0)} more for free delivery!
            </p>
          )}

          {/* Festive delivery note */}
          <div className="flex items-start gap-2 bg-primary/8 border border-primary/20 rounded-lg px-3 py-2.5 mt-4">
            <Truck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-foreground/80 leading-relaxed">
              🎇 Festive delivery guaranteed before Diwali. Orders dispatched
              within 2 business days.
            </p>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-display font-bold text-foreground text-lg mb-5">
            <span>Order Total</span>
            <span>₹{orderTotal.toFixed(0)}</span>
          </div>

          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-smooth"
            data-ocid="checkout-cta"
            disabled
            onClick={() =>
              toast.info("Checkout coming soon — stay tuned! 🎆", {
                duration: 4000,
              })
            }
          >
            Proceed to Checkout
          </Button>

          <Link
            to="/"
            search={{ q: "", category: "all" }}
            className="block mt-3"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-xl border-border transition-smooth"
              data-ocid="continue-shopping"
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
