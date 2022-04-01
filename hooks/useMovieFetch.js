import { useState, useEffect } from "react";

import API from "../utils/API";
import { isPersistedState } from "../utils/helpers";

const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log("movie id in here", movieId);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        //const movie = await API.fetchMovie(movieId);
        const movie = await (
          await fetch(`/api/fetch-movie?movieId=${movieId}`)
        ).json();

        const movie2 = await fetch(`/api/fetch-movie?movieId=${movieId}`);
        console.log(movie);
        console.log(await movie2.json());

        //  const credits = await API.fetchCredits(movieId);
        const credits = (
          await fetch(`/api/fetch-credits?movieId=${movieId}`)
        ).json();

        //Get directors only
        const directors = credits.crew.filter(
          (member) => member.job === "Director"
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    const sessionState = isPersistedState(movieId);
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(movieId, JSON.stringify(state));
    }
  }, [movieId, state]);

  return { state, loading, error };
};

export default useMovieFetch;
