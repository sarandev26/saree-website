"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { BRIDAL_PRODUCTS } from "@/lib/data";
import { WavyDivider } from "../ui/WavyDivider";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { Plus, Eye, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const BridalSection: React.FC = () => {
  const { addToCart } = useCart();
  const frameRef = useRef<SVGRectElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop && currentIndex > 2) {
        setCurrentIndex(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  const maxIndex = isDesktop ? 2 : 4;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="bridal-collection"
      data-nav-theme="dark"
      className="relative w-full bg-teal-deep text-ivory py-20 md:py-28 select-none overflow-hidden"
    >
      {/* Top Wavy Divider matching Deep Teal (#0A4A4C) from Ivory */}
      <div className="absolute top-0 left-0 right-0 h-14 overflow-hidden pointer-events-none">
        <WavyDivider fillColor="#0A4A4C" variant={2} />
      </div>

      <div className="max-w-layout mx-auto px-5 sm:px-8 md:px-12 pt-8">
        {/* 2-Column Grid: 4 cols Left, 8 cols Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: CSS Sticky Hero Frame */}
          <div className="w-full lg:col-span-4 lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-[24px] overflow-hidden shadow-teal bg-[#FAF7F2] border border-ivory/15">
              <Image
                src="/media/bridal-hero.webp"
                alt="Mayura Looms Bride in Heirloom Red & Gold Banarasi Silk Saree"
                fill
                priority
                className="object-cover"
              />

              {/* Decorative Gold Frame */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none p-3">
                <rect
                  ref={frameRef}
                  x="4"
                  y="4"
                  width="calc(100% - 8px)"
                  height="calc(100% - 8px)"
                  rx="20"
                  fill="none"
                  stroke="#E8A317"
                  strokeWidth="1.8"
                />
              </svg>

              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 p-4 rounded-[16px] bg-ink/85 backdrop-blur-md border border-ivory/15">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-marigold">
                  ROYAL ATELIER ARCHIVE
                </span>
                <h4 className="font-heading text-xl text-ivory">The Auspicious Sindoor</h4>
                <p className="text-xs text-ivory/70 font-sans mt-0.5">
                  Pure Katan Silk · 24k Tested Zari
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Counter, Arrows, and Exactly 3 Cards visible track */}
          <div className="w-full lg:col-span-8 flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block h-[1px] w-8 bg-marigold" />
              <span className="font-sans text-[12px] font-semibold tracking-eyebrow uppercase text-marigold">
                SACRED WEDDING ATELIER
              </span>
            </div>

            <h2 className="font-display uppercase text-[clamp(2.5rem,5.5vw,4.8rem)] tracking-tightest leading-[0.9] text-ivory">
              BRIDAL{" "}
              <span className="font-heading italic font-normal text-marigold lowercase capitalize">
                Collection
              </span>
            </h2>

            <p className="mt-4 font-sans text-base text-ivory/80 max-w-xl leading-relaxed">
              Every drape in our bridal trousseau is consecrated with blessings.
              Hand-guided shuttles, 24k electroplated gold wire, and pure mulberry silks
              woven over hundreds of artisan hours in Varanasi and Kanchipuram.
            </p>

            {/* Scroller Controls: Counter "1–3 of 5" & Smooth Arrow Buttons */}
            <div className="mt-8 flex items-center justify-between pb-2 border-b border-ivory/15">
              <span className="text-xs font-sans uppercase tracking-button text-marigold font-bold">
                {isDesktop
                  ? `${currentIndex + 1}–${Math.min(currentIndex + 3, 5)} of 5`
                  : `${currentIndex + 1} of 5`}
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous bridal saree"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold text-ink hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  aria-label="Next bridal saree"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-marigold text-ink hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Exactly 3 Cards Track on Desktop: overflow-hidden container, card width = calc((100% - 40px)/3), gap 20px */}
            <div
              className="relative w-full overflow-hidden mt-6"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                style={{
                  transform: isDesktop
                    ? `translateX(calc(-${currentIndex} * ((100% + 20px) / 3)))`
                    : `translateX(calc(-${currentIndex} * (100% + 16px)))`,
                  transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="flex gap-4 lg:gap-[20px] will-change-transform"
              >
                {BRIDAL_PRODUCTS.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      width: isDesktop ? "calc((100% - 40px) / 3)" : "100%",
                      minWidth: isDesktop ? "calc((100% - 40px) / 3)" : "100%",
                    }}
                    className="relative shrink-0 rounded-[20px] overflow-hidden bg-ivory/5 border border-ivory/15 p-3 flex flex-col group shadow-sm hover:border-marigold/60 transition-colors"
                  >
                    <div className="relative aspect-[3/4] w-full rounded-[14px] overflow-hidden bg-[#FAF7F2]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-clay px-2 py-0.5 text-[9px] font-sans font-bold uppercase tracking-wider text-ivory">
                        {item.tag}
                      </span>

                      {/* In-Card Hover View Pill */}
                      <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink/80 text-ivory px-2 py-0.5 text-[9px] font-sans font-semibold tracking-wider uppercase">
                          <Eye className="w-3 h-3 text-marigold" />
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Satoshi font for product name: 15px */}
                        <h4 className="font-sans text-[15px] font-semibold text-ivory line-clamp-1 leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-[12px] font-sans text-ivory/60 truncate block mt-0.5">
                          {item.fabric}
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-ivory/10">
                        {/* Price in Satoshi: 14px */}
                        <div className="flex items-baseline gap-1.5 font-sans">
                          <span className="font-semibold text-[14px] text-marigold">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[11px] text-ivory/40 line-through">
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            addToCart({
                              id: item.id,
                              name: item.name,
                              subtitle: item.fabric,
                              fabric: item.fabric,
                              price: item.price,
                              originalPrice: item.originalPrice,
                              image: item.image,
                              altImage: item.image,
                              colors: ["#8B0000", "#E8A317"],
                              description: item.fabric,
                              weave: "Handloom Bridal Brocade",
                              care: "Dry Clean Only",
                              category: "bestseller",
                            });
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-marigold text-ink hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`Add ${item.name} to bag`}
                        >
                          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <ButtonPrimary
                onClick={() => alert("Connecting you with our bridal couture concierge...")}
                size="md"
              >
                Schedule Bridal Consultation
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
