import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "skeleton-cinematic relative overflow-hidden rounded-lg border border-white/8 bg-white/[0.045]",
        className,
      )}
      aria-hidden="true"
    />
  );
}
