"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.06] bg-[#050507] px-5 py-20 sm:px-8 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08),transparent_34%)]" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-7xl flex-col items-center text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-muted/75">
          Designed & Developed by
        </p>

        <a
          href="https://drivan.works"
          target="_blank"
          rel="noreferrer"
          className="group mt-5 inline-flex cursor-pointer items-center gap-2 font-display text-4xl font-semibold text-white transition-colors duration-250 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-5xl"
          aria-label="Visit drivan.works"
        >
          <span className="relative">
            drivan.works
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-250 group-hover:scale-x-100" />
          </span>
          <ArrowUpRight
            size={28}
            strokeWidth={1.8}
            className="transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </a>

        <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
          Building digital experiences through code,
          <br className="hidden sm:block" />
          design, and cinematic storytelling.
        </p>

        <p className="mt-10 text-xs text-white/38">© 2026 All Rights Reserved.</p>
      </motion.div>
    </footer>
  );
}
