import { HeroMovie } from "@/components/movie/hero-movie";
import { MovieCarousel } from "@/components/movie/movie-carousel";
import { HOME_SECTIONS } from "@/constants/movies";
import { getGenres, getMovieDetail, getMovieList } from "@/services/tmdb";

export default async function Home() {
  const [genres, ...movieLists] = await Promise.all([
    getGenres(),
    ...HOME_SECTIONS.map((section) => getMovieList(section.key)),
  ]);
  const hero = await getMovieDetail(movieLists[0]?.results[0]?.id || 157336);

  return (
    <>
      <HeroMovie movie={hero} genres={genres} />
      <div id="trending" className="relative -mt-10">
        {HOME_SECTIONS.map((section, index) => (
          <MovieCarousel
            key={section.key}
            title={section.title}
            subtitle={section.subtitle}
            movies={movieLists[index]?.results ?? []}
            genres={genres}
          />
        ))}
      </div>
    </>
  );
}
