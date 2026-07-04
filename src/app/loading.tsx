import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8">
      <Skeleton className="h-[62vh] w-full" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="aspect-[2/3]" />)}
      </div>
    </div>
  );
}
