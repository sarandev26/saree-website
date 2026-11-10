"use client";

import React from "react";

export const AnnouncementBar: React.FC = () => {
  const text =
    "NEW DROP · UP TO 40% OFF · FREE SHIPPING ACROSS INDIA · HANDWOVEN, ETHICALLY SOURCED · 24K GOLD ZARI CERTIFIED · ";

  return (
    <div
      role="region"
      aria-label="Promotional announcements"
      className="hidden md:flex relative z-[60] h-[36px] w-full overflow-hidden bg-ink text-ivory/90 border-b border-ivory/10 items-center select-none"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap text-[11px] font-sans font-semibold tracking-widest uppercase">
        <span className="mx-4 text-marigold">{text}</span>
        <span className="mx-4 text-marigold">{text}</span>
        <span className="mx-4 text-marigold">{text}</span>
        <span className="mx-4 text-marigold">{text}</span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
