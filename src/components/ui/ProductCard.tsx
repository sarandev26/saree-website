"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart, Plus, Check, Eye } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import clsx from "clsx";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  priority = false,
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [burst, setBurst] = useState(false);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt calculation (±6deg, perspective 1000) throttled with requestAnimationFrame
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (rafId.current !== null) return; // throttle

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) {
        rafId.current = null;
        return;
      }
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const ry = ((x - centerX) / centerX) * 6;
      const rx = -((y - centerY) / centerY) * 6;

      setTilt({ rx, ry });
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id, product);
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className={clsx(
        "group relative flex flex-col transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
    >
      {/* 3D Tilt Wrapper */}
      <div
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-[#FAF7F2] shadow-soft group-hover:shadow-teal transition-shadow duration-300"
      >
        {/* Primary Image - ALWAYS stays visible on hover */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Small In-Card "View" Pill that fades in on hover inside card (fixed to card) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/80 text-ivory backdrop-blur-md px-3 py-1 text-[11px] font-sans font-semibold tracking-wider uppercase">
            <Eye className="w-3 h-3 text-marigold" />
            <span>View Drape</span>
          </span>
        </div>

        {/* Subtle Dark Bottom Gradient for quick add contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Tag Chip */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10">
            <span
              className={clsx(
                "inline-flex items-center rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-sans font-semibold tracking-button uppercase shadow-sm",
                product.badge === "-20%"
                  ? "bg-clay text-ivory"
                  : product.badge === "Signature"
                  ? "bg-marigold text-ink"
                  : "bg-ink/80 text-ivory backdrop-blur-md"
              )}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart with Burst Particle Animation */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-ivory/85 backdrop-blur-md text-ink transition-transform duration-300 hover:scale-110 hover:bg-ivory cursor-pointer"
        >
          <Heart
            className={clsx(
              "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-300",
              inWishlist ? "fill-clay text-clay" : "text-ink"
            )}
          />
          {burst && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <span className="absolute w-2 h-2 rounded-full bg-clay animate-ping opacity-75" />
              <span className="absolute w-6 h-6 rounded-full border border-marigold animate-ping" />
            </div>
          )}
        </button>

        {/* Quick-Add Pill Sliding Up From Bottom (Touch-friendly on mobile, hover on desktop) */}
        <div className="absolute bottom-2.5 sm:bottom-4 inset-x-2.5 sm:inset-x-4 z-10 translate-y-0 sm:translate-y-12 opacity-90 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 ease-out">
          <button
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-ivory/95 py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12px] font-sans font-semibold tracking-button uppercase text-ink shadow-teal hover:bg-marigold transition-colors duration-200 cursor-pointer"
          >
            {added ? (
              <>
                <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-ink stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-ink stroke-[2.5]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="mt-4 flex flex-col gap-1.5 px-1">
        {/* Colour Swatch Dots */}
        <div className="flex items-center gap-1.5">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color}`}
              style={{ backgroundColor: color }}
              className={clsx(
                "h-3.5 w-3.5 rounded-full border border-black/15 transition-transform duration-200 cursor-pointer",
                selectedColor === color ? "scale-125 ring-1 ring-marigold ring-offset-1" : "hover:scale-110"
              )}
            />
          ))}
          <span className="ml-1 text-[11px] font-sans text-charcoal/60 uppercase tracking-widest">
            {product.fabric.split(" ")[0]}
          </span>
        </div>

        {/* Saree Name in Satoshi for clean readability */}
        <h3 className="font-sans text-[1.05rem] font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-teal line-clamp-1">
          {product.name}
        </h3>

        {/* Subtitle / Short Weave */}
        <p className="text-[12px] font-sans text-charcoal/70 line-clamp-1">
          {product.subtitle}
        </p>

        {/* Price in Satoshi */}
        <div className="mt-0.5 flex items-baseline gap-2 font-sans font-semibold text-[14px] text-ink">
          <span>₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="text-[12px] font-normal text-charcoal/45 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
