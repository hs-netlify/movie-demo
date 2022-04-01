const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
exports.handler = async (event) => {
  const { movieId } = event.queryStringParameters;
  console.log("movie id in function", movieId);
  const endpoint = `${process.env.API_URL}movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  console.log("endpoint :", endpoint);
  let res = await (await fetch(endpoint)).json();
  return { statusCode: 200, body: JSON.stringify(res) };
};
