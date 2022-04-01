import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import { useState, useEffect } from "react";

import API from "../utils/API";
import { isPersistedState } from "../utils/helpers";

const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      try {
        setLoading(true);
        setError(false);

        const movie = await (
          await fetch(`/api/fetch-movie?movieId=${movieId}`)
        ).json();

        const credits = await (
          await fetch(`/api/fetch-credits?movieId=${movieId}`)
        ).json();

        // Get directors only
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
        console.log(error);
        setError(true);
      }
    };
    if (movieId) fetchMovie();
  }, [movieId]);

  return { state, loading, error };
};

export default useMovieFetch;
