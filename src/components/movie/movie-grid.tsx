import { Genre, Movie } from "@/types/tmdb";
import { MovieCard } from "./movie-card";

export function MovieGrid({ movies, genres }: { movies: Movie[]; genres: Genre[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} genres={genres} />
      ))}
    </div>
  );
}
