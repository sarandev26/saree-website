"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface ArchCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  count?: string;
  gradient?: string;
  className?: string;
  offsetY?: number;
  objectPosition?: string;
  onClick?: () => void;
}

export const ArchCard: React.FC<ArchCardProps> = ({
  title,
  subtitle,
  description,
  image,
  count,
  gradient = "from-ink/90 via-ink/30 to-transparent",
  className = "",
  offsetY = 0,
  objectPosition = "object-top",
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
      className={clsx(
        "group relative flex flex-col w-[270px] sm:w-[310px] md:w-[340px] shrink-0 cursor-pointer select-none transition-transform duration-500 hover:-translate-y-2",
        className
      )}
    >
      {/* Arch-Masked Image Container (999px 999px 0 0) */}
      <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-t-[999px] rounded-b-[24px] bg-ink/50 shadow-soft group-hover:shadow-teal transition-all duration-500 border border-ivory/15">
        {/* Inner Image with face uncropped and breathing room inside arch */}
        <div className="relative h-full w-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105 pt-2">
          <Image
            src={image}
            alt={title}
            fill
            sizes="340px"
            className={clsx("object-cover", objectPosition)}
            priority
          />
        </div>

        {/* Distinct Tinted Gradient Overlay */}
        <div className={clsx("absolute inset-0 bg-gradient-to-t opacity-45 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none", gradient)} />

        {/* Permanent Bottom Gradient Strip with Mood Name (Satoshi 700) & Caption (14px) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-ink via-ink/85 to-transparent flex flex-col items-center text-center z-10 pointer-events-none">
          {count && (
            <span className="mb-1.5 rounded-full bg-ink/85 border border-marigold/35 px-2.5 py-0.5 text-[10px] font-sans font-semibold tracking-button uppercase text-marigold backdrop-blur-md shadow-sm">
              {count}
            </span>
          )}
          <h3 className="font-sans font-bold text-[17px] md:text-[18px] text-ivory tracking-wide leading-tight">
            {title}
          </h3>
          <p className="font-sans text-[14px] text-marigold font-medium line-clamp-1 mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
