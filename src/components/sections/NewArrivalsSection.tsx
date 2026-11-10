"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "../ui/ProductCard";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { SectionHeading } from "../ui/SectionHeading";
import { WavyDivider } from "../ui/WavyDivider";

export const NewArrivalsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"new" | "bestseller">("new");

  // New Arrivals: Products 01-08; Best Sellers: Products 09-16
  const displayedProducts =
    activeTab === "new" ? PRODUCTS.slice(0, 8) : PRODUCTS.slice(8, 16);

  return (
    <section
      id="new-arrivals"
      data-nav-theme="light"
      className="relative w-full bg-ivory text-ink py-20 md:py-32 select-none overflow-hidden"
    >
      {/* Top Wavy Divider matching Ivory from Ink */}
      <div className="absolute top-0 left-0 right-0 h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#FBF6EC" variant={1} />
      </div>

      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="ATELIER CURATION"
          titleLines={["NEW", "ARRIVALS"]}
          accentWord="Collection"
          align="center"
          isDisplay={true}
          className="mb-8"
        />

        {/* Tabs with Framer Motion layoutId animated underline - Fully Responsive */}
        <div className="flex items-center gap-1.5 sm:gap-3 p-1 rounded-full bg-charcoal/5 border border-charcoal/10 mb-10 sm:mb-14 max-w-full overflow-hidden">
          <button
            onClick={() => setActiveTab("new")}
            className="relative px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-button transition-colors cursor-pointer"
          >
            {activeTab === "new" && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-ink rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                activeTab === "new" ? "text-ivory" : "text-charcoal/70 hover:text-ink"
              }`}
            >
              <span className="sm:hidden">New Arrivals</span>
              <span className="hidden sm:inline">New Arrivals (01–08)</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("bestseller")}
            className="relative px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-button transition-colors cursor-pointer"
          >
            {activeTab === "bestseller" && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-ink rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                activeTab === "bestseller" ? "text-ivory" : "text-charcoal/70 hover:text-ink"
              }`}
            >
              <span className="sm:hidden">Best Sellers</span>
              <span className="hidden sm:inline">Best Sellers (09–16)</span>
            </span>
          </button>
        </div>

        {/* 4-column product grid (2 on mobile) with AnimatePresence staggered fade */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {displayedProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.45, ease: "easeOut" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View all sarees button */}
        <div className="mt-16">
          <ButtonPrimary
            onClick={() => alert("Loading full archive of 240+ handloom sarees...")}
            size="lg"
          >
            View all sarees
          </ButtonPrimary>
        </div>
      </div>
    </section>
  );
};
