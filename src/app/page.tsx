"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useLenis } from "@/hooks/useLenis";
import { AnnouncementBar } from "@/components/shell/AnnouncementBar";
import { Navbar } from "@/components/shell/Navbar";
import { SplashScreen } from "@/components/sections/SplashScreen";
import HeroSection from "@/components/sections/HeroSection";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { SixMoodsSection } from "@/components/sections/SixMoodsSection";
import { NewArrivalsSection } from "@/components/sections/NewArrivalsSection";
import { BridalSection } from "@/components/sections/BridalSection";
import { TrendsSection } from "@/components/sections/TrendsSection";
import { AutumnWinterSection } from "@/components/sections/AutumnWinterSection";
import { SpotlightSection } from "@/components/sections/SpotlightSection";
import { OccasionSection } from "@/components/sections/OccasionSection";
import { HeritageSection } from "@/components/sections/HeritageSection";
import { FirstLightSection } from "@/components/sections/FirstLightSection";
import { LatestTrendsSection } from "@/components/sections/LatestTrendsSection";
import { TestimonialsInstagramSection } from "@/components/sections/TestimonialsInstagramSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isSplashActive, setIsSplashActive] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const lenisRef = useLenis(isSplashActive);

  // Smart Directional Navbar:
  // 1. Strictly hidden while within the Hero sequence
  // 2. Once past the Hero:
  //    - Hidden while scrolling DOWN (forward into content) so sections have 100% full clearance
  //    - Smoothly revealed while scrolling UP (navigating / revisiting)
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const heroElement = document.getElementById("hero");
      const pinSpacer = heroElement?.closest(".pin-spacer") as HTMLElement | null;
      const heroBottom = pinSpacer
        ? pinSpacer.offsetTop + pinSpacer.offsetHeight - 80
        : heroElement
        ? heroElement.offsetTop + heroElement.offsetHeight * 3.8 - 80
        : window.innerHeight * 3.8;

      // Inside hero: always keep navbar hidden
      if (currentScrollY < heroBottom) {
        setIsPastHero(false);
        setIsNavbarVisible(false);
        lastScrollY = currentScrollY;
        return;
      }

      setIsPastHero(true);

      const diff = currentScrollY - lastScrollY;
      // Scroll down (forward): hide navbar so it never covers section content
      if (diff > 6) {
        setIsNavbarVisible(false);
      }
      // Scroll up: reveal navbar smoothly from top
      else if (diff < -6) {
        setIsNavbarVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Refresh ScrollTrigger after splash completes and images/fonts are settled
  const handleSplashComplete = () => {
    setIsSplashActive(false);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 150);
    });
  };

  useEffect(() => {
    // Ensure scroll begins at top on initial load / reload
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // Also refresh ScrollTrigger on window load
    const handleLoad = () => {
      ScrollTrigger.refresh(true);
    };
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const handleNavigate = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;

    // Briefly reveal navbar when navigating
    setIsNavbarVisible(true);

    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - 64;

    if (lenisRef.current) {
      try {
        lenisRef.current.scrollTo(targetY, { duration: 1.2, lock: false });
      } catch {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-ivory">
      {/* [0] Splash Screen (locks scroll until complete) */}
      {isSplashActive && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Global Header Shell: Hidden on scroll-down, reveals smoothly on scroll-up */}
      <div
        className={clsx(
          "fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-400 ease-out",
          isNavbarVisible
            ? "translate-y-0 opacity-100 pointer-events-auto shadow-md"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <AnnouncementBar />
        <Navbar onNavigate={handleNavigate} />
      </div>

      {/* [1] Hero Section — Scroll-driven frame sequence with authentic luxury typography & video scrub */}
      <HeroSection
        onPastHeroChange={setIsPastHero}
        onExploreClick={() => handleNavigate("#six-moods")}
        onStylingCallClick={() => alert("Connecting you to our head draping stylist...")}
      />

      {/* [2] Trust Marquee */}
      <TrustMarquee />

      {/* [3] Six Moods — horizontal scroll showcase */}
      <SixMoodsSection />

      {/* [4] New Arrivals & Best Sellers */}
      <NewArrivalsSection />

      {/* [5] The Bridal Collection (dark) */}
      <BridalSection />

      {/* [6] Trend of the Day / Seasonal Special */}
      <TrendsSection />

      {/* [7] Autumn/Winter Edit */}
      <AutumnWinterSection />

      {/* [8] Pinned Product Spotlight */}
      <SpotlightSection />

      {/* [9] Edits for Every Occasion */}
      <OccasionSection />

      {/* [10] Heritage Tabs + Accordion Gallery */}
      <HeritageSection />

      {/* [11] First Light — cinematic story */}
      <FirstLightSection />

      {/* [12] Latest Trends */}
      <LatestTrendsSection />

      {/* [13] Testimonials + Instagram */}
      <TestimonialsInstagramSection />

      {/* [14] Footer */}
      <FooterSection />
    </main>
  );
}

