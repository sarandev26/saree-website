"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TRENDING_NOW_CARDS, SEASONAL_PICKS_CARDS, TrendCardItem } from "@/lib/data";
import { WavyDivider } from "../ui/WavyDivider";
import { useCart } from "@/lib/cart-context";
import { Plus, Check, Eye } from "lucide-react";
import clsx from "clsx";

export const TrendsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"trending" | "seasonal">("trending");
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const cards = activeTab === "trending" ? TRENDING_NOW_CARDS : SEASONAL_PICKS_CARDS;

  const handleCardAdd = (item: TrendCardItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      subtitle: item.fabric,
      fabric: item.fabric,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      altImage: item.image,
      colors: ["#E8A317", "#062C30"],
      description: item.fabric,
      weave: "Handloom Curated Edit",
      care: "Dry Clean Only",
      category: "new",
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section
      id="todays-edit"
      data-nav-theme="dark"
      className="relative w-full bg-ink text-ivory py-20 md:py-32 select-none overflow-hidden"
    >
      {/* Top Wavy Divider matching Ink from Deep Teal */}
      <div className="absolute top-0 left-0 right-0 h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#062C30" variant={1} />
      </div>

      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 pt-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block h-[1px] w-8 bg-marigold" />
              <span className="font-sans text-[12px] font-semibold tracking-eyebrow uppercase text-marigold">
                DAILY ATELIER CURATION
              </span>
            </div>
            <h2 className="font-display uppercase text-[clamp(2.5rem,6vw,5.5rem)] tracking-tightest leading-[0.9] text-ivory">
              TODAY&apos;S{" "}
              <span className="font-heading italic font-normal text-marigold lowercase capitalize">
                Edit
              </span>
            </h2>
          </div>

          {/* 2 Tabs: Trending Now / Seasonal Picks (Underline style) */}
          <div className="flex items-center gap-8 border-b border-ivory/20 pb-2">
            <button
              onClick={() => setActiveTab("trending")}
              className="relative py-2 text-sm sm:text-base font-sans font-semibold uppercase tracking-button transition-colors cursor-pointer"
            >
              <span className={activeTab === "trending" ? "text-marigold" : "text-ivory/60 hover:text-ivory"}>
                Trending Now
              </span>
              {activeTab === "trending" && (
                <motion.div
                  layoutId="todaysEditTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-marigold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("seasonal")}
              className="relative py-2 text-sm sm:text-base font-sans font-semibold uppercase tracking-button transition-colors cursor-pointer"
            >
              <span className={activeTab === "seasonal" ? "text-marigold" : "text-ivory/60 hover:text-ivory"}>
                Seasonal Picks
              </span>
              {activeTab === "seasonal" && (
                <motion.div
                  layoutId="todaysEditTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-marigold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* 4 Large Product Cards on a 4-Column Grid (2 on mobile) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {cards.map((item, index) => {
              const isAdded = addedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="group relative flex flex-col rounded-[24px] bg-ivory/5 border border-ivory/15 p-3.5 hover:border-marigold/60 transition-all duration-300 shadow-soft"
                >
                  {/* Fixed Aspect 4:5 Image Frame with soft blush background */}
                  <div className="relative aspect-[4/5] w-full rounded-[18px] overflow-hidden bg-[#FAF7F2]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount Chip in Clay */}
                    <span className="absolute top-3 left-3 rounded-full bg-clay px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-ivory shadow-sm">
                      {item.discount}
                    </span>

                    {/* In-Card Hover View Pill */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="inline-flex items-center gap-1 rounded-full bg-ink/80 text-ivory px-2.5 py-1 text-[10px] font-sans font-semibold tracking-wider uppercase">
                        <Eye className="w-3 h-3 text-marigold" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content in Satoshi font */}
                  <div className="mt-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-sans text-[1.05rem] font-semibold text-ivory leading-snug line-clamp-1 group-hover:text-marigold transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs font-sans text-ivory/60 truncate">
                        {item.fabric}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1.5 sm:gap-2 font-sans">
                        <span className="font-bold text-sm sm:text-base text-marigold">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] sm:text-xs text-ivory/40 line-through">
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCardAdd(item)}
                        aria-label={`Add ${item.name} to bag`}
                        className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-marigold text-ink px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-wider hover:bg-ivory hover:scale-105 transition-all cursor-pointer"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
