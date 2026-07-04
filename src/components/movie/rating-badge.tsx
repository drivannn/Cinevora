import { Star } from "lucide-react";

export function RatingBadge({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/25 bg-black/45 px-2.5 py-1 text-xs font-semibold text-amber-200 backdrop-blur-md">
      <Star size={13} className="fill-accent text-accent" aria-hidden="true" />
      {value.toFixed(1)}
    </span>
  );
}
