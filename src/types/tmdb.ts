export type Movie = {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
  original_language: string;
  popularity: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export type Review = {
  id: string;
  author: string;
  content: string;
  created_at: string;
  url: string;
};

export type MovieImage = {
  file_path: string;
  width: number;
  height: number;
};

export type MovieDetail = Movie & {
  budget: number;
  revenue: number;
  runtime: number;
  tagline: string;
  status: string;
  homepage: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  credits: { cast: CastMember[]; crew: CrewMember[] };
  videos: { results: Video[] };
  images: { backdrops: MovieImage[]; posters: MovieImage[] };
  recommendations: MovieListResponse;
  similar: MovieListResponse;
  reviews: { results: Review[] };
};
