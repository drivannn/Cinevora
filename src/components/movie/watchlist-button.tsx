"use client";

import { motion } from "framer-motion";
import { Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/context/watchlist-context";
import { Movie } from "@/types/tmdb";
import { cn } from "@/lib/utils";

export function WatchlistButton({
  movie,
  compact = false,
  className,
}: {
  movie: Movie;
  compact?: boolean;
  className?: string;
}) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(movie.id);

  return (
    <Button
      type="button"
      variant={saved ? "primary" : "secondary"}
      size={compact ? "icon" : "md"}
      className={cn("relative overflow-hidden", className)}
      aria-label={saved ? `Remove ${movie.title} from watchlist` : `Save ${movie.title} to watchlist`}
      onClick={(event) => {
        event.preventDefault();
        toggle(movie);
      }}
    >
      <motion.span
        key={saved ? "saved" : "save"}
        initial={{ scale: 0.65, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center gap-2"
      >
        {saved ? <Check size={17} /> : <Bookmark size={17} />}
        {!compact && (saved ? "Saved" : "Watchlist")}
      </motion.span>
    </Button>
  );
}
