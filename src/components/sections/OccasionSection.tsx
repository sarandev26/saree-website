"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OCCASIONS_DATA } from "@/lib/data";
import { Eye, ArrowUpRight } from "lucide-react";
import { WavyDivider } from "../ui/WavyDivider";

export const OccasionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (typeof window === "undefined" || !sectionRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const track = trackRef.current;
      const bar = progressBarRef.current;

      const mm = gsap.matchMedia();

      // Desktop (>= 1024px): Horizontal scroll pinning
      mm.add("(min-width: 1024px)", () => {
        const getScrollDistance = () => {
          const trackLeft = track.getBoundingClientRect().left;
          return Math.max(track.scrollWidth - window.innerWidth + trackLeft + 80, 500);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
        });

        if (bar) {
          tl.to(
            bar,
            {
              scaleX: 1,
              ease: "none",
            },
            0
          );
        }
      });

      // Mobile (< 1024px): Clear all pin props & transforms for smooth native touch swiping
      mm.add("(max-width: 1023px)", () => {
        gsap.set(track, { clearProps: "transform,x" });
        gsap.set(section, { clearProps: "all" });
        if (bar) gsap.set(bar, { scaleX: 1 });
      });

      return () => {
        mm.revert();
      };
    },
    sectionRef,
    []
  );

  return (
    <section
      id="occasions"
      data-nav-theme="light"
      ref={sectionRef}
      className="relative w-full bg-ivory text-ink pt-10 sm:pt-14 md:pt-20 pb-10 sm:pb-14 md:pb-20 select-none overflow-hidden"
    >
      {/* Top Wavy Divider matching Ivory from Dark */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#FBF6EC" variant={1} />
      </div>

      <div className="max-w-layout mx-auto px-4 sm:px-6 md:px-12 flex flex-col mb-6 sm:mb-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-2.5 mb-1.5">
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-eyebrow uppercase text-marigold">
            DRESS CODES & REPERTOIRE
          </span>
        </div>

        <h2 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-tightest leading-[0.95] text-ink flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
          <span>SHOP BY</span>
          <span className="font-heading italic font-normal text-marigold lowercase capitalize">
            Occasion
          </span>
        </h2>
      </div>

      {/* ONE Single Row of 5 Equal Cards - Responsive Touch Track */}
      <div
        ref={trackRef}
        className="w-full flex gap-4 sm:gap-6 pb-4 will-change-transform px-4 sm:px-6 md:px-12 overflow-x-auto lg:overflow-x-visible no-scrollbar snap-x snap-mandatory lg:w-max"
      >
        {OCCASIONS_DATA.map((item, idx) => (
          <div
            key={item.id}
            className="group relative h-[400px] sm:h-[440px] w-[270px] xs:w-[290px] sm:w-[310px] shrink-0 rounded-[24px] overflow-hidden bg-ink shadow-soft transition-all duration-300 hover:shadow-teal snap-start cursor-pointer border border-charcoal/10"
          >
            {/* Image with subtle inner parallax */}
            <div className="relative h-[112%] w-full -top-[6%] overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="310px"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

            {/* Corner Number "01".."05" */}
            <span className="absolute top-4 left-4 z-10 font-mono text-sm font-bold text-marigold">
              0{idx + 1}
            </span>

            {/* In-Card "View" Pill that fades in on hover inside card */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/90 text-ink px-3 py-1 text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
                <Eye className="w-3 h-3 text-teal" />
                <span>View</span>
              </span>
            </div>

            {/* Bottom Content: Occasion Pill & Titles */}
            <div className="absolute bottom-6 inset-x-6 z-10 flex flex-col">
              <span className="self-start rounded-full bg-marigold px-3 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                {item.tag}
              </span>
              <h3 className="font-heading text-2xl font-medium text-ivory">
                {item.title}
              </h3>
              <p className="font-heading italic text-sm text-ivory/80">
                {item.accent}
              </p>
              <p className="mt-1 text-xs font-sans text-ivory/70 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar under the row */}
      <div className="hidden lg:block max-w-layout mx-auto px-5 sm:px-8 md:px-12 mt-6">
        <div className="h-1 w-full bg-charcoal/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-marigold origin-left scale-x-0"
          />
        </div>
      </div>
    </section>
  );
};
