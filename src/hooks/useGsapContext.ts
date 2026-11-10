"use client";

import { useLayoutEffect, useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useGsapContext(
  func: (context: gsap.Context) => void,
  scope?: RefObject<HTMLElement | null> | HTMLElement | null,
  deps: any[] = []
) {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const targetScope = scope && "current" in scope ? scope.current : scope;
    const ctx = gsap.context(func, targetScope || undefined);

    return () => {
      ctx.revert();
    };
  }, deps);
}

