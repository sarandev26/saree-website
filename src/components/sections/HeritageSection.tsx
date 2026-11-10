"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { WavyDivider } from "../ui/WavyDivider";
import clsx from "clsx";

export interface HeritageTabConfig {
  id: string;
  label: string;
  lead: string;
  description: string;
  wideImage: string; // 16:9
  slivers: {
    id: string;
    title: string;
    tag: string;
    img: string; // 2:3
  }[];
}

export const HERITAGE_TABS_V2: HeritageTabConfig[] = [
  {
    id: "wedding-edit",
    label: "The Wedding Edit",
    lead: "Sacred threads consecrated for life's most unforgettable vow.",
    description: "Every Mayura bridal ensemble is woven by master weavers who coordinate up to 14,000 punch cards on jacquard pit looms.",
    wideImage: "/media/heritage-01.webp",
    slivers: [
      { id: "h02", title: "Mehndi & Silk", tag: "Heirloom Touch", img: "/media/heritage-02.webp" },
      { id: "h03", title: "Temple Ornaments", tag: "24k Gold Dip", img: "/media/heritage-03.webp" },
      { id: "h04", title: "Mother's Blessing", tag: "Generational Love", img: "/media/heritage-04.webp" },
    ],
  },
  {
    id: "heritage-weaves",
    label: "Heritage Weaves",
    lead: "Sustaining 400-year-old weaving lineages across India.",
    description: "From Patan double ikats to Varanasi Kadwa jangla, our direct artisan patronage sustains over 40 historic weaving clusters.",
    wideImage: "/media/heritage-05.webp",
    slivers: [
      { id: "h06", title: "Shuttle & Warp", tag: "Pit Loom Weave", img: "/media/heritage-06.webp" },
      { id: "h07", title: "Pulling Real Zari", tag: "Silver Wire 24k", img: "/media/heritage-07.webp" },
      { id: "h08", title: "Natural Pigment Dye", tag: "Indigo & Saffron", img: "/media/heritage-08.webp" },
    ],
  },
  {
    id: "silk-story",
    label: "The Silk Story",
    lead: "From cocoon to royal heirloom: ethical, unhurried, authentic.",
    description: "We use only organically nourished mulberry and wild tussar silks, harvested with reverence and spun into filaments of liquid light.",
    wideImage: "/media/heritage-09.webp",
    slivers: [
      { id: "h10", title: "Organic Cocoons", tag: "Natural Harvest", img: "/media/heritage-10.webp" },
      { id: "h11", title: "Golden Raw Skeins", tag: "2-Ply Mulberry", img: "/media/heritage-11.webp" },
      { id: "h12", title: "Artisan Silk Touch", tag: "Supple Drape", img: "/media/heritage-12.webp" },
    ],
  },
  {
    id: "festive-drapes",
    label: "Festive Drapes",
    lead: "Celebrating heritage with breezy ease and radiant elegance.",
    description: "Designed for effortless grace, our festive silks flow like second skin so you dance through celebrations unencumbered.",
    wideImage: "/media/heritage-13.webp",
    slivers: [
      { id: "h14", title: "Lamp-Lit Pallu", tag: "Diwali Glow", img: "/media/heritage-14.webp" },
      { id: "h15", title: "Marigold & Silks", tag: "Temple Petals", img: "/media/heritage-15.webp" },
      { id: "h16", title: "Bangles & Border", tag: "Zari Micro Macro", img: "/media/heritage-16.webp" },
    ],
  },
];

export const HeritageSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("wedding-edit");
  const [activeSliverId, setActiveSliverId] = useState<string>("h02");

  const activeTab =
    HERITAGE_TABS_V2.find((t) => t.id === activeTabId) || HERITAGE_TABS_V2[0];

  return (
    <section
      id="heritage"
      data-nav-theme="dark"
      className="relative w-full bg-teal-deep text-ivory py-14 sm:py-16 md:py-20 select-none overflow-hidden"
    >
      {/* Top Wavy Divider matching Deep Teal (#0A4A4C) from Ivory */}
      <div className="absolute top-0 left-0 right-0 h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#0A4A4C" variant={1} />
      </div>

      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 flex flex-col pt-6">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="ANCIENT LOOMS, LIVING HERITAGE"
          titleLines={["OUR", "HERITAGE"]}
          accentWord="Legacy"
          theme="dark"
          className="mb-8"
        />

        {/* Tabs: The Wedding Edit · Heritage Weaves · The Silk Story · Festive Drapes */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 pb-4 border-b border-ivory/15 mb-10 sm:mb-12">
          {HERITAGE_TABS_V2.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                setActiveSliverId(tab.slivers[0].id);
              }}
              className={clsx(
                "relative py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-full font-sans text-[11px] sm:text-xs md:text-sm font-semibold tracking-button uppercase transition-colors cursor-pointer",
                activeTabId === tab.id
                  ? "bg-marigold text-ink shadow-sm"
                  : "bg-ivory/10 text-ivory/80 hover:bg-ivory/20 hover:text-ivory"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panel with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left: 1 Wide 16:9 Image with Gentle Ken Burns Loop */}
            <div className="lg:col-span-6 rounded-[24px] overflow-hidden bg-ink/80 border border-ivory/15 relative min-h-[360px] sm:min-h-[440px] flex flex-col justify-end p-6 md:p-8 shadow-teal">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={activeTab.wideImage}
                  alt={activeTab.label}
                  fill
                  className="object-cover animate-ken-burns"
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

              <div className="relative z-10 flex flex-col">
                <span className="text-xs font-sans font-semibold uppercase tracking-widest text-marigold">
                  ATELIER ARCHIVE
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-medium text-ivory mt-1">
                  {activeTab.lead}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-ivory/80 font-sans leading-relaxed">
                  {activeTab.description}
                </p>
              </div>
            </div>

            {/* Right: 3 Tall Image Slivers (2:3) Expanding on Hover/Click */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row gap-3 h-[480px] sm:h-[440px]">
              {activeTab.slivers.map((sliver) => {
                const isActive = activeSliverId === sliver.id;
                return (
                  <motion.div
                    key={sliver.id}
                    layout
                    onClick={() => setActiveSliverId(sliver.id)}
                    onMouseEnter={() => setActiveSliverId(sliver.id)}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className={clsx(
                      "relative rounded-[20px] overflow-hidden cursor-pointer select-none border transition-all duration-300",
                      isActive
                        ? "flex-grow-[3] border-marigold shadow-teal"
                        : "flex-grow-[1] border-ivory/15 opacity-65 hover:opacity-95"
                    )}
                  >
                    <Image
                      src={sliver.img}
                      alt={sliver.title}
                      fill
                      className={clsx(
                        "object-cover transition-all duration-500",
                        isActive ? "grayscale-0 scale-105" : "grayscale"
                      )}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />

                    <div className="absolute bottom-5 inset-x-4 z-10 flex flex-col">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-marigold">
                        {sliver.tag}
                      </span>
                      <h4
                        className={clsx(
                          "font-heading text-lg font-medium text-ivory truncate transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0 sm:opacity-100"
                        )}
                      >
                        {sliver.title}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.06) translate(-1%, -1%);
          }
          100% {
            transform: scale(1) translate(0, 0);
          }
        }
        .animate-ken-burns {
          animation: kenBurns 18s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};
