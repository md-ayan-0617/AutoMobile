import { useEffect, useRef, DependencyList, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Hook to run GSAP animations scoped to a container element with automatic cleanup.
 * Supports both signatures:
 * 1. useGsapContext(scopeRef, callback, deps?)
 * 2. useGsapContext(callback, deps?, scopeRef?)
 */
export function useGsapContext(
  scopeRef: RefObject<HTMLElement | null>,
  callback: (ctx: gsap.Context) => void,
  deps?: DependencyList
): void;
export function useGsapContext(
  callback: (ctx: gsap.Context) => void,
  deps?: DependencyList,
  scopeRef?: RefObject<HTMLElement | null>
): void;
export function useGsapContext(
  arg1: ((ctx: gsap.Context) => void) | RefObject<HTMLElement | null>,
  arg2?: ((ctx: gsap.Context) => void) | DependencyList,
  arg3?: RefObject<HTMLElement | null> | DependencyList
): void {
  let callback: (ctx: gsap.Context) => void;
  let scopeRef: RefObject<HTMLElement | null> | undefined;
  let deps: DependencyList = [];

  if (typeof arg1 === 'function') {
    callback = arg1;
    deps = (Array.isArray(arg2) ? arg2 : []) as DependencyList;
    scopeRef = arg3 as RefObject<HTMLElement | null> | undefined;
  } else {
    scopeRef = arg1;
    callback = arg2 as (ctx: gsap.Context) => void;
    deps = (Array.isArray(arg3) ? arg3 : []) as DependencyList;
  }

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context((self) => {
      if (callback) {
        callback(self);
      }
    }, scopeRef?.current || undefined);

    return () => {
      ctx.revert(); // Automatically kills all ScrollTriggers and timelines created inside
    };
  }, deps);
}
