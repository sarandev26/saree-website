"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { SectionHeading } from "../ui/SectionHeading";
import { WavyDivider } from "../ui/WavyDivider";

const AW_LOOKS = [
  {
    id: "01",
    name: "Ivory Frost Organza Saree",
    fabric: "Korean Silk Organza with Antique Gold Zari",
    price: "₹4,299",
    originalPrice: "₹5,699",
    image: "/media/aw-01.webp",
    detail: "/media/aw-detail-01.webp",
    description: "Brushed antique copper zari border on pure heavyweight spun silk, styled for cold-weather banquets.",
  },
  {
    id: "02",
    name: "Rust & Copper Shot Silk Saree",
    fabric: "Handloom Matka Silk with Gold Selvedge",
    price: "₹3,899",
    originalPrice: "₹4,999",
    image: "/media/aw-02.webp",
    detail: "/media/aw-detail-02.webp",
    description: "Earthy warmth hand-loomed with natural dyed warp and delicate running Kantha geometric motifs.",
  },
  {
    id: "03",
    name: "Forest Green Velvet Border Saree",
    fabric: "Molten Gold Tissue with Floral Brocade",
    price: "₹4,999",
    originalPrice: "₹6,499",
    image: "/media/aw-03.webp",
    detail: "/media/aw-detail-03.webp",
    description: "Dense molten gold tissue reflecting candle-lit winter banquets with Ganga-Jamuna metallic flowers.",
  },
  {
    id: "04",
    name: "Deep Plum Wine Silk Saree",
    fabric: "Pure Crepe Silk with Quilted Velvet Border",
    price: "₹3,999",
    originalPrice: "₹5,299",
    image: "/media/aw-04.webp",
    detail: "/media/aw-detail-04.webp",
    description: "Nocturne crepe silk drape trimmed with a rich hand-quilted silk velvet border studded with micro pearls.",
  },
];

