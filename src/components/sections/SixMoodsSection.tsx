"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOODS_DATA } from "@/lib/data";
import { ArchCard } from "../ui/ArchCard";

const ARCH_GRADIENTS = [
  "from-[#4A0A14]/90 via-ink/40 to-transparent", // Wedding (vermilion/gold)
  "from-[#0A3D2E]/90 via-ink/40 to-transparent", // Kanjivaram (emerald)
  "from-[#16223B]/90 via-ink/40 to-transparent", // Banarasi (peacock/blue)
  "from-[#4A2E05]/90 via-ink/40 to-transparent", // Festive (marigold)
  "from-[#2D2A26]/90 via-ink/40 to-transparent", // Zari (tissue noir)
  "from-[#3B0E1E]/90 via-ink/40 to-transparent", // Bridal (deep maroon)
];

export const SixMoodsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const clipTextRef = useRef<HTMLSpanElement>(null);

  useGsapContext(
    () => {
      if (typeof window === "undefined" || !containerRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const container = containerRef.current;
      const progressBar = progressBarRef.current;
      const clipText = clipTextRef.current;

      const mm = gsap.matchMedia();

      // Desktop (>= 1024px): Horizontal scroll pinning
      mm.add("(min-width: 1024px)", () => {
        const getScrollDist = () => {
          const trackLeft = track.getBoundingClientRect().left;
          const paddingRight = 80;
          return Math.max(track.scrollWidth - window.innerWidth + trackLeft + paddingRight, 600);
        };

        const horizontalTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${getScrollDist()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Move track left
        horizontalTl.to(track, {
          x: () => -getScrollDist(),
          ease: "none",
        });

        // Update bottom progress bar
        if (progressBar) {
          horizontalTl.to(
            progressBar,
            {
              scaleX: 1,
              ease: "none",
            },
            0
          );
        }

        // Heading accent word clip-path fill scrub with marigold
        if (clipText) {
          gsap.fromTo(
            clipText,
            {
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top 75%",
                end: "top 25%",
                scrub: true,
              },
            }
          );
        }
      });

      // Mobile (< 1024px): Clear any transforms and pins for smooth native swipe
      mm.add("(max-width: 1023px)", () => {
        gsap.set(track, { clearProps: "transform,x" });
        if (progressBar) gsap.set(progressBar, { scaleX: 1 });
        if (clipText) gsap.set(clipText, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" });
      });

      return () => {
        mm.revert();
      };
    },
    containerRef,
    []
  );

  return (
    <section
      id="six-moods"
      data-nav-theme="dark"
      ref={containerRef}
      className="relative z-30 w-full bg-ink text-ivory pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-12 md:pb-14 overflow-hidden select-none shadow-2xl"
    >
      <div className="relative z-10 max-w-layout mx-auto px-4 sm:px-6 md:px-12 flex flex-col w-full">
        {/* Section Header: Compact & elegant layout with zero empty gaps */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 pt-1 shrink-0 mb-4 sm:mb-6">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-marigold">
                CURATED EDITS
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
              <h2 className="font-display uppercase text-2xl sm:text-4xl md:text-5xl text-ivory leading-none tracking-tightest">
                SIX MOODS.
              </h2>
              {/* Scrubbed clip-path text */}
              <span className="relative font-heading italic text-lg sm:text-2xl md:text-3xl leading-none">
                <span className="text-ivory/30">Woven to be Remembered</span>
                <span
                  ref={clipTextRef}
                  className="absolute inset-0 text-marigold"
                >
                  Woven to be Remembered
                </span>
              </span>
            </div>
          </div>

          <Link
            href="#new-arrivals"
            className="group inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-button uppercase text-marigold hover:text-ivory transition-colors self-start md:self-end"
          >
            <span>Explore all edits</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal Track of 6 Arch Cards: Mobile swipable, desktop GSAP-driven */}
        <div
          ref={trackRef}
          className="w-full flex items-stretch gap-4 sm:gap-6 lg:gap-8 pb-4 will-change-transform overflow-x-auto lg:overflow-x-visible no-scrollbar snap-x snap-mandatory lg:w-max"
        >
          {MOODS_DATA.map((mood, idx) => (
            <ArchCard
              key={mood.id}
              title={mood.title}
              subtitle={mood.subtitle}
              description={mood.description}
              image={mood.image}
              count={mood.count}
              gradient={ARCH_GRADIENTS[idx % ARCH_GRADIENTS.length]}
              offsetY={0}
              className="snap-start"
              onClick={() => {
                alert(`Exploring the ${mood.title}. Drapes arriving in stock.`);
              }}
            />
          ))}
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="hidden lg:block relative mt-6 h-1 w-full bg-ivory/15 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-marigold origin-left scale-x-0"
          />
        </div>
      </div>
    </section>
  );
};
