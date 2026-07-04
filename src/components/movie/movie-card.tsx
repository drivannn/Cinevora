"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Genre, Movie } from "@/types/tmdb";
import { genreNames, yearFromDate } from "@/utils/format";
import { imageUrl } from "@/utils/tmdb-image";
import { RatingBadge } from "./rating-badge";
import { WatchlistButton } from "./watchlist-button";

export function MovieCard({ movie, genres = [] }: { movie: Movie; genres?: Genre[] }) {
  const names = genreNames(movie, genres);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--glare-x", `${((x + 0.5) * 100).toFixed(0)}%`);
    event.currentTarget.style.setProperty("--glare-y", `${((y + 0.5) * 100).toFixed(0)}%`);
  }

  function resetTilt(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group w-[176px] shrink-0 snap-start scroll-ml-5 [--glare-x:50%] [--glare-y:50%] [--tilt-x:0deg] [--tilt-y:0deg] [perspective:1000px] sm:w-[208px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <Link href={`/movie/${movie.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <div
          className="relative aspect-[2/3] overflow-hidden rounded-lg bg-card shadow-[0_22px_60px_rgba(0,0,0,0.35)] transition-[box-shadow,transform] duration-300 ease-out [transform:rotateX(var(--tilt-x))_rotateY(var(--tilt-y))] [transform-style:preserve-3d] will-change-transform group-hover:shadow-[0_34px_90px_rgba(0,0,0,0.58)]"
        >
          <Image
            src={imageUrl(movie.poster_path, "w500")}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 640px) 176px, 208px"
            className="object-cover transition duration-700 group-hover:scale-108"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--glare-x)_var(--glare-y),rgba(255,255,255,0.2),transparent_34%)] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-70" />
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="mb-3 flex items-center justify-between gap-2">
              <RatingBadge value={movie.vote_average} />
              <WatchlistButton movie={movie} compact />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              <Info size={13} /> Details
            </span>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="line-clamp-1 text-sm font-semibold text-white">{movie.title}</h3>
          <p className="line-clamp-1 text-xs text-muted">
            {yearFromDate(movie.release_date)} {names.length ? `/ ${names.join(", ")}` : ""}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
