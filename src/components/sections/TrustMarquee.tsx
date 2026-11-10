"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const TrustMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const TRUST_ITEMS = [
    "Zari tested & certified",
    "Made-to-drape blouse stitching",
    "Easy 7-day returns",
    "Handwoven silk",
    "Free shipping across India",
    "Authenticity guaranteed",
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !trackRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    let xPos = 0;
    let direction = 1; // 1 = left, -1 = right
    let speed = 1.2;

    // Detect scroll direction & velocity
    const scrollTriggerInstance = ScrollTrigger.create({
      onUpdate: (self) => {
        // Flip direction on scroll up / down
        direction = self.direction === 1 ? 1 : -1;
        // Velocity-reactive speed boost
        const velocity = Math.abs(self.getVelocity());
        speed = 1.2 + Math.min(velocity / 400, 4.0);
      },
    });

    let animationFrameId: number;

    const loop = () => {
      // Base natural movement
      speed += (1.2 - speed) * 0.05; // ease back to base speed
      xPos -= speed * direction;

      // Wrap around width
      const width = track.scrollWidth / 2;
      if (xPos <= -width) {
        xPos = 0;
      } else if (xPos > 0) {
        xPos = -width;
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="relative z-20 w-full overflow-hidden bg-ink py-4 sm:py-5 border-y border-marigold/30 select-none shadow-md"
    >
      <div
        ref={trackRef}
        className="flex w-max items-center whitespace-nowrap will-change-transform"
      >
        {/* Doubled for seamless loop */}
        {[...Array(2)].map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center">
            {TRUST_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center mx-5 sm:mx-8">
                <span className="font-sans font-bold text-[12px] sm:text-[14px] uppercase tracking-[0.18em] text-marigold">
                  {item}
                </span>
                <span className="ml-5 sm:ml-8 text-marigold-lt text-sm">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

