"use client";

import React from "react";
import clsx from "clsx";

interface WavyDividerProps {
  fillColor: string; // e.g. '#062C30' (ink) or '#FBF6EC' (ivory) or '#F3DCD2' (blush)
  variant?: 1 | 2;
  inverted?: boolean;
  className?: string;
}

export const WavyDivider: React.FC<WavyDividerProps> = ({
  fillColor,
  variant = 1,
  inverted = false,
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden leading-none z-10 pointer-events-none -my-[1px]",
        inverted && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        {variant === 1 ? (
          // Elegant sweeping gentle S-curve wave
          <path
            d="M0 48C240 80 480 84 720 48C960 12 1200 16 1440 48V84H0V48Z"
            fill={fillColor}
          />
        ) : (
          // Fluid double swell wave
          <path
            d="M0 32C180 72 360 80 540 52C720 24 900 12 1080 38C1260 64 1350 72 1440 50V84H0V32Z"
            fill={fillColor}
          />
        )}
      </svg>
    </div>
  );
};

