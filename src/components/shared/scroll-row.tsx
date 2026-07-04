"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollRow({
  children,
  className,
  ariaLabel = "Scrollable content",
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setCanScrollLeft(row.scrollLeft > 8);
    setCanScrollRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const row = rowRef.current;
    if (!row) return;

    row.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      row.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function scrollByPage(direction: "left" | "right") {
    const row = rowRef.current;
    if (!row) return;
    const amount = Math.max(row.clientWidth * 0.82, 280);
    row.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="group/row relative min-w-0 max-w-full">
      {canScrollLeft && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} left`}
          onClick={() => scrollByPage("left")}
          className="absolute left-2 top-[42%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/45 text-white shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-250 hover:border-accent/50 hover:text-accent lg:grid"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} right`}
          onClick={() => scrollByPage("right")}
          className="absolute right-2 top-[42%] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/45 text-white shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-250 hover:border-accent/50 hover:text-accent lg:grid"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      )}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent transition-opacity duration-300",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={rowRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "scroll-row flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-5 pr-10 outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "w-full max-w-full",
          className,
        )}
      >
        {children}
      </div>

      <p className="mt-1 text-xs text-muted/70 lg:hidden">Geser ke samping untuk melihat lainnya.</p>
    </div>
  );
}
