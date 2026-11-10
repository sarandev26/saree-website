"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { ButtonGhost } from "../ui/ButtonGhost";

interface HeroSectionProps {
  onPastHeroChange?: (isPast: boolean) => void;
  onExploreClick?: () => void;
  onStylingCallClick?: () => void;
}

// 3 Curated Chapters matching the model's boutique video journey
const HERO_STAGES = [
  {
    id: 1,
    chapter: "01",
    label: "ATELIER PROLOGUE",
    eyebrow: "TRADITION, WOVEN FORWARD",
    line1: "EVERY DRAPE,",
    accent: "an Heirloom",
    subtext:
      "Handwoven silks and modern drapes from India's finest looms, styled for the moments you'll remember forever.",
    cta1: "Explore Collections",
    cta2: "Book a Styling Call",
  },
  {
    id: 2,
    chapter: "02",
    label: "THE LIVING SILHOUETTE",
    eyebrow: "FLUIDITY & METALLIC LIGHT",
    line1: "POETRY IN",
    accent: "Motion",
    subtext:
      "Pure mulberry katan silk paired with 24k electroplated silver-gilt zari. Draped for women who command every room they enter.",
    cta1: "Discover The Drape",
    cta2: "View Seasonal Edits",
  },
  {
    id: 3,
    chapter: "03",
    label: "HAUTE ARCHIVE",
    eyebrow: "SACRED WEDDING REPERTOIRE",
    line1: "CONSECRATED FOR",
    accent: "Generations",
    subtext:
      "Up to 14,000 jacquard punch cards consecrated for a single bridal masterpiece. An unforgettable presence from the aisle to the banquet.",
    cta1: "Enter Bridal Salon",
    cta2: "Curate Trousseau",
  },
];

const TOTAL_FRAMES = 120;

