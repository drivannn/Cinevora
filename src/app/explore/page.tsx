import type { Metadata } from "next";
import { ExploreClient } from "@/components/movie/explore-client";
import { discoverMovies, getGenres } from "@/services/tmdb";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search, filter, and sort films in Cinevora.",
};

export default async function ExplorePage() {
  const [genres, initialMovies] = await Promise.all([
    getGenres(),
    discoverMovies({ page: 1, sort: "popularity.desc" }),
  ]);

  return <ExploreClient initialMovies={initialMovies} genres={genres} />;
}