export const AutumnWinterSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const outlineTextRef = useRef<HTMLDivElement>(null);
  const [currentLookIdx, setCurrentLookIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      setCurrentLookIdx((prev) => (prev + 1) % AW_LOOKS.length);
    } else if (diff < -45) {
      setCurrentLookIdx((prev) => (prev - 1 + AW_LOOKS.length) % AW_LOOKS.length);
    }
    touchStartX.current = null;
  };

  // Parallax on 3 arch frames & outline text
  useGsapContext(
    () => {
      if (typeof window === "undefined" || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const section = sectionRef.current;
      const left = leftCardRef.current;
      const center = centerCardRef.current;
      const right = rightCardRef.current;
      const text = outlineTextRef.current;

      // Intersection observer to pause timer when section is offscreen
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        { threshold: 0.15 }
      );
      observer.observe(section);

      // Parallax scroll: left, center taller, right rising at different speeds & fanning out
      if (left && center && right) {
        gsap.fromTo(
          left,
          { y: 80, rotation: 0 },
          {
            y: -30,
            rotation: -4,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          center,
          { y: 0, rotation: 0 },
          {
            y: -50,
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          right,
          { y: 60, rotation: 0 },
          {
            y: -20,
            rotation: 4,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Large faded outline text moving horizontally
      if (text) {
        gsap.fromTo(
          text,
          { x: 100 },
          {
            x: -250,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      return () => {
        observer.disconnect();
      };
    },
    sectionRef,
    []
  );

  // Auto-cycle through 4 looks every 4.5 seconds (pause on hover or off-screen)
  useEffect(() => {
    if (isPaused || !inView) return;

    const interval = setInterval(() => {
      setCurrentLookIdx((prev) => (prev + 1) % AW_LOOKS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, inView]);

  const prevIdx = (currentLookIdx - 1 + AW_LOOKS.length) % AW_LOOKS.length;
  const nextIdx = (currentLookIdx + 1) % AW_LOOKS.length;

  const prevLook = AW_LOOKS[prevIdx];
  const activeLook = AW_LOOKS[currentLookIdx];
  const nextLook = AW_LOOKS[nextIdx];

  return (
    <section
      id="autumn-winter"
      data-nav-theme="light"
      ref={sectionRef}
      className="relative w-full bg-blush text-ink py-12 sm:py-16 md:py-32 select-none overflow-hidden"
    >
      {/* Top Wavy Divider matching Blush (#F3DCD2) from Ink */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#F3DCD2" variant={1} />
      </div>

      {/* Huge Faded Outline Text "AW 2026" Moving Horizontally */}
      <div
        ref={outlineTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap font-display text-[clamp(8rem,24vw,22rem)] text-transparent tracking-tighter opacity-15 pointer-events-none select-none"
        style={{
          WebkitTextStroke: "2px #062C30",
        }}
      >
        AW 2026 · MAYURA LOOMS · AUTUMN WINTER
      </div>

      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center relative z-10 pt-4 sm:pt-6">
        <SectionHeading
          eyebrow="CAPSULE COLLECTION"
          titleLines={["AUTUMN /", "WINTER EDIT"]}
          accentWord="Quiet Luxury"
          align="center"
          className="mb-8 sm:mb-12 md:mb-16"
        />

        {/* 3 Arch-Framed Model Images - Single Hero on Mobile with Touch Swipe, 3 Fanning Out on Desktop */}
        <div className="relative w-full max-w-4xl flex md:grid md:grid-cols-3 gap-6 md:gap-8 items-center justify-center mb-8 sm:mb-12 md:mb-16">
          {/* Left Arch Card (Previous Look Preview - Desktop only) */}
          <div
            ref={leftCardRef}
            onClick={() => setCurrentLookIdx(prevIdx)}
            className="hidden md:block w-full max-w-xs aspect-[3/4.5] rounded-t-[999px] rounded-b-[24px] overflow-hidden bg-ivory shadow-soft will-change-transform cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
            title={`View previous look: ${prevLook.name}`}
          >
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={prevLook.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={prevLook.image}
                    alt={prevLook.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent text-ivory">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-marigold block">
                      LOOK {prevLook.id}
                    </span>
                    <span className="font-heading text-base md:text-lg line-clamp-1">{prevLook.name}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Center Taller Arch Card (Hero Active Look with Touch Swipe) */}
          <div
            ref={centerCardRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="w-full max-w-[280px] sm:max-w-xs aspect-[3/5.2] rounded-t-[999px] rounded-b-[24px] overflow-hidden bg-ivory shadow-teal z-10 will-change-transform border-2 border-marigold/30"
          >
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLook.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={activeLook.image}
                    alt={activeLook.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent text-ivory">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-marigold block">
                      LOOK {activeLook.id} OF 04 · ACTIVE
                    </span>
                    <h4 className="font-heading text-xl md:text-2xl">{activeLook.name}</h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arch Card (Next Look Preview - Desktop only) */}
          <div
            ref={rightCardRef}
            onClick={() => setCurrentLookIdx(nextIdx)}
            className="hidden md:block w-full max-w-xs aspect-[3/4.5] rounded-t-[999px] rounded-b-[24px] overflow-hidden bg-ivory shadow-soft will-change-transform cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
            title={`View next look: ${nextLook.name}`}
          >
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={nextLook.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={nextLook.image}
                    alt={nextLook.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent text-ivory">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-marigold block">
                      LOOK {nextLook.id}
                    </span>
                    <span className="font-heading text-base md:text-lg line-clamp-1">{nextLook.name}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Feature Card Auto-Cycling every 4.5s with Progress Bar & Clickable Dots */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full max-w-xl rounded-[24px] bg-ivory p-6 md:p-8 shadow-teal border border-charcoal/10 flex flex-col relative overflow-hidden"
        >
          {/* 4.5s Animated Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-charcoal/10 overflow-hidden">
            <motion.div
              key={activeLook.id}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="h-full bg-marigold origin-left"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-1">
            {/* Small Detail Thumbnail (aw-detail-01...04) */}
            <div className="relative h-28 w-24 shrink-0 rounded-[16px] overflow-hidden bg-ink shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLook.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeLook.detail}
                    alt={`${activeLook.name} Detail`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Active Look Info */}
            <div className="flex flex-1 flex-col text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-marigold">
                  LOOK {activeLook.id} · AW 2026
                </span>
                {/* Numbered Dots 01-04 */}
                <div className="flex items-center gap-1.5">
                  {AW_LOOKS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentLookIdx(i)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentLookIdx === i ? "w-6 bg-marigold" : "w-2.5 bg-charcoal/20 hover:bg-charcoal/40"
                      }`}
                      aria-label={`Go to Look 0${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLook.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <h4 className="font-heading text-2xl font-medium text-ink mt-1">
                    {activeLook.name}
                  </h4>
                  <p className="font-sans text-xs text-charcoal/70 line-clamp-2 mt-1">
                    {activeLook.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-sans font-bold text-lg text-ink">
                      {activeLook.price}
                    </span>
                    <ButtonPrimary
                      size="sm"
                      onClick={() => alert(`Added ${activeLook.name} to styling bag.`)}
                    >
                      Shop the look
                    </ButtonPrimary>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
