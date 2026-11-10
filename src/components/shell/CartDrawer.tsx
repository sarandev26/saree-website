"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { ButtonPrimary } from "../ui/ButtonPrimary";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 1999;
  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    // @ts-ignore
    if (typeof window !== "undefined" && window.__lenis) {
      // @ts-ignore
      window.__lenis.scrollTo("#new-arrivals", { offset: -72, duration: 1.2 });
    } else if (typeof document !== "undefined") {
      const el = document.querySelector("#new-arrivals");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[70]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-ivory text-ink shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
              <div className="flex items-center gap-2.5">
                <h3 className="font-sans text-2xl font-bold text-ink">
                  Your Bag
                </h3>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-marigold text-[11px] font-sans font-bold text-ink">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close bag"
              >
                <X className="h-5 w-5 text-charcoal" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3.5 bg-blush/40 border-b border-charcoal/10">
              <div className="flex items-center justify-between text-[12px] font-sans">
                <span className="font-medium text-ink flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-marigold" />
                  {remainingForFreeShipping > 0
                    ? `Add ₹${remainingForFreeShipping.toLocaleString("en-IN")} more for Free Insured Courier`
                    : "You unlocked Free Insured Express Courier across India!"}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-charcoal/10">
                <div
                  style={{ width: `${shippingProgress}%` }}
                  className="h-full bg-marigold transition-all duration-500 rounded-full"
                />
              </div>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="h-28 w-28 rounded-full bg-blush flex items-center justify-center text-marigold mb-5 animate-pulse shadow-sm">
                    <ShoppingBag className="w-16 h-16 text-marigold stroke-[1.8]" />
                  </div>
                  <h4 className="font-sans text-2xl text-ink font-bold">Your bag is empty</h4>
                  <p className="mt-2 text-sm text-charcoal/70 max-w-xs font-sans leading-relaxed">
                    Add a saree you love and it will show up here
                  </p>
                  <button
                    onClick={handleContinueShopping}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-xs font-sans font-bold uppercase tracking-button text-ivory hover:bg-teal transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item, idx) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-3 rounded-[18px] bg-white border border-charcoal/10 shadow-sm"
                    >
                      {/* Image */}
                      <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded-[12px] bg-ivory">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-heading text-lg font-medium text-ink truncate leading-tight">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-charcoal/40 hover:text-clay transition-colors p-1"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] font-sans text-charcoal/60 truncate mt-0.5">
                            {item.product.fabric}
                          </p>
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-charcoal/15 bg-ivory px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-charcoal/70 hover:text-ink cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-sans font-semibold text-ink">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-charcoal/70 hover:text-ink cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-sans font-semibold text-[14px] text-ink">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="px-6 py-5 bg-white border-t border-charcoal/10 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-sans text-charcoal/70">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans text-charcoal/70">
                    <span>Insured Shipping & Packaging</span>
                    <span className="text-teal font-semibold">
                      {remainingForFreeShipping === 0 ? "FREE" : "₹750"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-sans font-bold text-ink pt-2 border-t border-charcoal/10">
                    <span>Estimated Total</span>
                    <span>
                      ₹
                      {(cartTotal + (remainingForFreeShipping === 0 ? 0 : 750)).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-charcoal/60">
                  <ShieldCheck className="w-4 h-4 text-teal" />
                  <span>Silk Mark Certified · Pure 24k Tested Zari</span>
                </div>

                <ButtonPrimary
                  onClick={() => alert("Proceeding to luxury checkout concierge...")}
                  className="w-full justify-between"
                  size="lg"
                >
                  <span>Checkout Now</span>
                </ButtonPrimary>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

