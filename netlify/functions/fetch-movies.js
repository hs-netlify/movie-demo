const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
exports.handler = async (event) => {
  const { searchTerm, page } = event.queryStringParameters;
  const endpoint = searchTerm
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=search=${searchTerm}&page=${page}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`;
  let res = await (await fetch(endpoint)).json();

  return { statusCode: 200, body: JSON.stringify(res) };
};
