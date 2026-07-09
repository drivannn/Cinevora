"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Button } from "@/components/ui/button";
import { SelectMenu } from "@/components/ui/select-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { useDebounce } from "@/hooks/use-debounce";
import { Genre, MovieListResponse } from "@/types/tmdb";
import { MovieGrid } from "./movie-grid";

const sortOptions = [
  { label: "Popular", value: "popularity.desc" },
  { label: "Top Rated", value: "vote_average.desc" },
  { label: "Newest", value: "primary_release_date.desc" },
  { label: "Revenue", value: "revenue.desc" },
];

export function ExploreClient({ initialMovies, genres }: { initialMovies: MovieListResponse; genres: Genre[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const sentinel = useRef<HTMLDivElement | null>(null);
  const debouncedQuery = useDebounce(query);
  const genreOptions = [
    { label: "All genres", value: "" },
    ...genres.map((item) => ({ label: item.name, value: String(item.id) })),
  ];

  const getKey = useCallback((pageIndex: number, previousPageData: MovieListResponse | null) => {
    if (previousPageData && !previousPageData.results.length) return null;
    const nextPage = pageIndex + 1;
    const params = new URLSearchParams({ page: String(nextPage) });
    if (debouncedQuery) params.set("query", debouncedQuery);
    if (!debouncedQuery && genre) params.set("genre", genre);
    if (!debouncedQuery && year) params.set("year", year);
    if (!debouncedQuery && sort) params.set("sort", sort);

    const endpoint = debouncedQuery ? "/api/search" : "/api/discover";
    return `${endpoint}?${params.toString()}`;
  }, [debouncedQuery, genre, sort, year]);

  const fetcher = useCallback(async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Unable to load movies");
    return response.json() as Promise<MovieListResponse>;
  }, []);

  const { data, error: swrError, size, setSize, isValidating } = useSWRInfinite<MovieListResponse>(
    getKey,
    fetcher,
    {
      fallbackData: [initialMovies],
      revalidateFirstPage: false,
    }
  );

  const movies = data ? data.flatMap((pageData) => pageData.results) : [];
  const totalPages = data?.[data.length - 1]?.total_pages ?? 1;
  const loading = !data && !swrError;
  const loadingMore = isValidating && size > 1 && data && data.length < size;
  const error = swrError ? "Something went wrong while contacting TMDB. Try adjusting the filters." : "";

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && !loadingMore && size < totalPages) {
        setSize((prevSize) => prevSize + 1);
      }
    }, { rootMargin: "500px" });

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading, loadingMore, size, totalPages, setSize]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-accent">Explore</p>
        <h1 className="font-display text-5xl font-semibold leading-tight text-white sm:text-7xl">Find the next film worth your night.</h1>
        <p className="mt-5 text-base leading-7 text-muted">Search in real time, filter by mood, and keep browsing without breaking flow.</p>
      </div>

      <div className="glass sticky top-24 z-30 mb-9 rounded-lg p-4 shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
        <div className="grid gap-3 lg:grid-cols-[1fr_170px_140px_180px]">
          <label className="relative block">
            <span className="sr-only">Search movies</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, director, universe..."
              className="h-12 w-full rounded-full border border-white/10 bg-black/25 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-muted hover:border-white/18 focus:border-accent focus:bg-black/35 focus:ring-2 focus:ring-accent/25"
            />
          </label>
          <SelectMenu
            ariaLabel="Filter by genre"
            value={genre}
            onChange={setGenre}
            disabled={Boolean(query)}
            options={genreOptions}
          />
          <input
            aria-label="Filter by release year"
            value={year}
            onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="Year"
            disabled={Boolean(query)}
            className="h-12 rounded-full border border-white/10 bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-muted hover:border-white/18 focus:border-accent disabled:opacity-45"
          />
          <SelectMenu
            ariaLabel="Sort movies"
            value={sort}
            onChange={setSort}
            disabled={Boolean(query)}
            options={sortOptions}
          />
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted">
          <SlidersHorizontal size={14} /> Search mode prioritizes title matching; filters return when search is cleared.
        </div>
      </div>

      {error && <div role="alert" className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div>}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="aspect-[2/3]" />)}
          </motion.div>
        ) : movies.length ? (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MovieGrid movies={movies} genres={genres} />
          </motion.div>
        ) : (
          <EmptyState title="No films found" description="Try a broader keyword or clear the filters to restart discovery." />
        )}
      </AnimatePresence>

      <div ref={sentinel} className="h-12" />
      {loadingMore && <div className="mt-6 flex justify-center"><Button variant="secondary" disabled>Loading more...</Button></div>}
    </div>
  );
}
