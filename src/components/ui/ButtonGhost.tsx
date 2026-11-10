"use client";

import React from "react";
import clsx from "clsx";

interface ButtonGhostProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export const ButtonGhost: React.FC<ButtonGhostProps> = ({
  children,
  className = "",
  variant = "light",
  size = "md",
  ...props
}) => {
  const sizeStyles = {
    sm: "px-5 py-2.5 text-[11px]",
    md: "px-7 py-3.5 text-[13px]",
    lg: "px-9 py-4 text-[14px]",
  };

  const isLight = variant === "light";

  return (
    <button
      className={clsx(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-semibold tracking-button uppercase cursor-pointer transition-colors duration-300",
        sizeStyles[size],
        isLight
          ? "border border-ivory/40 text-ivory hover:border-ivory"
          : "border border-ink/40 text-ink hover:border-ink",
        className
      )}
      {...props}
    >
      {/* Wipe fill via clip-path */}
      <span
        className={clsx(
          "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          isLight ? "bg-ivory" : "bg-ink",
          "[clip-path:polygon(0_100%,100%_100%,100%_100%,0%_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]"
        )}
      />

      {/* Button label */}
      <span
        className={clsx(
          "relative z-10 transition-colors duration-300",
          isLight ? "group-hover:text-ink" : "group-hover:text-ivory"
        )}
      >
        {children}
      </span>
    </button>
  );
};

