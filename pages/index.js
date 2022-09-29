import React, { useState, useEffect } from "react";

import {
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  API_KEY,
} from "../utils/config";

//Components
import HeroImage from "../components/HeroImage/HeroImage";
import Grid from "../components/Grid/Grid";
import Thumb from "../components/Thumb/Thumb";
import Spinner from "../components/Spinner/Spinner";
import SearchBar from "../components/SearchBar/SearchBar";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import API from "../utils/API";

export const getStaticProps = async () => {
  const movies = await API.fetchMovies("", 1);
  movies.results = movies.results.map((movie) => ({ ...movie, static: true }));

  return {
    props: {
      movies,
    },
  };
};

//Hook
import { useHomeFetch } from "../hooks/useHomeFetch";

const Home = ({ movies }) => {
  const {
    state,
    setState,
    setStaticInitState,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore,
  } = useHomeFetch();

  const [testData, setTestData] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    //Initialise the home page with static content here
    if (state.results.length < 1) {
      setState(movies);
      setStaticInitState(movies);
    }
  });

  if (error) return <div>Something Went Wrong</div>;
  const day = new Date().getDate();
  const randFilm = day <= 19 ? day : 19;
  return (
    <>
      <Header></Header>
      {!searchTerm && state.results[randFilm] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[randFilm].backdrop_path}`}
          title={state.results[randFilm].original_title}
          text={state.results[randFilm].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {state.results.map((movie) => (
          <Thumb
            movieId={movie.id}
            key={Math.floor(Math.random() * 100000)}
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : "/images/no_image.jpg"
            }
            clickable
            staticGen={movie.static}
          >
            {movie.title}
          </Thumb>
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
      <Footer />
    </>
  );
};

export default Home;
