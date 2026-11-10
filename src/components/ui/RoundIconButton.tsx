"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

interface RoundIconButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
  label?: string;
}

export const RoundIconButton: React.FC<RoundIconButtonProps> = ({
  onClick,
  className = "",
  size = 56,
  label = "Explore item",
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={clsx(
        "group relative flex items-center justify-center rounded-full bg-marigold text-ink shadow-sm transition-all duration-300 hover:scale-105 hover:bg-ink hover:text-marigold",
        className
      )}
    >
      <ArrowUpRight
        className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45"
        strokeWidth={2.4}
      />
    </button>
  );
};

