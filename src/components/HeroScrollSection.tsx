"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// STORY BEATS (Transitions dynamically as user scrolls)
// No Phase / Page numbers — clean luxury boutique text
// ─────────────────────────────────────────────────────────────
export interface StoryBeat {
  id: string;
  start: number; // progress 0.0 to 1.0
  end: number;   // progress 0.0 to 1.0
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export const DEFAULT_BEATS: StoryBeat[] = [
  {
    id: "beat-1",
    start: 0.0,
    end: 0.32,
    title: "Every Drape, An Heirloom",
    description:
      "Handwoven pure silks and modern drapes from India's finest master looms, crafted to command attention from the very first glance.",
    ctaText: "Explore Collections",
    ctaHref: "#six-moods",
  },
  {
    id: "beat-2",
    start: 0.35,
    end: 0.67,
    title: "Poetry In Motion",
    description:
      "Pure mulberry katan silk paired with 24k electroplated silver-gilt zari. Draped for women who command every room with effortless poise.",
    ctaText: "Discover The Drape",
    ctaHref: "#six-moods",
  },
  {
    id: "beat-3",
    start: 0.70,
    end: 1.0,
    title: "Consecrated For Generations",
    description:
      "Up to 14,000 jacquard punch cards consecrated for a single bridal masterpiece. An unforgettable presence from the aisle to the banquet.",
    ctaText: "Explore All Edits",
    ctaHref: "#six-moods",
  },
];

export interface HeroScrollSectionProps {
  /** Path to your MP4 video */
  videoSrc?: string;
  /** Optional poster image shown before video load */
  posterSrc?: string;
  /** Total scroll distance in vh (460vh provides gentle, leisurely scroll speed) */
  scrollDistanceVh?: number;
  /** Custom story beats (optional) */
  beats?: StoryBeat[];
  /** Callback when scrolling past the hero sequence */
  onPastHeroChange?: (isPast: boolean) => void;
  onExploreClick?: () => void;
  onStylingCallClick?: () => void;
}

export default function HeroScrollSection({
  videoSrc = "/media/hero.mp4",
  posterSrc = "/media/hero-poster.webp",
  scrollDistanceVh = 460, // 460vh provides a smooth, unhurried scroll pace
  beats = DEFAULT_BEATS,
  onPastHeroChange,
  onExploreClick,
  onStylingCallClick,
}: HeroScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Active beat index for dynamic text transitions
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [beatOpacity, setBeatOpacity] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Detect mobile / touch devices
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth <= 840 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    // 1. Initialize Lenis Smooth Scroll with gentle, luxurious damping (lerp: 0.05)
    let lenis = (typeof window !== "undefined" && (window as unknown as { __lenis?: Lenis }).__lenis) as Lenis | undefined;
    let localLenis = false;
    let tickerCb: ((time: number) => void) | null = null;

    if (!lenis) {
      lenis = new Lenis({
        lerp: 0.05, // Lower lerp = buttery smooth, gentle gliding
        duration: 1.5,
        wheelMultiplier: 0.75, // Cushions fast wheel ticks so it doesn't rush
        smoothWheel: true,
        syncTouch: false,
      });
      localLenis = true;
      lenis.on("scroll", ScrollTrigger.update);
      tickerCb = (time: number) => {
        if (lenis) lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    }

    // 2. Mobile Autoplay & Touch Policy Unlock
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    const unlockMedia = () => {
      if (video.readyState === 0) {
        try {
          video.load();
        } catch {}
      }
      video
        .play()
        .then(() => {
          if (!isMobile) video.pause();
        })
        .catch(() => {});
    };

    window.addEventListener("touchstart", unlockMedia, { once: true, passive: true });
    window.addEventListener("pointerdown", unlockMedia, { once: true, passive: true });

    let targetTime = 0;
    let smoothedTime = 0;
    let lastSeekTime = 0;

    // 3. ScrollTrigger binding
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        const dur = video.duration && !isNaN(video.duration) ? video.duration : 9.96;
        targetTime = p * Math.max(0, dur - 0.05);

        // Dynamically find and fade text beats with gentle bell curve
        let foundIdx = -1;
        for (let i = 0; i < beats.length; i++) {
          const b = beats[i];
          if (p >= b.start && p <= b.end) {
            foundIdx = i;
            break;
          }
        }

        if (foundIdx !== -1) {
          setActiveBeatIndex(foundIdx);
          const currentBeat = beats[foundIdx];
          const span = currentBeat.end - currentBeat.start;
          const localP = (p - currentBeat.start) / span;
          // Smooth bell-curve opacity: fades in at start, holds, fades out near edges
          const op = Math.min(1, Math.min(localP * 3.5, (1 - localP) * 3.5));
          setBeatOpacity(Math.max(0, op));
        } else {
          setBeatOpacity(0);
        }

        // Notify parent if hero sequence has completed
        const pastHero = p >= 0.95;
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

    // 4. RAF Ticker: Smooth exponential lerp frame tracking for desktop + reliable mobile playback
    let rafId: number;
    const tick = () => {
      const now = performance.now();
      const inView = ScrollTrigger.isInViewport(container);
      const dur = video.duration && !isNaN(video.duration) ? video.duration : 9.96;

      if (isMobile) {
        // MOBILE ENGINE: Auto-plays in view, unlocks immediately, never gets stuck
        if (inView) {
          if (video.paused) {
            video.play().catch(() => {});
          }
          const diff = Math.abs(video.currentTime - targetTime);
          if (diff > 1.2 && !video.seeking && now - lastSeekTime > 250) {
            lastSeekTime = now;
            video.currentTime = Math.min(dur - 0.05, targetTime);
          }
        } else {
          if (!video.paused) video.pause();
        }
      } else {
        // DESKTOP ENGINE: Buttery-smooth exponential decay lerp for video scrubbing
        if (video.readyState >= 1) {
          const diff = targetTime - smoothedTime;
          if (Math.abs(diff) > 0.003) {
            smoothedTime += diff * 0.12; // Continuous smooth frame transition
            if (!video.seeking && now - lastSeekTime > 30) {
              lastSeekTime = now;
              video.currentTime = Math.min(dur - 0.05, Math.max(0, smoothedTime));
            }
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("touchstart", unlockMedia);
      window.removeEventListener("pointerdown", unlockMedia);
      st.kill();
      if (localLenis && lenis) {
        if (tickerCb) gsap.ticker.remove(tickerCb);
        lenis.destroy();
      }
    };
  }, [beats, onPastHeroChange]);

  const activeBeat = beats[activeBeatIndex] || beats[0];

  return (
    <div
      ref={containerRef}
      id="hero"
      data-nav-theme="dark"
      style={{
        position: "relative",
        height: `${scrollDistanceVh}vh`,
        width: "100%",
        backgroundColor: "#062C30",
        zIndex: 10,
      }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          preload="auto"
          autoPlay
          muted
          playsInline
          loop={false}
          controls={false}
          disablePictureInPicture
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
          }}
        />

        {/* Cinematic Vignette & Ambient Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 35%, rgba(6,44,48,0.7) 100%), linear-gradient(to bottom, rgba(6,44,48,0.45) 0%, transparent 25%, transparent 70%, rgba(6,44,48,0.92) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Refined & Readable Content Overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            padding: "clamp(1.5rem, 4.5vw, 4rem)",
            pointerEvents: "none",
          }}
        >
          {/* Frosted Luxury Card for 100% Guaranteed Contrast & Legibility */}
          <div
            style={{
              maxWidth: "560px",
              width: "100%",
              opacity: beatOpacity,
              transform: `translateY(${(1 - beatOpacity) * 14}px)`,
              transition: "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "opacity, transform",
              backgroundColor: "rgba(6, 44, 48, 0.52)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(232, 163, 23, 0.22)",
              borderRadius: "16px",
              padding: "clamp(1.25rem, 3vw, 2rem)",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.55)",
            }}
          >
            {/* Controlled, Balanced Title with Generous Letter Spacing */}
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.3rem)",
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: "0.07em", // Wide letter-spacing for effortless readability
                color: "#ffffff",
                margin: "0 0 0.85rem 0",
                textShadow: "0 2px 16px rgba(0,0,0,0.85)",
                fontFamily: "var(--font-anton), var(--font-body), sans-serif",
                textTransform: "uppercase",
              }}
            >
              {activeBeat.title}
            </h2>

            {/* Refined Description with Comfortable Letter Spacing & Line Height */}
            <p
              style={{
                fontSize: "clamp(0.92rem, 1.2vw, 1.05rem)",
                lineHeight: 1.7,
                letterSpacing: "0.035em", // Space between letters as requested
                color: "#FAF7F2",
                opacity: 0.95,
                margin: "0 0 1.25rem 0",
                textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              }}
            >
              {activeBeat.description}
            </p>

            {/* Call-To-Action Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              {activeBeat.ctaText && (
                <a
                  href={activeBeat.ctaHref || "#six-moods"}
                  onClick={(e) => {
                    if (onExploreClick && activeBeat.ctaHref === "#six-moods") {
                      e.preventDefault();
                      onExploreClick();
                    }
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.7rem 1.5rem",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#062C30",
                    background: "linear-gradient(135deg, #E8A317, #F6C65B)",
                    borderRadius: "8px",
                    textDecoration: "none",
                    pointerEvents: "auto",
                    boxShadow: "0 4px 18px rgba(232, 163, 23, 0.35)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  {activeBeat.ctaText} →
                </a>
              )}

              {activeBeatIndex === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (onStylingCallClick) onStylingCallClick();
                    else alert("Connecting you to a Mayura Looms bridal draping stylist...");
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.68rem 1.4rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    color: "#FAF7F2",
                    background: "rgba(251, 246, 236, 0.12)",
                    border: "1px solid rgba(251, 246, 236, 0.28)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    backdropFilter: "blur(8px)",
                    transition: "background 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(251, 246, 236, 0.22)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(251, 246, 236, 0.12)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  Book a Styling Call
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroScrollSection };
