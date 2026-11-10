"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Instagram, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS, INSTA_POSTS } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { WavyDivider } from "../ui/WavyDivider";
import clsx from "clsx";

export const TestimonialsInstagramSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeSet, setActiveSet] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setViewMode("desktop");
      } else if (width >= 640) {
        setViewMode("tablet");
      } else {
        setViewMode("mobile");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerSet = viewMode === "desktop" ? 3 : viewMode === "tablet" ? 2 : 1;
  const totalSets = Math.ceil(TESTIMONIALS.length / itemsPerSet);

  // Keep activeSet valid when resizing
  useEffect(() => {
    if (activeSet >= totalSets) {
      setActiveSet(0);
    }
  }, [totalSets, activeSet]);

  const visibleTestimonials = TESTIMONIALS.slice(
    activeSet * itemsPerSet,
    (activeSet + 1) * itemsPerSet
  );

  const handlePrev = () => {
    setDirection(-1);
    setActiveSet((prev) => (prev > 0 ? prev - 1 : totalSets - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveSet((prev) => (prev < totalSets - 1 ? prev + 1 : 0));
  };

  const goToSet = (idx: number) => {
    setDirection(idx > activeSet ? 1 : -1);
    setActiveSet(idx);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : dir < 0 ? -50 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : dir < 0 ? 50 : 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <>
      {/* 1. Testimonials Section (DEEP TEAL #0A4A4C with IVORY cards) */}
      <section
        id="testimonials"
        data-nav-theme="dark"
        className="relative w-full bg-teal-deep text-ivory py-24 md:py-32 select-none"
      >
        {/* Top Wavy Divider matching Deep Teal from Soft Marigold */}
        <div className="absolute top-0 left-0 right-0 h-14 overflow-hidden pointer-events-none">
          <WavyDivider fillColor="#0A4A4C" variant={1} />
        </div>

        <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center pt-6">
          <SectionHeading
            eyebrow="CLIENT VOICES"
            titleLines={["CUSTOMER", "STORIES"]}
            accentWord="Cherished"
            theme="dark"
            align="center"
            className="mb-8"
          />

          {/* Navigation Controls: Arrows and Counter */}
          <div className="flex items-center justify-between w-full max-w-5xl mb-6 px-2">
            <span className="text-xs font-sans uppercase tracking-button text-marigold font-semibold">
              Customer Stories (0{activeSet + 1} / 0{totalSets})
            </span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                aria-label="Previous customer stories set"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold text-ink hover:scale-105 transition-transform cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next customer stories set"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold text-ink hover:scale-105 transition-transform cursor-pointer"
              >
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Exactly 3 cards per view on desktop (grid of 3, equal widths, same height) with slide+fade */}
          <div className="w-full max-w-5xl overflow-hidden min-h-[340px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeSet}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className={clsx(
                  "grid gap-6 w-full items-stretch",
                  viewMode === "desktop" && "grid-cols-3",
                  viewMode === "tablet" && "grid-cols-2",
                  viewMode === "mobile" && "grid-cols-1"
                )}
              >
                {visibleTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-[24px] bg-ivory text-ink border border-charcoal/10 p-6 md:p-8 flex flex-col justify-between shadow-soft hover:shadow-teal transition-all duration-300 h-full"
                  >
                    <div>
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 text-marigold mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-marigold" />
                        ))}
                      </div>

                      {/* Quote in Cormorant Italic */}
                      <p className="font-heading italic text-lg sm:text-xl text-ink leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    {/* Customer Details with Photo in an Arch */}
                    <div className="mt-8 flex items-center gap-4 pt-4 border-t border-charcoal/10">
                      <div className="relative h-14 w-12 shrink-0 rounded-t-[999px] rounded-b-[12px] overflow-hidden bg-ink">
                        <Image
                          src={t.photo}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-sans text-base font-bold text-ink leading-tight">
                          {t.name}
                        </h4>
                        <span className="text-xs font-sans text-charcoal/60 mt-0.5">
                          {t.city} · {t.occasion}
                        </span>
                        <span className="text-[11px] font-sans font-semibold text-teal mt-0.5">
                          Draped in {t.saree}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator: 2 dots on desktop */}
          <div className="flex items-center gap-2 mt-8">
            {Array.from({ length: totalSets }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSet(i)}
                aria-label={`Go to stories set ${i + 1}`}
                className={clsx(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  activeSet === i ? "w-8 bg-marigold" : "w-2 bg-ivory/30 hover:bg-ivory/60"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Instagram Strip Section (IVORY #FBF6EC with 6 unique tiles) */}
      <section
        id="instagram"
        data-nav-theme="light"
        className="relative w-full bg-ivory text-ink py-20 md:py-28 select-none overflow-hidden"
      >
        {/* Top Wavy Divider matching Ivory from Deep Teal */}
        <div className="absolute top-0 left-0 right-0 h-14 overflow-hidden pointer-events-none">
          <WavyDivider fillColor="#FBF6EC" variant={2} />
        </div>

        <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center pt-6">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-marigold">
              <Instagram className="w-4 h-4" />
              <span>@MAYURALOOMSOFFICIAL</span>
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-medium text-ink mt-2">
              The Silk Archive on Instagram
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70 max-w-md font-sans">
              Daily weaves from our looms in Varanasi and Kanchipuram. Tag #MayuraBride to be archived.
            </p>
          </div>

          {/* 6 Unique Photo Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {INSTA_POSTS.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square rounded-[18px] overflow-hidden bg-ink shadow-sm"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-ink/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                  <Instagram className="w-5 h-5 text-marigold mb-1.5" />
                  <span className="text-[11px] font-sans font-semibold text-ivory">
                    {post.likes} likes
                  </span>
                  <p className="text-[10px] text-ivory/70 line-clamp-2 mt-1 font-sans">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
