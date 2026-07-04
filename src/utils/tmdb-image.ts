import { fallbackMovies } from "@/constants/fallback";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export function imageUrl(path: string | null | undefined, size = "w500") {
  if (!path) return "/window.svg";
  return `${IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path: string | null | undefined, size = "original") {
  if (!path) return imageUrl(fallbackMovies[0].backdrop_path, size);
  return `${IMAGE_BASE}/${size}${path}`;
}
