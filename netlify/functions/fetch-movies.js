const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
exports.handler = async (event) => {
  const { searchTerm, page } = event.queryStringParameters;
  const endpoint = searchTerm
    ? `${process.env.API_URL}search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=search=${searchTerm}&page=${page}`
    : `${process.env.API_URL}movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`;
  let res = await (await fetch(endpoint)).json();

  return { statusCode: 200, body: JSON.stringify(res) };
};
