"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -220, y: -220 });

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

    let visible = false;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetRef.current = { x: event.clientX - 170, y: event.clientY - 170 };

      if (!visible) {
        visible = true;
        glow.style.opacity = "1";
      }

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(() => {
          frameRef.current = null;
          const { x, y } = targetRef.current;
          glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }
    };

    const onLeave = () => {
      visible = false;
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 hidden opacity-0 mix-blend-screen transition-opacity duration-200 will-change-transform md:block"
      style={{ transform: "translate3d(-220px, -220px, 0)" }}
    />
  );
}
