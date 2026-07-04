import Image from "next/image";
import { ScrollRow } from "@/components/shared/scroll-row";
import { imageUrl } from "@/utils/tmdb-image";
import { CastMember } from "@/types/tmdb";

export function CastCarousel({ cast }: { cast: CastMember[] }) {
  return (
    <ScrollRow ariaLabel="Cast members" className="pr-8">
      {cast.slice(0, 16).map((person) => (
        <div key={`${person.id}-${person.character}`} className="w-36 shrink-0 snap-start scroll-ml-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-card shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <Image
              src={imageUrl(person.profile_path, "w300")}
              alt={person.name}
              fill
              sizes="144px"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>
          <h3 className="mt-3 line-clamp-1 text-sm font-semibold text-white">{person.name}</h3>
          <p className="line-clamp-1 text-xs text-muted">{person.character}</p>
        </div>
      ))}
    </ScrollRow>
  );
}
