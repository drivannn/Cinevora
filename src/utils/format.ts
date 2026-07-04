import { Genre, Movie } from "@/types/tmdb";

export function yearFromDate(date?: string) {
  return date ? new Date(date).getFullYear().toString() : "TBA";
}

export function formatRuntime(minutes?: number) {
  if (!minutes) return "Unknown";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function formatMoney(value?: number) {
  if (!value) return "Undisclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function genreNames(movie: Movie, genres: Genre[], limit = 2) {
  if (movie.genres?.length) return movie.genres.slice(0, limit).map((genre) => genre.name);
  return (movie.genre_ids || [])
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .slice(0, limit) as string[];
}
