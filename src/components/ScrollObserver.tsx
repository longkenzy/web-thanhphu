"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // If IntersectionObserver is not supported (rare SSR/old browser), reveal everything
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll(
          ".reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-scale"
        )
        .forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.08,
    });

    const observedSet = new WeakSet<Element>();

    const scanAndObserve = () => {
      const targets = document.querySelectorAll(
        ".reveal-on-scroll:not(.is-revealed), .reveal-fade-left:not(.is-revealed), .reveal-fade-right:not(.is-revealed), .reveal-scale:not(.is-revealed)"
      );

      targets.forEach((target) => {
        if (!observedSet.has(target)) {
          observedSet.add(target);
          observer.observe(target);
        }
      });
    };

    // Initial scan with small delay to allow DOM render and hydration
    const timer = setTimeout(scanAndObserve, 100);

    // Watch for dynamic DOM changes (tab switching, modal opens, data loading)
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const mutationObserver = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(scanAndObserve, 150);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      if (debounceTimer) clearTimeout(debounceTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
