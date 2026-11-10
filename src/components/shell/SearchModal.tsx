"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS, Product } from "@/lib/data";

const TRENDING_SEARCHES = [
  "Banarasi Silk",
  "Kanjivaram Korvai",
  "Ivory Organza",
  "Patola Double Ikat",
  "Gold Zari Bridal",
  "Chanderi Cotton",
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [isSearchOpen]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.weave.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl text-ivory"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-ivory/10">
            <span className="font-sans text-[12px] font-semibold tracking-eyebrow uppercase text-marigold">
              MAYURA SEARCH ATELIER
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 hover:border-ivory transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto px-6 md:px-16 py-12 max-w-5xl mx-auto w-full flex flex-col">
            {/* Big Input */}
            <div className="relative border-b-2 border-ivory/20 pb-4 focus-within:border-marigold transition-colors">
              <div className="flex items-center gap-4">
                <Search className="h-8 w-8 text-marigold shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search silk, weave, colour or occasion..."
                  className="w-full bg-transparent font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] text-ivory placeholder-ivory/30 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-ivory/50 hover:text-ivory text-sm uppercase tracking-widest font-sans"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Trending Chips */}
            <div className="mt-8 flex flex-col gap-3">
              <span className="text-[12px] font-sans uppercase tracking-button text-ivory/50">
                Trending Searches:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {TRENDING_SEARCHES.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(chip)}
                    className="rounded-full border border-ivory/20 px-4 py-1.5 text-[12px] font-sans font-medium text-ivory/80 hover:border-marigold hover:text-marigold transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Suggestions Grid */}
            {query.trim() && (
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-sans uppercase tracking-button text-marigold">
                    Found {filteredProducts.length} Drapes
                  </span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-12 text-center text-ivory/60 font-heading text-xl">
                    No sarees found matching &ldquo;{query}&rdquo;. Try &ldquo;Banarasi&rdquo; or &ldquo;Kanjivaram&rdquo;.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        className="group flex items-center gap-4 rounded-[18px] bg-ivory/5 p-3.5 border border-ivory/10 hover:border-marigold/50 transition-colors"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[12px] bg-ink">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading text-lg font-medium text-ivory truncate group-hover:text-marigold transition-colors">
                            {p.name}
                          </h4>
                          <p className="font-sans text-[12px] text-ivory/60 truncate">
                            {p.fabric}
                          </p>
                          <span className="mt-1 inline-block font-sans text-[13px] font-semibold text-marigold">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            addToCart(p, 1);
                            setIsSearchOpen(false);
                          }}
                          className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-marigold text-ink hover:scale-105 transition-transform cursor-pointer"
                          aria-label={`Add ${p.name} to bag`}
                        >
                          <ArrowUpRight className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

