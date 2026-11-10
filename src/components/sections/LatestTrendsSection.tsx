"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { WavyDivider } from "../ui/WavyDivider";

export const LatestTrendsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bigHeadingRef = useRef<HTMLHeadingElement>(null);
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const floatImg1Ref = useRef<HTMLDivElement>(null);
  const floatImg2Ref = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (typeof window === "undefined" || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const section = sectionRef.current;
      const bigHeading = bigHeadingRef.current;
      const cardFrame = cardFrameRef.current;
      const float1 = floatImg1Ref.current;
      const float2 = floatImg2Ref.current;

      // Oversized Anton heading scales 0.8 -> 1
      if (bigHeading) {
        gsap.fromTo(
          bigHeading,
          { scale: 0.85, y: 50 },
          {
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // Tilted photo card (-6deg) straightens to 0deg on enter
      if (cardFrame) {
        gsap.fromTo(
          cardFrame,
          { rotation: -6, scale: 0.95 },
          {
            rotation: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardFrame,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // 2 small floating images with parallax
      if (float1 && float2) {
        gsap.fromTo(
          float1,
          { y: 80, rotation: -8 },
          {
            y: -60,
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

        gsap.fromTo(
          float2,
          { y: -60, rotation: 8 },
          {
            y: 80,
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
      }
    },
    sectionRef,
    []
  );

  return (
    <section
      id="latest-trends"
      data-nav-theme="light"
      ref={sectionRef}
      className="relative w-full bg-marigold-soft text-ink py-12 sm:py-16 md:py-32 select-none overflow-hidden"
    >
      {/* Top Wavy Divider matching Soft Marigold (#F6E3B4) from Dark */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#F6E3B4" variant={2} />
      </div>

      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center relative z-10 pt-4 sm:pt-6">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-ink">
            FORECAST & EDITORIAL
          </span>
        </div>

        {/* Oversized Anton Heading in Ink */}
        <h2
          ref={bigHeadingRef}
          className="font-display uppercase text-[clamp(2.5rem,7vw,6.5rem)] text-ink tracking-tightest leading-none text-center mb-8 sm:mb-12 md:mb-16 will-change-transform"
        >
          LATEST TRENDS
        </h2>

        {/* Main Grid: Left Ivory Card, Center Tilted Card with 2 Floating Parallax Images, Right Ivory Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Ivory Card */}
          <div className="lg:col-span-3 rounded-[24px] bg-ivory p-6 shadow-soft border border-charcoal/10 flex flex-col gap-3 text-left">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-teal">
              01 / LIQUID TISSUE
            </span>
            <h3 className="font-heading text-2xl font-medium text-ink">
              Metallic Sheen Reimagined
            </h3>
            <p className="font-sans text-xs text-charcoal/75 leading-relaxed">
              Modern draping embraces featherweight silk tissue with champagne gold and
              rose-gold electroplating. Minimal pleats, maximum fluidity.
            </p>
          </div>

          {/* Center: Tilted Photo Card flanked by 2 small floating parallax images */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-8">
            {/* Floating Image 1 (Left Parallax) */}
            <div
              ref={floatImg1Ref}
              className="absolute -left-6 sm:left-2 top-0 z-20 h-36 w-28 sm:h-44 sm:w-34 rounded-[18px] overflow-hidden shadow-teal border-2 border-ivory hidden sm:block will-change-transform"
            >
              <Image
                src="/media/trends-small-01.webp"
                alt="Yellow Chanderi Trend Portrait"
                fill
                className="object-cover"
              />
            </div>

            {/* Tilted Photo Card (trends-card.jpg) */}
            <div
              ref={cardFrameRef}
              className="relative aspect-[4/5] w-full max-w-sm rounded-[24px] overflow-hidden shadow-teal bg-ink border-2 border-marigold/40 p-2 will-change-transform z-10"
            >
              <div className="relative h-full w-full rounded-[18px] overflow-hidden">
                <Image
                  src="/media/trends-card.webp"
                  alt="Mayura Looms Latest Trends Editorial"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-marigold">
                    HAUTE COVER
                  </span>
                  <h4 className="font-heading text-2xl">Coral Twirl Georgette</h4>
                </div>
              </div>
            </div>

            {/* Floating Image 2 (Right Parallax) */}
            <div
              ref={floatImg2Ref}
              className="absolute -right-6 sm:right-2 bottom-0 z-20 h-36 w-28 sm:h-44 sm:w-34 rounded-[18px] overflow-hidden shadow-teal border-2 border-ivory hidden sm:block will-change-transform"
            >
              <Image
                src="/media/trends-small-02.webp"
                alt="Saree Pleats and Heel Detail"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Ivory Card */}
          <div className="lg:col-span-3 rounded-[24px] bg-ivory p-6 shadow-soft border border-charcoal/10 flex flex-col gap-3 text-left">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-clay">
              02 / MODERN JAAL
            </span>
            <h3 className="font-heading text-2xl font-medium text-ink">
              Decentered Motifs
            </h3>
            <p className="font-sans text-xs text-charcoal/75 leading-relaxed">
              Asymmetric botanical vines clustering along the pallu and dissolving
              gracefully across the waistline for gala evenings.
            </p>
            <div className="mt-3">
              <ButtonPrimary
                onClick={() => alert("Downloading the Mayura Haute Lookbook Vol. 28...")}
                size="sm"
              >
                View Lookbook
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
