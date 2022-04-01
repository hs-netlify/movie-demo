const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
exports.handler = async (event) => {
  const { movieId } = event.queryStringParameters;
  const creditsEndpoint = `${process.env.API_URL}movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const res = await (await fetch(creditsEndpoint)).json();
  return { statusCode: 200, body: JSON.stringify(res) };
};
