import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, BadgeDollarSign, Building2, Clock, Languages, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CastCarousel } from "@/components/movie/cast-carousel";
import { GenreChip } from "@/components/movie/genre-chip";
import { MovieCarousel } from "@/components/movie/movie-carousel";
import { RatingBadge } from "@/components/movie/rating-badge";
import { TrailerModal } from "@/components/movie/trailer-modal";
import { WatchlistButton } from "@/components/movie/watchlist-button";
import { getGenres, getMovieDetail } from "@/services/tmdb";
import { formatMoney, formatRuntime, yearFromDate } from "@/utils/format";
import { backdropUrl, imageUrl } from "@/utils/tmdb-image";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetail(id);
  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      title: `${movie.title} | Cinevora`,
      description: movie.overview,
      images: movie.backdrop_path ? [backdropUrl(movie.backdrop_path, "w780")] : [],
    },
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [movie, genres] = await Promise.all([getMovieDetail(id), getGenres()]);
  const trailer = movie.videos.results.find((video) => video.site === "YouTube" && video.type === "Trailer");
  const directors = movie.credits.crew.filter((member) => member.job === "Director").slice(0, 2);
  const writers = movie.credits.crew.filter((member) => ["Writer", "Screenplay"].includes(member.job)).slice(0, 3);
  const gallery = movie.images.backdrops.slice(0, 6);

  return (
    <article>
      <section className="relative min-h-[88vh] overflow-hidden pt-24">
        <Image src={backdropUrl(movie.backdrop_path)} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#09090B_0%,rgba(9,9,11,0.92)_38%,rgba(9,9,11,0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[330px_1fr] lg:items-end">
          <div className="relative aspect-[2/3] max-w-[300px] overflow-hidden rounded-lg bg-card shadow-[0_34px_90px_rgba(0,0,0,0.55)]">
            <Image src={imageUrl(movie.poster_path, "w500")} alt={`${movie.title} poster`} fill sizes="300px" className="object-cover" />
          </div>
          <div className="max-w-4xl">
            <Button asChild variant="ghost" className="mb-6 -ml-3">
              <Link href="/explore"><ArrowLeft size={17} /> Back to Explore</Link>
            </Button>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <RatingBadge value={movie.vote_average} />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/82">{yearFromDate(movie.release_date)}</span>
              {movie.genres?.map((genre) => <GenreChip key={genre.id}>{genre.name}</GenreChip>)}
            </div>
            <h1 className="font-display text-6xl font-semibold leading-none text-white text-balance sm:text-8xl">{movie.title}</h1>
            {movie.tagline && <p className="mt-4 text-xl italic text-accent/90">{movie.tagline}</p>}
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{movie.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrailerModal videoKey={trailer?.key} title={movie.title} />
              <WatchlistButton movie={movie} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={<Clock size={18} />} label="Runtime" value={formatRuntime(movie.runtime)} />
          <Stat icon={<Languages size={18} />} label="Language" value={movie.original_language.toUpperCase()} />
          <Stat icon={<BadgeDollarSign size={18} />} label="Budget" value={formatMoney(movie.budget)} />
          <Stat icon={<BadgeDollarSign size={18} />} label="Revenue" value={formatMoney(movie.revenue)} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.35fr_.65fr]">
        <div className="min-w-0">
          <SectionTitle eyebrow="Cast" title="Faces behind the story" />
          <CastCarousel cast={movie.credits.cast} />
        </div>
        <aside className="space-y-4">
          <InfoPanel icon={<Users size={18} />} label="Crew" value={[...directors, ...writers].map((member) => `${member.job}: ${member.name}`).join(" / ") || "Not listed"} />
          <InfoPanel icon={<Building2 size={18} />} label="Production" value={movie.production_companies.map((company) => company.name).slice(0, 4).join(" / ") || "Independent"} />
          <InfoPanel icon={<Clock size={18} />} label="Status" value={movie.status} />
        </aside>
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <SectionTitle eyebrow="Gallery" title="Frames that sell the world" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image) => (
              <div key={image.file_path} className="relative aspect-video overflow-hidden rounded-lg bg-card">
                <Image src={backdropUrl(image.file_path, "w780")} alt={`${movie.title} still`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>
      )}

      {movie.reviews.results.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <SectionTitle eyebrow="Reviews" title="Audience signals" />
          <div className="grid gap-4 lg:grid-cols-2">
            {movie.reviews.results.slice(0, 2).map((review) => (
              <blockquote key={review.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <p className="line-clamp-5 text-sm leading-7 text-white/75">{review.content}</p>
                <footer className="mt-4 text-sm font-semibold text-accent">{review.author}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <MovieCarousel title="Recommendations" subtitle="Films that continue this mood and momentum." movies={movie.recommendations.results} genres={genres} />
      <MovieCarousel title="Similar Movies" subtitle="Adjacent stories from the same cinematic neighborhood." movies={movie.similar.results} genres={genres} />
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 text-accent">{icon}</div>
      <p className="text-xs uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoPanel({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-3 flex items-center gap-2 text-accent">{icon}<span className="text-xs uppercase tracking-[0.2em]">{label}</span></div>
      <p className="text-sm leading-7 text-white/75">{value}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
