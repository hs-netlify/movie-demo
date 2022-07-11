import React, { useEffect, useState } from "react";
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

  return { props: { movie }, revalidate: 60 };
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
  const [loaded, setLoaded] = useState(false);
  const [ssrImage, setSsrImage] = useState();

  const fetchSsrImage = async () => {
    let image = await (await fetch("/api/random-movie")).text();

    console.log(image);
    setLoaded(true);
    return image;
  };

  useEffect(async () => {
    let image = await fetchSsrImage();
    setSsrImage(image);
  }, []);

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
      {ssrImage ? (
        <div
          className="product-des"
          dangerouslySetInnerHTML={{ __html: ssrImage }}
        ></div>
      ) : (
        ""
      )}
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
