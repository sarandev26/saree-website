"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FIRST_LIGHT_STORIES } from "@/lib/data";

export const FirstLightSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  useGsapContext(
    () => {
      if (typeof window === "undefined" || !containerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const container = containerRef.current;
      const mm = gsap.matchMedia();

      // Only pin cinematic story scrub on desktop screens (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "+=240%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              FIRST_LIGHT_STORIES.length - 1,
              Math.floor(progress * FIRST_LIGHT_STORIES.length)
            );
            setActiveStoryIdx(idx);
          },
        });
      });

      // On mobile screens (< 1024px): Clear any pins and allow natural scrolling
      mm.add("(max-width: 1023px)", () => {
        gsap.set(container, { clearProps: "all" });
      });

      return () => {
        mm.revert();
      };
    },
    containerRef,
    []
  );

  const activeStory = FIRST_LIGHT_STORIES[activeStoryIdx];

  return (
    <section
      id="first-light"
      data-nav-theme="dark"
      ref={containerRef}
      className="relative min-h-[640px] lg:h-screen lg:min-h-[720px] w-full bg-ink text-ivory select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Active Full-Bleed Background with Ken Burns Slow Zoom */}
      {FIRST_LIGHT_STORIES.map((story, idx) => (
        <div
          key={story.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
            activeStoryIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="relative h-full w-full overflow-hidden animate-slow-ken-burns">
            <Image
              src={story.image}
              alt={story.title}
              fill
              priority={idx === 0}
              className="object-cover"
            />
          </div>
          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/60" />
        </div>
      ))}

      {/* Main Foreground Container: Guaranteed 40px+ clearance below the 108px fixed navbar */}
      <div className="relative z-20 w-full max-w-layout mx-auto px-6 md:px-16 flex flex-col justify-between flex-1 pt-28 sm:pt-32 md:pt-36 lg:pt-36 pb-8 sm:pb-10 md:pb-12 pointer-events-none">
        {/* Top Left Heading: "First Light" (Guaranteed 40px+ clearance below 72px sticky navbar) */}
        <div className="flex flex-col items-start pointer-events-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-marigold animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-marigold">
              CINEMATIC CHRONICLES
            </span>
          </div>
          <h2 className="font-display uppercase text-3xl sm:text-5xl md:text-6xl text-ivory leading-none tracking-tightest">
            FIRST{" "}
            <span className="font-heading italic font-normal text-marigold lowercase capitalize">
              Light
            </span>
          </h2>
        </div>

        {/* Bottom Area: Main Quote & Story Thumbnails side-by-side */}
        <div className="mt-8 sm:mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pointer-events-auto">
          {/* Main Quote & Caption */}
          <div className="max-w-xl flex flex-col text-left">
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-button uppercase text-marigold">
              {activeStory.location}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium text-ivory mt-1">
              {activeStory.title}
            </h3>
            <p className="font-heading italic text-base sm:text-lg md:text-xl text-ivory/85 mt-2 leading-relaxed">
              &ldquo;{activeStory.quote}&rdquo;
            </p>

            {/* Progress bar / Story switchers */}
            <div className="mt-5 flex items-center gap-2">
              {FIRST_LIGHT_STORIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStoryIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeStoryIdx === i ? "w-10 bg-marigold" : "w-3 bg-ivory/30 hover:bg-ivory/50"
                  }`}
                  aria-label={`Go to story ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Strip of 4 Small Story Thumbnails */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            {FIRST_LIGHT_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setActiveStoryIdx(idx)}
                className={`group relative h-14 w-20 sm:h-16 sm:w-24 rounded-[12px] overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  activeStoryIdx === idx
                    ? "border-marigold scale-105 shadow-glow"
                    : "border-ivory/20 opacity-60 hover:opacity-100"
                }`}
                title={story.title}
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slowKenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        .animate-slow-ken-burns {
          animation: slowKenBurns 18s ease-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

