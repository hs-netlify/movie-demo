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
import useMovieFetch from "../../hooks/useMovieFetch";

const Movie = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <>
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
