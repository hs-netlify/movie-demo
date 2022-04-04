const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

import API from "../../utils/API";

exports.handler = async (event) => {
  const { movieId } = event.queryStringParameters;
  let movies = await API.fetchMovie(movieId);
  return { statusCode: 200, body: JSON.stringify(movie) };
};
