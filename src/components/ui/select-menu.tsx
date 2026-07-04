"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
};

export function SelectMenu({
  ariaLabel,
  disabled,
  onChange,
  options,
  value,
}: {
  ariaLabel: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectValue(nextValue: string) {
    onChange(nextValue);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-black/35 px-4 text-left text-sm font-semibold text-white outline-none transition hover:border-white/18 focus:border-accent focus:ring-2 focus:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-45",
          open && "border-accent bg-black/50 ring-2 ring-accent/20",
        )}
      >
        <span className="line-clamp-1">{selected?.label}</span>
        <ChevronDown
          size={17}
          className={cn("shrink-0 text-white/58 transition-transform duration-250", open && "rotate-180 text-accent")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <motion.div
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-72 overflow-y-auto rounded-lg border border-white/10 bg-[#0b0b0d]/95 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.56)] backdrop-blur-2xl"
          >
            {options.map((option) => {
              const active = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectValue(option.value)}
                  className={cn(
                    "flex min-h-10 w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-white/82 transition duration-200 hover:bg-white/8 hover:text-white",
                    active && "bg-accent/14 text-accent",
                  )}
                >
                  <span>{option.label}</span>
                  {active && <Check size={15} aria-hidden="true" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
