import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const children = el.querySelectorAll(".reveal");
    if (el.classList.contains("reveal")) observer.observe(el);
    for (const child of Array.from(children)) observer.observe(child);

    return () => observer.disconnect();
  }, []);

  return ref;
}
