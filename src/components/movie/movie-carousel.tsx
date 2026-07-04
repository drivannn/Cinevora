"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ScrollRow } from "@/components/shared/scroll-row";
import { Genre, Movie } from "@/types/tmdb";
import { MovieCard } from "./movie-card";

export function MovieCarousel({
  title,
  subtitle,
  movies,
  genres,
}: {
  title: string;
  subtitle: string;
  movies: Movie[];
  genres: Genre[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="mb-5 flex items-end justify-between gap-5">
        <div>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>
        <Link href="/explore" className="hidden items-center gap-1 text-sm font-semibold text-accent hover:text-amber-200 sm:flex">
          See All <ChevronRight size={16} />
        </Link>
      </div>
      <ScrollRow ariaLabel={`${title} movies`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </ScrollRow>
    </section>
  );
}
