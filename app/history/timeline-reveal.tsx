"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function TimelineReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed);
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    ref.current.querySelectorAll('li').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  return <div ref={ref}>{children}</div>;
}
