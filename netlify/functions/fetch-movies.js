import API from "../../utils/API";
exports.handler = async (event) => {
  const { searchTerm, page } = event.queryStringParameters;

  const movies = await API.fetchMovies(searchTerm, page);

  return { statusCode: 200, body: JSON.stringify(movies) };
};
