"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGsapContext } from "@/hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/lib/cart-context";
import { Sparkles, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import clsx from "clsx";

export interface SpotlightVariant {
  id: string;
  colorName: string;
  hex: string;
  bgTint: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  fabric: string;
  weave: string;
  care: string;
  image: string; // full
  detailImage: string; // detail
  specs: string[];
}

export const SPOTLIGHT_VARIANTS_4: SpotlightVariant[] = [
  {
    id: "ivory",
    colorName: "Ivory Noor",
    hex: "#FBF6EC",
    bgTint: "#161412",
    title: "Ivory Organza Silk Saree",
    subtitle: "Sheer Floral Poetry",
    price: 2699,
    originalPrice: 3599,
    fabric: "Korean Silk Organza with Antique Gold Zari",
    weave: "Artisanal Hand-Painted Floral Organza",
    care: "Dry Clean Only. Air in shade.",
    image: "/media/spot-ivory-full.webp",
    detailImage: "/media/spot-ivory-detail.webp",
    specs: ["Weight: 280g", "Zari: Tested Antique Gold", "Pallu: 0.8m Scalloped", "Blouse: Included Unstitched"],
  },
  {
    id: "rose",
    colorName: "Gulabi Rose",
    hex: "#F3DCD2",
    bgTint: "#221218",
    title: "Pink Organza Silk Saree",
    subtitle: "Romantic Dusk Silhouette",
    price: 2799,
    originalPrice: 3699,
    fabric: "Whisper Silk Organza with Rose-Gold Thread",
    weave: "Scalloped Wire Cut-Work",
    care: "Dry Clean Only. Avoid direct heat.",
    image: "/media/spot-rose-full.webp",
    detailImage: "/media/spot-rose-detail.webp",
    specs: ["Weight: 290g", "Zari: Rose-Gold Electroplated", "Pallu: Hand-Gilded Finish", "Blouse: 1m Heavy Silk"],
  },
  {
    id: "emerald",
    colorName: "Mayura Emerald",
    hex: "#0E6B6B",
    bgTint: "#061D1A",
    title: "Emerald Kanjivaram Saree",
    subtitle: "Opulent Regal Drama",
    price: 5499,
    originalPrice: 6999,
    fabric: "Pure Organza Silk with Deep Forest Dye",
    weave: "Dense Metallic Brocade Border",
    care: "Dry Clean Only. Store in muslin bag.",
    image: "/media/spot-emerald-full.webp",
    detailImage: "/media/spot-emerald-detail.webp",
    specs: ["Weight: 310g", "Zari: Pure Zari Brocade", "Pallu: 1.2m Korvai", "Blouse: Contrast Magenta Silk"],
  },
  {
    id: "saffron",
    colorName: "Kesariya Saffron",
    hex: "#E8A317",
    bgTint: "#1E1408",
    title: "Saffron Kanjivaram Saree",
    subtitle: "Sacred Festive Flame",
    price: 4999,
    originalPrice: 6299,
    fabric: "Pure Organza Silk with Deep Saffron Dye",
    weave: "Dense Metallic Brocade Border",
    care: "Dry Clean Only. Store in muslin bag.",
    image: "/media/spot-saffron-full.webp",
    detailImage: "/media/spot-saffron-detail.webp",
    specs: ["Weight: 300g", "Zari: Molten Gold Kadwa", "Pallu: 1m Golden Jaal", "Blouse: Pure Brocade"],
  },
];

export const SpotlightSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeThumbType, setActiveThumbType] = useState<"full" | "detail">("full");
  const [displayedPrice, setDisplayedPrice] = useState(2699);
  const [selectedSize, setSelectedSize] = useState<"free" | "stitched">("free");
  const [quantity, setQuantity] = useState(1);

  const { addToCart, setIsCartOpen, toggleWishlist, isInWishlist } = useCart();
  const activeVariant = SPOTLIGHT_VARIANTS_4[activeIndex];
  const inWishlist = isInWishlist(`spotlight-${activeVariant.id}`);

  // Counting animation on price change
  useEffect(() => {
    const targetPrice = activeVariant.price;
    const priceObj = { val: displayedPrice };
    const tween = gsap.to(priceObj, {
      val: targetPrice,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => setDisplayedPrice(Math.floor(priceObj.val)),
    });
    return () => {
      tween.kill();
    };
  }, [activeIndex]);

  useGsapContext(
    () => {
      if (typeof window === "undefined" || !containerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const container = containerRef.current;
      const badge = badgeRef.current;

      const mm = gsap.matchMedia();

      // Only pin and scrub on desktop (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        const pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top top+=72px",
          end: "+=260%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            let idx = 0;
            if (progress > 0.75) idx = 3;
            else if (progress > 0.5) idx = 2;
            else if (progress > 0.25) idx = 1;
            setActiveIndex(idx);

            if (badge) {
              const vel = Math.abs(self.getVelocity());
              const rotationBoost = Math.min(vel * 0.08, 12);
              gsap.to(badge, { rotation: `+=${rotationBoost}`, duration: 0.2 });
            }
          },
        });

        scrollTriggerRef.current = pinTrigger;
      });

      // On mobile (< 1024px): Absolutely no pinning or scroll hijacking
      mm.add("(max-width: 1023px)", () => {
        scrollTriggerRef.current = null;
        gsap.set(container, { clearProps: "all" });
      });

      return () => {
        mm.revert();
      };
    },
    containerRef,
    []
  );

  const handleSwatchSelect = (index: number) => {
    setActiveIndex(index);
    setActiveThumbType("full");

    // Only scroll the pinned trigger on desktop web (>= 1024px). On mobile, simple color tap updates image!
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const trigger = scrollTriggerRef.current;
      if (trigger) {
        const scrollProgressTarget = index / 3.2;
        const targetScroll = trigger.start + scrollProgressTarget * (trigger.end - trigger.start);
        // @ts-ignore
        if (window.__lenis) {
          // @ts-ignore
          window.__lenis.scrollTo(targetScroll, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    }
  };

  const handleAddToCart = () => {
    const finalPrice = selectedSize === "stitched" ? activeVariant.price + 499 : activeVariant.price;
    addToCart(
      {
        id: `spotlight-${activeVariant.id}`,
        name: activeVariant.title,
        subtitle: `${activeVariant.colorName} · ${selectedSize === "stitched" ? "Stitched Blouse" : "Free Size"}`,
        fabric: activeVariant.fabric,
        price: finalPrice,
        originalPrice: activeVariant.originalPrice,
        image: activeVariant.image,
        altImage: activeVariant.detailImage,
        colors: [activeVariant.hex],
        description: activeVariant.fabric,
        weave: activeVariant.weave,
        care: activeVariant.care,
        category: "new",
      },
      quantity
    );
    setIsCartOpen(true);
  };

  return (
    <section
      id="spotlight"
      ref={containerRef}
      data-nav-theme="dark"
      style={{
        backgroundColor: activeVariant.bgTint,
        transition: "background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="relative w-full h-auto lg:h-[calc(100vh-var(--nav-h))] text-ivory flex items-center justify-center select-none overflow-hidden pt-6 pb-6"
    >
      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
        {/* Left: Swatches & Full/Detail Thumbnails */}
        <div className="flex flex-col gap-5 order-2 lg:order-1 items-center lg:items-start shrink-0">
          {/* 4 Swatch Circles */}
          <div className="flex lg:flex-col items-center gap-3">
            {SPOTLIGHT_VARIANTS_4.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => handleSwatchSelect(idx)}
                aria-label={`Select ${v.colorName}`}
                className={clsx(
                  "h-10 w-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer",
                  activeIndex === idx
                    ? "border-marigold scale-110 shadow-glow"
                    : "border-ivory/30 opacity-70 hover:opacity-100"
                )}
                style={{ backgroundColor: v.hex }}
              >
                {activeIndex === idx && (
                  <span className="h-2 w-2 rounded-full bg-ink" />
                )}
              </button>
            ))}
          </div>

          {/* Active Colourway 2 Images (Full & Macro Detail) */}
          <div className="flex lg:flex-col items-center gap-2 pt-2 border-t border-ivory/15">
            <button
              onClick={() => setActiveThumbType("full")}
              className={clsx(
                "relative h-16 w-12 rounded-[10px] overflow-hidden border-2 transition-all cursor-pointer",
                activeThumbType === "full" ? "border-marigold" : "border-ivory/20 opacity-60"
              )}
            >
              <Image
                src={activeVariant.image}
                alt={`${activeVariant.title} Full View`}
                fill
                className="object-cover object-top"
              />
            </button>
            <button
              onClick={() => setActiveThumbType("detail")}
              className={clsx(
                "relative h-16 w-12 rounded-[10px] overflow-hidden border-2 transition-all cursor-pointer",
                activeThumbType === "detail" ? "border-marigold" : "border-ivory/20 opacity-60"
              )}
            >
              <Image
                src={activeVariant.detailImage}
                alt={`${activeVariant.title} Macro Detail`}
                fill
                className="object-cover object-top"
              />
            </button>
          </div>

          {/* Progress Indicator 01/04 */}
          <div className="hidden lg:flex items-center gap-1 font-mono text-xs text-marigold">
            <span>0{activeIndex + 1}</span>
            <span className="text-ivory/30">/</span>
            <span className="text-ivory/30">04</span>
          </div>
        </div>

        {/* Center: Fixed-Ratio Frame (Aspect 3:4, max-height below navbar) with Clip-Path Stacked Wipe */}
        <div className="relative aspect-[3/4] w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] max-h-[calc(100vh-var(--nav-h)-64px)] rounded-[24px] overflow-hidden shadow-teal bg-ink/70 border border-ivory/15 order-1 lg:order-2 shrink-0">
          {SPOTLIGHT_VARIANTS_4.map((v, idx) => {
            const isCurrent = activeIndex === idx;
            const imgSrc = activeThumbType === "full" ? v.image : v.detailImage;
            return (
              <div
                key={v.id}
                style={{
                  clipPath: isCurrent
                    ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                    : "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                  transition: "clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={imgSrc}
                  alt={v.title}
                  fill
                  priority={idx <= 1}
                  className="object-cover object-top"
                />
              </div>
            );
          })}

          {/* Colorway Badge */}
          <div className="absolute top-5 left-5 z-10 rounded-full bg-ink/80 backdrop-blur-md px-3.5 py-1.5 border border-ivory/15 flex items-center gap-2">
            <span
              style={{ backgroundColor: activeVariant.hex }}
              className="h-2.5 w-2.5 rounded-full border border-white/40"
            />
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-ivory">
              {activeVariant.colorName}
            </span>
          </div>
        </div>

        {/* Right: Product Details, Size Selector, Quantity, and ADD TO BAG Button */}
        <div className="flex flex-col max-w-md w-full order-3">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-marigold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SAREE OF THE SEASON</span>
          </div>

          {/* Simple readable name in Satoshi font */}
          <h3 className="font-sans text-3xl sm:text-4xl font-bold text-ivory leading-tight transition-opacity duration-300">
            {activeVariant.title}
          </h3>

          <p className="font-sans text-base text-marigold/90 font-medium mt-1">
            {activeVariant.subtitle}
          </p>

          {/* Counting Price Animation with Struck-Through Original Price */}
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-sans font-bold text-3xl sm:text-4xl text-ivory">
              ₹{displayedPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-sans text-ivory/45 line-through">
              ₹{activeVariant.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="rounded-full bg-clay px-2.5 py-0.5 text-[11px] font-sans font-bold text-ivory">
              -25%
            </span>
          </div>

          {/* Size Selector */}
          <div className="mt-5 flex flex-col gap-2">
            <span className="text-xs font-sans uppercase tracking-wider text-ivory/70">
              Select Custom Drape Option:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans font-semibold">
              <button
                onClick={() => setSelectedSize("free")}
                className={clsx(
                  "py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer",
                  selectedSize === "free"
                    ? "border-marigold bg-marigold/15 text-ivory"
                    : "border-ivory/20 text-ivory/70 hover:border-ivory/40"
                )}
              >
                Free Size (Unstitched)
              </button>
              <button
                onClick={() => setSelectedSize("stitched")}
                className={clsx(
                  "py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer",
                  selectedSize === "stitched"
                    ? "border-marigold bg-marigold/15 text-ivory"
                    : "border-ivory/20 text-ivory/70 hover:border-ivory/40"
                )}
              >
                With Stitched Blouse (+₹499)
              </button>
            </div>
          </div>

          {/* Quantity Stepper & Add to Bag Action Row */}
          <div className="mt-5 flex items-center gap-3">
            {/* Stepper */}
            <div className="flex items-center rounded-full border border-ivory/20 bg-ivory/5 px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-ivory/10 text-ivory transition-colors cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center font-sans font-bold text-sm text-ivory">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-ivory/10 text-ivory transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Wishlist Heart */}
            <button
              onClick={() => toggleWishlist(`spotlight-${activeVariant.id}`)}
              aria-label="Save to wishlist"
              className={clsx(
                "h-11 w-11 flex items-center justify-center rounded-full border border-ivory/20 transition-all cursor-pointer",
                inWishlist
                  ? "bg-clay text-ivory border-clay"
                  : "bg-ivory/5 text-ivory hover:border-marigold hover:text-marigold"
              )}
            >
              <Heart className={clsx("h-4 w-4", inWishlist && "fill-ivory")} />
            </button>

            {/* Large Primary Marigold ADD TO BAG Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-marigold py-3 px-6 text-xs sm:text-sm font-sans font-bold tracking-button uppercase text-ink shadow-teal hover:bg-ivory transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.4]" />
              <span>ADD TO BAG</span>
            </button>
          </div>

          {/* Specs & Weave */}
          <div className="mt-5 flex flex-col gap-2 py-3 border-t border-ivory/15 text-xs font-sans">
            <div className="flex items-center justify-between text-ivory/80">
              <span className="text-ivory/50">Fabric:</span>
              <span className="font-medium text-right">{activeVariant.fabric}</span>
            </div>
            <div className="flex items-center justify-between text-ivory/80">
              <span className="text-ivory/50">Weave:</span>
              <span className="font-medium text-right">{activeVariant.weave}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Circular Badge Bottom-Right (Desktop shortcut only, hidden on mobile so it doesn't float over other sections) */}
      <button
        ref={badgeRef}
        onClick={handleAddToCart}
        aria-label="Add spotlight saree to bag"
        className="hidden lg:flex absolute bottom-6 right-6 z-30 h-24 w-24 rounded-full bg-clay text-ivory shadow-teal items-center justify-center hover:scale-105 transition-transform cursor-pointer select-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-badge">
          <path
            id="badgePathSpotlight"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
          <text className="text-[10px] uppercase font-sans font-bold tracking-[0.22em] fill-ivory">
            <textPath href="#badgePathSpotlight">
              ADD TO BAG • ADD TO BAG •
            </textPath>
          </text>
        </svg>
        <div className="absolute flex items-center justify-center h-8 w-8 rounded-full bg-ivory text-clay font-bold text-base shadow-sm">
          +
        </div>
      </button>

      <style jsx>{`
        @keyframes spinBadge {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-badge {
          animation: spinBadge 10s linear infinite;
        }
      `}</style>
    </section>
  );
};
