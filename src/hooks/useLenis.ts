"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis(isLocked: boolean = false) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.2,
      autoRaf: false, // Ensure Lenis does not run its own rAF loop
    });

    lenisRef.current = lenis;
    // @ts-ignore
    window.__lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Sync Lenis and Native Mobile Touch Scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const onWindowScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once mounted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onWindowScroll);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      // @ts-ignore
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLocked) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLocked]);

  return lenisRef;
}
