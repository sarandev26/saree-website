"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { MobileMenu } from "./MobileMenu";
import clsx from "clsx";

interface NavbarProps {
  onNavigate?: (selector: string) => void;
}

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Sarees", href: "#new-arrivals" },
  { name: "Collections", href: "#six-moods" },
  { name: "Occasion", href: "#occasions" },
  { name: "About", href: "#heritage" },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
  } = useCart();

  const [activeLink, setActiveLink] = useState("Home");
  const [navTheme, setNavTheme] = useState<"dark" | "light">("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll-spy with IntersectionObserver (rootMargin: "-40% 0px -55% 0px")
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const theme = (entry.target.getAttribute("data-nav-theme") as "dark" | "light") || "dark";
            setNavTheme(theme);

            if (id === "hero") {
              setActiveLink("Home");
            } else if (id === "six-moods" || id === "bridal-collection") {
              setActiveLink("Collections");
            } else if (
              id === "new-arrivals" ||
              id === "todays-edit" ||
              id === "autumn-winter" ||
              id === "spotlight"
            ) {
              setActiveLink("Sarees");
            } else if (id === "occasions") {
              setActiveLink("Occasion");
            } else if (
              id === "heritage" ||
              id === "first-light" ||
              id === "latest-trends" ||
              id === "testimonials" ||
              id === "instagram" ||
              id === "footer"
            ) {
              setActiveLink("About");
            }
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id], footer[id]");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string, name: string) => {
    e.preventDefault();
    setActiveLink(name);

    if (onNavigate) {
      onNavigate(href);
    } else {
      // @ts-ignore
      if (window.__lenis) {
        // @ts-ignore
        window.__lenis.scrollTo(href, { offset: -72, duration: 1.2 });
      } else {
        const target = document.querySelector(href);
        if (target) {
          const rect = target.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - 72;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    }
  };

  const isDark = navTheme === "dark";

  return (
    <>
      <header
        role="banner"
        className={clsx(
          "relative h-[72px] w-full transition-all duration-300 select-none",
          isDark
            ? "bg-[#062C30]/90 backdrop-blur-[12px] border-b border-ivory/10 text-ivory"
            : "bg-[#FBF6EC]/95 backdrop-blur-[12px] border-b border-charcoal/10 shadow-soft text-charcoal"
        )}
      >
        <div className="max-w-layout mx-auto h-full px-4 sm:px-6 md:px-10 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Column 1: Logo Left */}
          <div className="min-w-0 whitespace-nowrap">
            <Link
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero", "Home")}
              className="flex items-center gap-2.5 sm:gap-3 group"
            >
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/media/logo.svg"
                  alt="Mayura Looms Peacock Feather Emblem"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={clsx(
                    "font-display tracking-[0.05em] text-[1.1rem] sm:text-[1.35rem] uppercase leading-none truncate transition-colors",
                    isDark ? "text-ivory" : "text-ink"
                  )}
                >
                  MAYURA LOOMS
                </span>
                <span className="font-heading italic text-[10px] sm:text-[11px] text-marigold tracking-wider -mt-0.5 hidden xs:inline">
                  Woven in Peacock Light
                </span>
              </div>
            </Link>
          </div>

          {/* Column 2: Centre Links (hidden below 1100px) */}
          <nav
            aria-label="Main Navigation"
            className="hidden min-[1100px]:flex items-center justify-center gap-8 min-w-0 whitespace-nowrap px-4"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.name)}
                  className={clsx(
                    "relative py-1.5 font-sans text-[12px] font-semibold tracking-button uppercase transition-colors duration-200 cursor-pointer",
                    isActive
                      ? "text-marigold"
                      : isDark
                      ? "text-ivory/80 hover:text-marigold"
                      : "text-charcoal/80 hover:text-marigold"
                  )}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-marigold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Column 3: Icons Right (min-width: 0, no wrap) */}
          <div className="flex items-center justify-end gap-1 sm:gap-2.5 min-w-0 whitespace-nowrap">
            {/* Search Trigger (Text hidden below 1280px) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search atelier"
              className={clsx(
                "flex items-center gap-2 h-9 px-2 sm:px-3 rounded-full transition-colors cursor-pointer",
                isDark ? "text-ivory hover:bg-white/10" : "text-charcoal hover:bg-black/5"
              )}
            >
              <Search className="h-4 w-4 stroke-[2.2]" />
              <span className="hidden xl:inline font-sans text-xs font-semibold tracking-wider uppercase">
                Search
              </span>
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Open saved heirlooms wishlist"
              className={clsx(
                "relative flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer",
                isDark ? "text-ivory hover:bg-white/10" : "text-charcoal hover:bg-black/5"
              )}
            >
              <Heart className="h-4 w-4 stroke-[2]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-clay text-[9px] font-sans font-bold text-ivory">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping bag with ${cartCount} items`}
              className="relative flex h-9 items-center gap-1.5 sm:gap-2 rounded-full bg-marigold px-2.5 sm:px-3.5 text-ink shadow-sm hover:bg-ink hover:text-ivory transition-colors duration-200 cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5 stroke-[2.4]" />
              <span className="font-sans text-[11px] font-bold tracking-button hidden sm:inline">
                BAG
              </span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink text-ivory text-[9px] font-bold">
                {cartCount}
              </span>
            </button>

            {/* Burger menu below 1100px */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={clsx(
                "min-[1100px]:hidden flex h-9 w-9 items-center justify-center rounded-full transition-colors ml-0.5 sm:ml-1 cursor-pointer",
                isDark ? "text-ivory hover:bg-white/10" : "text-charcoal hover:bg-black/5"
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(href) => {
          if (onNavigate) {
            onNavigate(href);
          } else {
            const el = document.querySelector(href);
            el?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </>
  );
};
