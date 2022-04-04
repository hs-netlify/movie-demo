import API from "./API";
let request = {
  detailedMovieFetch: async (movieId) => {
    if (!movieId) return;
    try {
      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);

      // Get directors only
      const directors = credits.crew.filter(
        (member) => member.job === "Director"
      );

      return {
        ...movie,
        actors: credits.cast,
        directors,
      };
    } catch (error) {
      console.log(error);
    }
  },
};

export default request;