// Luxury character scramble decoder hook for line1
function useScrambledText(targetText: string, speed = 22) {
  const [displayText, setDisplayText] = useState(targetText);
  const prevTextRef = useRef(targetText);

  useEffect(() => {
    if (prevTextRef.current === targetText) return;
    prevTextRef.current = targetText;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ✦✧◈◊";
    let iteration = 0;
    const maxIterations = targetText.length * 2.2;

    const interval = setInterval(() => {
      setDisplayText(() =>
        targetText
          .split("")
          .map((letter, index) => {
            if (letter === " " || letter === ",") return letter;
            if (index < iteration / 2.2) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        setDisplayText(targetText);
        clearInterval(interval);
      }
      iteration += 1;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  return displayText;
}

// Scramble hook for the Cormorant Garamond accent word
function useScrambledAccent(targetText: string, speed = 25) {
  const [displayText, setDisplayText] = useState(targetText);
  const prevRef = useRef(targetText);

  useEffect(() => {
    if (prevRef.current === targetText) return;
    prevRef.current = targetText;

    const chars = "abcdefghijklmnopqrstuvwxyz✧✦";
    let iteration = 0;
    const maxIterations = targetText.length * 2.2;

    const interval = setInterval(() => {
      setDisplayText(() =>
        targetText
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration / 2.2) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        setDisplayText(targetText);
        clearInterval(interval);
      }
      iteration += 1;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  return displayText;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPastHeroChange,
  onExploreClick,
  onStylingCallClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [stageIdx, setStageIdx] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  // Cache for preloaded image frames
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  const currentStage = HERO_STAGES[stageIdx];
  const scrambledLine1 = useScrambledText(currentStage.line1);
  const scrambledAccent = useScrambledAccent(currentStage.accent);

  // Draws a frame to the canvas with object-fit: cover math
  const renderFrame = useCallback((frameIdx: number, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use requested frame, or find the closest available loaded frame
    let bestImg: HTMLImageElement | null = imagesRef.current[frameIdx];
    let bestIdx = frameIdx;

    if (!bestImg) {
      let minDistance = TOTAL_FRAMES;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (imagesRef.current[i]) {
          const dist = Math.abs(i - frameIdx);
          if (dist < minDistance) {
            minDistance = dist;
            bestImg = imagesRef.current[i];
            bestIdx = i;
          }
        }
      }
    }
    if (!bestImg) return;

    // Skip redundant repaints unless forced (e.g. after canvas resize or initial load)
    if (!forceRedraw && lastDrawnFrameRef.current === bestIdx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const iw = bestImg.naturalWidth || 1280;
    const ih = bestImg.naturalHeight || 720;

    // Calculate object-fit: cover coordinates
    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(bestImg, cx, cy, nw, nh);
    lastDrawnFrameRef.current = bestIdx;
  }, []);

  // Set up canvas dimensions & progressive preloading
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastInnerWidth = 0;
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(window.innerWidth * dpr);
      const targetH = Math.round(window.innerHeight * dpr);

      // On mobile devices, ignore vertical-only resize (address bar show/hide)
      const isMobile = window.innerWidth < 768;
      if (
        isMobile &&
        lastInnerWidth === window.innerWidth &&
        canvas.width > 300 &&
        Math.abs(canvas.height - targetH) < 120
      ) {
        return;
      }
      lastInnerWidth = window.innerWidth;

      if (canvas.width === targetW && canvas.height === targetH) return;

      canvas.width = targetW;
      canvas.height = targetH;
      lastDrawnFrameRef.current = -1;
      renderFrame(currentFrameRef.current, true);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });
    window.addEventListener("orientationchange", updateCanvasSize, { passive: true });

    // 1. Immediately load frame 0 for instant visual presence (no wait)
    const img0 = new window.Image();
    img0.src = "/media/hero-frames/frame_000.webp";
    const onImg0Loaded = () => {
      imagesRef.current[0] = img0;
      renderFrame(0, true);
      setIsFirstFrameLoaded(true);
    };
    if (img0.complete) {
      onImg0Loaded();
    } else {
      img0.onload = onImg0Loaded;
    }

    // 2. Preload all remaining frames progressively without arbitrary delays
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const frameStr = String(i).padStart(3, "0");
      img.src = `/media/hero-frames/frame_${frameStr}.webp`;

      const onFrameLoad = () => {
        imagesRef.current[i] = img;
        const currentTarget = currentFrameRef.current;
        const currentDrawn = lastDrawnFrameRef.current;
        if (
          currentDrawn === -1 ||
          Math.abs(i - currentTarget) < Math.abs(currentDrawn - currentTarget)
        ) {
          renderFrame(currentTarget);
        }
      };

      if (img.complete) {
        onFrameLoad();
      } else {
        img.onload = onFrameLoad;
      }
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("orientationchange", updateCanvasSize);
    };
  }, [renderFrame]);

  // GSAP ScrollTrigger: High precision frame scrubbing
  useGsapContext(
    () => {
      if (typeof window === "undefined" || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? "+=260%" : "+=350%";

      // Pinned canvas scroll scrub
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: scrollDistance,
        pin: true,
        pinSpacing: true,
        scrub: isMobile ? 0.3 : 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Compute exact target frame (0 to 119)
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(p * TOTAL_FRAMES))
          );
          currentFrameRef.current = targetFrame;
          renderFrame(targetFrame);

          // Update chapter stages: 0 to 0.33, 0.33 to 0.66, 0.66 to 1.0
          let nextStage = 0;
          if (p >= 0.66) {
            nextStage = 2;
          } else if (p >= 0.33) {
            nextStage = 1;
          }
          setStageIdx(nextStage);

          // Navbar visibility: reveal once user completes hero sequence
          const pastHero = p >= 0.96;
          if (onPastHeroChange) {
            onPastHeroChange(pastHero);
          }
        },
        onLeave: () => {
          if (onPastHeroChange) onPastHeroChange(true);
        },
        onEnterBack: () => {
          if (onPastHeroChange) onPastHeroChange(false);
        },
      });

      return () => {
        st.kill();
      };
    },
    sectionRef,
    [onPastHeroChange, renderFrame]
  );

  return (
    <section
      id="hero"
      data-nav-theme="dark"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-ink text-ivory flex items-center justify-center select-none z-10"
    >
      {/* Full-Bleed High-Performance Canvas Animation Engine */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        />

        {/* Fallback poster until frame 0 is drawn */}
        {!isFirstFrameLoaded && (
          <Image
            src="/media/hero-frames/frame_000.webp"
            alt="Mayura Looms Boutique Interior"
            fill
            priority
            className="object-cover"
          />
        )}

        {/* Pure Cinematic Vignette Overlay (NO black boxes / masks) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,44,48,0.55)_100%)] pointer-events-none" />
      </div>

      {/* Main Content Area (Clean, minimal typography — no unwanted lines or graphos) */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-layout mx-auto w-full h-full px-5 sm:px-8 md:px-12 pb-10 sm:pb-14 md:pb-16 flex flex-col justify-end pointer-events-none"
      >
        <div className="max-w-2xl flex flex-col items-start pointer-events-auto">
          {/* Eyebrow: Clean text without distracting line */}
          <div className="mb-2 sm:mb-2.5">
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-marigold">
              {currentStage.eyebrow}
            </span>
          </div>

          {/* Minimal Artist Headline */}
          <h1 className="font-display uppercase tracking-[0.05em] leading-[1.04] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-ivory drop-shadow-md">
            <span className="block overflow-hidden">
              <span className="inline-block will-change-transform">{scrambledLine1}</span>
            </span>
            <span className="block overflow-hidden mt-0.5">
              <span className="font-heading italic font-normal text-marigold lowercase capitalize tracking-[0.03em]">
                {scrambledAccent}
              </span>
            </span>
          </h1>

          {/* Minimal Subtext */}
          <p className="mt-2.5 sm:mt-3 font-sans text-xs sm:text-sm md:text-[15px] text-ivory/85 max-w-lg leading-relaxed tracking-wide min-h-[2.5rem] transition-opacity duration-300 drop-shadow-sm">
            {currentStage.subtext}
          </p>

          {/* Sleek, Compact CTAs */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
            <ButtonPrimary
              onClick={() => {
                if (onExploreClick) onExploreClick();
                else {
                  document.querySelector("#six-moods")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              size="sm"
            >
              {currentStage.cta1}
            </ButtonPrimary>

            <ButtonGhost
              onClick={() => {
                if (onStylingCallClick) onStylingCallClick();
                else alert("Connecting you to a Mayura Looms personal bridal draping consultant...");
              }}
              variant="light"
              size="sm"
            >
              {currentStage.cta2}
            </ButtonGhost>
          </div>
        </div>
      </div>

      {/* Rotating Circular Gold Badge "HANDWOVEN · HANDLOVED ·" (Desktop only) */}
      <div className="hidden xl:flex absolute right-8 bottom-24 z-20 flex-col items-center gap-8 pointer-events-none">
        <div className="relative h-20 w-20 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-spin-slow origin-center"
          >
            <path
              id="circlePathHero"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[10px] uppercase font-sans font-semibold tracking-[0.2em] fill-marigold">
              <textPath href="#circlePathHero">
                HANDWOVEN · HANDLOVED · MAYURA ·
              </textPath>
            </text>
          </svg>
          <div className="absolute h-2.5 w-2.5 rounded-full bg-marigold shadow-glow" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 16s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
