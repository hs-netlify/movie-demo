import API from "../../utils/API";

exports.handler = async (event) => {
  const { movieId } = event.queryStringParameters;
  let movie = await API.fetchMovie(movieId);
  return { statusCode: 200, body: JSON.stringify(movie) };
};
