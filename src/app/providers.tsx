"use client";

import { CursorGlow } from "@/components/shared/cursor-glow";
import { WatchlistProvider } from "@/context/watchlist-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WatchlistProvider>
      <CursorGlow />
      {children}
    </WatchlistProvider>
  );
}
