"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS } from "@/lib/data";

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
  } = useCart();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[70]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />

          {/* Drawer */}
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
                <Heart className="h-5 w-5 fill-clay text-clay" />
                <h3 className="font-heading text-2xl font-semibold text-ink">
                  Saved Heirlooms
                </h3>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clay text-[11px] font-sans font-bold text-ivory">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close wishlist"
              >
                <X className="h-5 w-5 text-charcoal" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {wishlistProducts.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                  <div className="h-16 w-16 rounded-full bg-clay/10 flex items-center justify-center text-clay mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-2xl text-ink font-medium">No Saved Sarees Yet</h4>
                  <p className="mt-2 text-sm text-charcoal/60 max-w-xs font-sans">
                    Tap the heart on any saree to save it to your personal curation.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex gap-4 p-3 rounded-[18px] bg-white border border-charcoal/10 shadow-sm"
                    >
                      <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded-[12px] bg-ivory">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-heading text-lg font-medium text-ink truncate">
                              {p.name}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(p.id, p)}
                              className="text-charcoal/40 hover:text-clay p-1"
                              aria-label={`Remove ${p.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] font-sans text-charcoal/60 truncate">
                            {p.fabric}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-sans font-semibold text-[14px] text-ink">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={() => {
                              addToCart(p, 1);
                              toggleWishlist(p.id);
                            }}
                            className="flex items-center gap-1.5 rounded-full bg-marigold px-3 py-1.5 text-[11px] font-sans font-semibold uppercase tracking-wider text-ink hover:bg-ink hover:text-ivory transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

