"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Genre, Movie, MovieDetail } from "@/types/tmdb";
import { backdropUrl } from "@/utils/tmdb-image";
import { genreNames, yearFromDate } from "@/utils/format";
import { GenreChip } from "./genre-chip";
import { RatingBadge } from "./rating-badge";
import { TrailerModal } from "./trailer-modal";
import { WatchlistButton } from "./watchlist-button";

export function HeroMovie({ movie, genres }: { movie: MovieDetail | Movie; genres: Genre[] }) {
  const names = genreNames(movie, genres, 3);
  const trailer = "videos" in movie ? movie.videos.results.find((video) => video.site === "YouTube" && video.type === "Trailer") : undefined;

  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 scale-[1.045]"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.045 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={backdropUrl(movie.backdrop_path)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(245,158,11,0.18),transparent_26%),radial-gradient(circle_at_22%_76%,rgba(255,255,255,0.055),transparent_22%),linear-gradient(90deg,#09090B_0%,rgba(9,9,11,0.9)_38%,rgba(9,9,11,0.28)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-background via-background/72 to-transparent" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pt-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl py-20"
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <RatingBadge value={movie.vote_average} />
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
              <Calendar size={13} /> {yearFromDate(movie.release_date)}
            </span>
            {names.map((name) => <GenreChip key={name}>{name}</GenreChip>)}
          </div>
          <h1 className="font-display text-6xl font-semibold leading-[0.95] text-white text-balance sm:text-8xl">
            {movie.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{movie.overview}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrailerModal videoKey={trailer?.key} title={movie.title} />
            <Button variant="secondary" asChild>
              <Link href={`/movie/${movie.id}`}>View Details</Link>
            </Button>
            <WatchlistButton movie={movie} />
          </div>
        </motion.div>
      </div>
      <a href="#trending" aria-label="Scroll to trending movies" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/55 sm:block">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
          <ChevronDown size={20} />
        </motion.span>
      </a>
    </section>
  );
}
