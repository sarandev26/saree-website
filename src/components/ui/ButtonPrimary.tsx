"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  icon = true,
  className = "",
  onClick,
  size = "md",
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull within 40px radius
    const maxPull = 12;
    const pullX = (distanceX / (rect.width / 2)) * maxPull;
    const pullY = (distanceY / (rect.height / 2)) * maxPull;

    setOffset({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: "px-5 py-2.5 text-[11px]",
    md: "px-7 py-3.5 text-[13px]",
    lg: "px-9 py-4 text-[14px]",
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.22s cubic-bezier(0.2, 0, 0, 1)",
      }}
      className={clsx(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-sans font-semibold tracking-button uppercase cursor-pointer select-none",
        "bg-marigold text-ink shadow-sm transition-colors duration-300",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Wipe fill to ink on hover */}
      <span className="absolute inset-0 bg-ink translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full" />

      {/* Button label */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-ivory">
        {children}
      </span>

      {/* Slide-in arrow icon */}
      {icon && (
        <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-marigold">
          <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
        </span>
      )}
    </button>
  );
};

