import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
} from "./config";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const defaultConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const fetchMovies = async (searchTerm, page) => {
  const endpoint = searchTerm
    ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
    : `${POPULAR_BASE_URL}&page=${page}`;
  return await (await fetch(endpoint)).json();
};

const fetchMovie = async (movieId) => {
  const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  return await (await fetch(endpoint)).json();
};
const fetchCredits = async (movieId) => {
  const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
  return await (await fetch(creditsEndpoint)).json();
};
// Bonus material below for login
const getRequestToken = async () => {
  const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
  return reqToken.request_token;
};
const authenticate = async (requestToken, username, password) => {
  const bodyData = {
    username,
    password,
    request_token: requestToken,
  };
  // First authenticate the requestToken
  const data = await (
    await fetch(LOGIN_URL, {
      ...defaultConfig,
      body: JSON.stringify(bodyData),
    })
  ).json();
  // Then get the sessionId with the requestToken
  if (data.success) {
    const sessionId = await (
      await fetch(SESSION_ID_URL, {
        ...defaultConfig,
        body: JSON.stringify({ request_token: requestToken }),
      })
    ).json();
    return sessionId;
  }
};
const detailedMovieFetch = async (movieId) => {
  if (!movieId) return;
  try {
    const movie = await fetchMovie(movieId);
    const credits = await fetchCredits(movieId);

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
};

let requests = {
  fetchMovies,
  fetchMovie,
  fetchCredits,
  detailedMovieFetch,
};

export default requests;
