"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<SVGPathElement>(null);
  const barbsGroupRef = useRef<SVGGElement>(null);
  const eyeGroupRef = useRef<SVGGElement>(null);
  const fanGroupRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counter, setCounter] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const durationMultiplier = prefersReducedMotion ? 0.35 : 1.0;

    // Preload splash assets, hero poster, and first-section images with 4s race timeout
    const assetsToPreload = [
      "/media/logo.svg",
      "/media/hero-poster.webp",
      "/media/mood-wedding.webp",
      "/media/product-01.webp",
    ];
    const preloadPromises = assetsToPreload.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });
    const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 4000));
    Promise.race([Promise.all(preloadPromises), timeoutPromise]);

    // Gold dust particles canvas (max 40 particles)
    const canvas = canvasRef.current;
    let animId: number;
    if (canvas && !prefersReducedMotion) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = Array.from({ length: 36 }, () => ({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 300,
        y: window.innerHeight * 0.6 + Math.random() * 200,
        r: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.5 - 0.5,
        alpha: Math.random() * 0.7 + 0.3,
      }));

      const renderParticles = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.003;
          if (p.alpha <= 0) {
            p.x = window.innerWidth * 0.5 + (Math.random() - 0.5) * 200;
            p.y = window.innerHeight * 0.6 + Math.random() * 100;
            p.alpha = Math.random() * 0.7 + 0.3;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 163, 23, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#F6C65B";
          ctx.fill();
        });
        animId = requestAnimationFrame(renderParticles);
      };
      renderParticles();
    }

    // Counter animation 0 -> 100%
    const counterObj = { val: 0 };
    const counterTween = gsap.to(counterObj, {
      val: 100,
      duration: 2.6 * durationMultiplier,
      ease: "power2.inOut",
      onUpdate: () => {
        setCounter(Math.floor(counterObj.val));
      },
    });

    // Hard fallback timeout: guarantees splash screen will NEVER block or freeze on mobile devices
    const fallbackTimer = setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 3600);

    const masterTl = gsap.timeline({
      onComplete: () => {
        clearTimeout(fallbackTimer);
        setIsDone(true);
        onComplete();
      },
    });

    // 1. Draw quill spine
    if (quillRef.current) {
      const length = quillRef.current.getTotalLength() || 400;
      gsap.set(quillRef.current, { strokeDasharray: length, strokeDashoffset: length });
      masterTl.to(quillRef.current, {
        strokeDashoffset: 0,
        duration: 0.9 * durationMultiplier,
        ease: "power2.out",
      });
    }

    // 1b. Radiate 60+ barb strokes and eye
    if (barbsGroupRef.current) {
      const barbs = barbsGroupRef.current.querySelectorAll("path");
      barbs.forEach((barb) => {
        const l = barb.getTotalLength() || 100;
        gsap.set(barb, { strokeDasharray: l, strokeDashoffset: l });
      });
      masterTl.to(
        barbs,
        {
          strokeDashoffset: 0,
          duration: 0.8 * durationMultiplier,
          stagger: 0.01 * durationMultiplier,
          ease: "power1.out",
        },
        "-=0.5"
      );
    }

    if (eyeGroupRef.current) {
      masterTl.fromTo(
        eyeGroupRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 * durationMultiplier, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }

    // 2. Duplicate feather into a fan of 7 feathers (-60° to +60°)
    if (fanGroupRef.current) {
      const fanFeathers = fanGroupRef.current.querySelectorAll(".fan-feather");
      const angles = [-60, -40, -20, 0, 20, 40, 60];
      fanFeathers.forEach((f, idx) => {
        masterTl.to(
          f,
          {
            rotation: angles[idx],
            opacity: idx === 3 ? 1 : 0.85,
            duration: 0.9 * durationMultiplier,
            ease: "elastic.out(1, 0.6)",
          },
          "fan"
        );
      });
    }

    // 3. MAYURA LOOMS wordmark fades up under fan with tagline
    if (wordmarkRef.current) {
      masterTl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 * durationMultiplier, ease: "power2.out" },
        "-=0.4"
      );
    }

    masterTl.to({}, { duration: 0.4 * durationMultiplier });

    // 4. Exit: central eye of middle feather expands as circular clip-path iris revealing hero (with opacity fade fallback)
    if (containerRef.current) {
      masterTl.to(containerRef.current, {
        clipPath: "circle(0% at 50% 36%)",
        opacity: 0,
        duration: 0.85 * durationMultiplier,
        ease: "power2.inOut",
      });
    }

    return () => {
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(animId);
      counterTween.kill();
      masterTl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      style={{
        clipPath: "circle(150% at 50% 36%)",
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-ivory select-none overflow-hidden touch-none"
    >
      {/* Background Gold Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Fan Group: Scaled down on mobile screens so it never overflows */}
      <div
        ref={fanGroupRef}
        className="relative w-72 h-80 sm:w-80 sm:h-96 flex items-center justify-center -mt-6 sm:-mt-8 scale-[0.78] sm:scale-100 origin-center"
      >
        {[-60, -40, -20, 0, 20, 40, 60].map((_, idx) => (
          <div
            key={idx}
            className="fan-feather absolute inset-0 flex items-center justify-center origin-[50%_90%] will-change-transform"
            style={{
              opacity: idx === 3 ? 1 : 0,
              transform: "rotate(0deg)",
            }}
          >
            <svg
              viewBox="0 0 200 320"
              className="w-56 h-80 overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`barbGrad-${idx}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1F8A86" />
                  <stop offset="100%" stopColor="#0E6B6B" />
                </linearGradient>
              </defs>

              {/* Barbs radiating from spine */}
              <g ref={idx === 3 ? barbsGroupRef : undefined} stroke={`url(#barbGrad-${idx})`} strokeWidth="1.2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const y = 80 + i * 6;
                  const curve = Math.sin((i / 30) * Math.PI) * 25 + 10;
                  return (
                    <g key={i}>
                      {/* Left barb */}
                      <path d={`M 100 ${y} Q ${100 - curve * 0.8} ${y - 12}, ${100 - curve * 1.5} ${y - 20}`} />
                      {/* Right barb */}
                      <path d={`M 100 ${y} Q ${100 + curve * 0.8} ${y - 12}, ${100 + curve * 1.5} ${y - 20}`} />
                    </g>
                  );
                })}
              </g>

              {/* Gold Quill Spine */}
              <path
                ref={idx === 3 ? quillRef : undefined}
                d="M 100 290 Q 99 180, 100 70"
                stroke="#E8A317"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Tip Eye: Concentric Ellipses */}
              <g ref={idx === 3 ? eyeGroupRef : undefined} className="origin-[100px_60px]">
                {/* Outer gold ellipse */}
                <ellipse cx="100" cy="62" rx="28" ry="36" fill="#E8A317" />
                {/* Deep teal */}
                <ellipse cx="100" cy="65" rx="22" ry="28" fill="#0A4A4C" />
                {/* Emerald */}
                <ellipse cx="100" cy="68" rx="16" ry="20" fill="#1F8A86" />
                {/* Ink centre */}
                <ellipse cx="100" cy="71" rx="10" ry="12" fill="#062C30" />
                {/* Marigold core dot */}
                <circle cx="100" cy="73" r="4.5" fill="#F6C65B" />
              </g>
            </svg>
          </div>
        ))}
      </div>

      {/* Wordmark and Tagline: Responsive mobile typography */}
      <div
        ref={wordmarkRef}
        className="relative z-20 flex flex-col items-center text-center mt-4 sm:mt-6 px-4"
      >
        <h2 className="font-heading font-medium tracking-[0.24em] uppercase text-ivory text-2xl sm:text-4xl">
          MAYURA LOOMS
        </h2>
        <p className="mt-1 font-heading italic text-marigold text-base sm:text-xl tracking-wider">
          Woven in Peacock Light
        </p>
      </div>

      {/* Corner Counter 00 -> 100% */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-baseline gap-1 font-mono text-xs font-semibold text-ivory/70">
        <span className="text-marigold text-lg sm:text-xl font-bold font-sans">
          {counter < 10 ? `0${counter}` : counter}
        </span>
        <span>%</span>
      </div>
    </div>
  );
};
