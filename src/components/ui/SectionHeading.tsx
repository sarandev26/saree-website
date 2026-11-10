"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionHeadingProps {
  eyebrow?: string;
  titleLines: string[];
  accentWord?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
  isDisplay?: boolean; // Anton for Display, Cormorant for H2/H3
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  titleLines,
  accentWord,
  align = "left",
  theme = "light",
  className = "",
  isDisplay = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (typeof window === "undefined" || !containerRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const el = containerRef.current;
      const hairline = el.querySelector(".heading-hairline");
      const eyebrowEl = el.querySelector(".heading-eyebrow");
      const lines = el.querySelectorAll(".heading-line-inner");
      const accent = el.querySelector(".heading-accent");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (hairline) {
        tl.fromTo(hairline, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.out" });
      }
      if (eyebrowEl) {
        tl.fromTo(
          eyebrowEl,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        );
      }
      if (accent) {
        tl.fromTo(
          accent,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      }
    },
    containerRef,
    [titleLines, accentWord]
  );

  const isDark = theme === "dark";

  return (
    <div
      ref={containerRef}
      className={clsx(
        "flex flex-col",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {/* Eyebrow with 32px Hairline */}
      {eyebrow && (
        <div
          className={clsx(
            "flex items-center gap-3 mb-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="heading-hairline inline-block h-[1px] w-8 bg-marigold origin-left" />
          <span className="heading-eyebrow font-sans text-[12px] font-semibold tracking-eyebrow uppercase text-marigold">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Title Lines with Overflow Hidden Mask Reveal */}
      <h2
        className={clsx(
          "flex flex-wrap items-baseline gap-x-3.5 tracking-tightest leading-[0.95]",
          isDisplay
            ? "font-display uppercase text-[clamp(2.1rem,7.5vw,7.5rem)]"
            : "font-heading font-medium text-[clamp(1.85rem,5vw,4.5rem)]",
          isDark ? "text-ivory" : "text-ink"
        )}
      >
        {titleLines.map((line, idx) => (
          <span key={idx} className="overflow-hidden inline-block py-1">
            <span className="heading-line-inner inline-block will-change-transform">
              {line}
            </span>
          </span>
        ))}

        {/* Cormorant Garamond Italic Accent Word in Marigold */}
        {accentWord && (
          <span className="heading-accent font-heading italic font-normal text-marigold text-[0.88em] lowercase capitalize inline-block">
            {accentWord}
          </span>
        )}
      </h2>
    </div>
  );
};

