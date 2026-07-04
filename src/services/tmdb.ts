import { fallbackDetail, fallbackGenres, fallbackMovies } from "@/constants/fallback";
import { MovieListKey } from "@/constants/movies";
import { Genre, MovieDetail, MovieListResponse } from "@/types/tmdb";
import { backdropUrl, imageUrl } from "@/utils/tmdb-image";

const API_BASE = "https://api.themoviedb.org/3";

type TmdbOptions = Record<string, string | number | undefined>;
type DiscoverParams = {
  page?: number;
  query?: string;
  genre?: string;
  year?: string;
  sort?: string;
};

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export { backdropUrl, imageUrl };

function withApiKey(path: string, options: TmdbOptions = {}) {
  const url = new URL(`${API_BASE}${path}`);
  if (apiKey) url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function tmdbFetch<T>(path: string, options: TmdbOptions = {}, revalidate = 1800): Promise<T> {
  if (!apiKey) throw new Error("Missing TMDB API key");

  const response = await fetch(withApiKey(path, options), {
    next: { revalidate },
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function fallbackList(page = 1): MovieListResponse {
  return {
    page,
    results: fallbackMovies,
    total_pages: 1,
    total_results: fallbackMovies.length,
  };
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
    return data.genres;
  } catch {
    return fallbackGenres;
  }
}

export async function getMovieList(list: MovieListKey): Promise<MovieListResponse> {
  try {
    if (list === "trending") return tmdbFetch<MovieListResponse>("/trending/movie/week");
    return tmdbFetch<MovieListResponse>(`/movie/${list}`);
  } catch {
    return fallbackList();
  }
}

export async function getMovieDetail(id: string | number): Promise<MovieDetail> {
  try {
    return tmdbFetch<MovieDetail>(
      `/movie/${id}`,
      { append_to_response: "credits,videos,images,recommendations,similar,reviews", include_image_language: "en,null" },
      900,
    );
  } catch {
    return { ...fallbackDetail, id: Number(id) || fallbackDetail.id };
  }
}

export async function discoverMovies(params: DiscoverParams): Promise<MovieListResponse> {
  const page = params.page ?? 1;

  try {
    if (params.query) {
      return tmdbFetch<MovieListResponse>("/search/movie", {
        query: params.query,
        page,
        include_adult: "false",
      }, 300);
    }

    return tmdbFetch<MovieListResponse>("/discover/movie", {
      page,
      with_genres: params.genre,
      primary_release_year: params.year,
      sort_by: params.sort || "popularity.desc",
      include_adult: "false",
      vote_count_gte: 80,
    }, 300);
  } catch {
    return fallbackList(page);
  }
}
