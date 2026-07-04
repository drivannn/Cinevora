"use client";

import Link from "next/link";
import { fallbackGenres } from "@/constants/fallback";
import { useWatchlist } from "@/context/watchlist-context";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { MovieGrid } from "./movie-grid";

export function WatchlistClient() {
  const { items } = useWatchlist();

  return (
    <>
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-accent">Watchlist</p>
          <h1 className="font-display text-5xl font-semibold text-white sm:text-7xl">Your saved cinema shelf.</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Stored locally in your browser with a little motion when you save or remove a film.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/explore">Explore movies</Link>
        </Button>
      </div>

      {items.length ? (
        <MovieGrid movies={items} genres={fallbackGenres} />
      ) : (
        <EmptyState
          title="No saved films yet"
          description="Browse Cinevora and tap Watchlist on films that deserve a second look."
        />
      )}
    </>
  );
}
