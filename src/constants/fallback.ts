import { Genre, Movie, MovieDetail } from "@/types/tmdb";

export const fallbackGenres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

export const fallbackMovies: Movie[] = [
  {
    id: 157336,
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    release_date: "2014-11-05",
    vote_average: 8.5,
    vote_count: 37000,
    genre_ids: [12, 18, 878],
    original_language: "en",
    popularity: 140,
  },
  {
    id: 27205,
    title: "Inception",
    overview:
      "A skilled thief is offered a chance to erase his criminal history by planting an idea inside a target's subconscious.",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-15",
    vote_average: 8.4,
    vote_count: 36000,
    genre_ids: [28, 878, 53],
    original_language: "en",
    popularity: 128,
  },
  {
    id: 550,
    title: "Fight Club",
    overview:
      "An insomniac office worker and a reckless soap maker form an underground fight club.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    release_date: "1999-10-15",
    vote_average: 8.4,
    vote_count: 29000,
    genre_ids: [18],
    original_language: "en",
    popularity: 105,
  },
];

export const fallbackDetail: MovieDetail = {
  ...fallbackMovies[0],
  budget: 165000000,
  revenue: 701729206,
  runtime: 169,
  tagline: "Mankind was born on Earth. It was never meant to die here.",
  status: "Released",
  homepage: "",
  genres: [
    { id: 12, name: "Adventure" },
    { id: 18, name: "Drama" },
    { id: 878, name: "Sci-Fi" },
  ],
  production_companies: [{ id: 923, name: "Legendary Pictures", logo_path: null }],
  credits: {
    cast: [
      { id: 10297, name: "Matthew McConaughey", character: "Cooper", profile_path: "/lCySuYjhXix3FzQdS4oceDDrXKI.jpg" },
      { id: 1813, name: "Anne Hathaway", character: "Brand", profile_path: "/tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg" },
    ],
    crew: [{ id: 525, name: "Christopher Nolan", job: "Director", department: "Directing" }],
  },
  videos: { results: [{ id: "trailer", key: "zSWdZVtXT7E", name: "Official Trailer", site: "YouTube", type: "Trailer" }] },
  images: { backdrops: [{ file_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg", width: 1920, height: 1080 }], posters: [] },
  recommendations: { page: 1, results: fallbackMovies.slice(1), total_pages: 1, total_results: 2 },
  similar: { page: 1, results: fallbackMovies.slice(1), total_pages: 1, total_results: 2 },
  reviews: { results: [] },
};
