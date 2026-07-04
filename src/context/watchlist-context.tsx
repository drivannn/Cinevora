"use client";

import { Movie } from "@/types/tmdb";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type WatchlistContextValue = {
  items: Movie[];
  isSaved: (id: number) => boolean;
  toggle: (movie: Movie) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);
const STORAGE_KEY = "cinevora-watchlist";
const LEGACY_STORAGE_KEY = "cineverse-watchlist";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Movie[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw =
        window.localStorage.getItem(STORAGE_KEY) ??
        window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as Movie[]);
      if (raw && window.localStorage.getItem(LEGACY_STORAGE_KEY)) {
        window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const value = useMemo<WatchlistContextValue>(() => ({
    items,
    isSaved: (id) => items.some((movie) => movie.id === id),
    toggle: (movie) => {
      setItems((current) =>
        current.some((item) => item.id === movie.id)
          ? current.filter((item) => item.id !== movie.id)
          : [movie, ...current],
      );
    },
  }), [items]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return context;
}
