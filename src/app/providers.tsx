"use client";

import { CursorGlow } from "@/components/shared/cursor-glow";
import { WatchlistProvider } from "@/context/watchlist-context";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
      }}
    >
      <WatchlistProvider>
        <CursorGlow />
        {children}
      </WatchlistProvider>
    </SWRConfig>
  );
}
