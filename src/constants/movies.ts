export const HOME_SECTIONS = [
  {
    key: "trending",
    title: "Trending",
    subtitle: "The films people cannot stop talking about this week.",
  },
  {
    key: "popular",
    title: "Popular",
    subtitle: "High-energy crowd favorites with serious pull.",
  },
  {
    key: "top_rated",
    title: "Top Rated",
    subtitle: "Critically loved stories with staying power.",
  },
  {
    key: "upcoming",
    title: "Upcoming",
    subtitle: "New releases worth putting on the radar.",
  },
  {
    key: "now_playing",
    title: "Now Playing",
    subtitle: "Currently in theatres and ready for the big screen.",
  },
] as const;

export type MovieListKey = (typeof HOME_SECTIONS)[number]["key"];
