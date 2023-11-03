import API from "../../utils/API";
exports.handler = async (event) => {
  const { searchTerm } = event.queryStringParameters;

  const movies = await API.fetchMovies(searchTerm, 1);

  return { statusCode: 200, body: JSON.stringify(movies) };
};
