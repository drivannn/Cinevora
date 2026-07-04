"use client";

import { motion } from "framer-motion";
import { Bookmark, Clapperboard, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/watchlist", label: "Watchlist" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
    >
      <nav className="glass floating-nav mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full px-4 ring-1 ring-white/5 sm:px-6">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-black">
            <Clapperboard size={20} aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide">Cinevora</span>
        </Link>
        <div className="hidden items-center rounded-full border border-white/10 bg-white/5 p-1 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-muted transition hover:text-white",
                pathname === item.href && "bg-white/10 text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/explore" aria-label="Search movies" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <Search size={18} />
          </Link>
          <Link href="/watchlist" aria-label="Open watchlist" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <Bookmark size={18} />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
