import React from "react";
import { useRouter } from "next/router";

//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../utils/config";

//components
import Grid from "../../components/Grid/Grid";
import Spinner from "../../components/Spinner/Spinner";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import MovieInfoBar from "../../components/MovieInfoBar/MovieInfoBar";
import Actor from "../../components/Actor/Actor";

//hook

import API from "../../utils/API";

export const getStaticProps = async (context) => {
  const movieId = context.params.movieId;

  const movie = await API.detailedMovieFetch(movieId);

  return { props: { movie } };
};

export const getStaticPaths = async () => {
  const paths = [];
  for (let i = 1; i < 2; i++) {
    let moviePage = await API.fetchMovies("", i);
    moviePage.results.forEach((movie) => {
      paths.push({ params: { movieId: movie.id.toString() } });
    });
  }

  return { paths, fallback: "blocking" };
};

const Movie = ({ movie }) => {
  const router = useRouter();
  const { staticGen } = router.query;
  if (!movie) return <Spinner />;
  return (
    <>
      <>
        {staticGen ? (
          <div className="w-full h-10 flex justify-center items-center bg-red-400 text-white">
            <span>STATICALLY GENERATED</span>
          </div>
        ) : null}
      </>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />/
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : "/images/no_image.jpg"
            }
          ></Actor>
        ))}
      </Grid>
    </>
  );
};

export default Movie;
