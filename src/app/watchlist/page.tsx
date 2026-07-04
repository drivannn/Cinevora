import type { Metadata } from "next";
import { WatchlistClient } from "@/components/movie/watchlist-client";

export const metadata: Metadata = {
  title: "Watchlist",
  description: "Your locally saved Cinevora movie watchlist.",
};

export default function WatchlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8">
      <WatchlistClient />
    </div>
  );
}
