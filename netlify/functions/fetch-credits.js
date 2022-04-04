import API from "../../utils/API";

exports.handler = async (event) => {
  const { movieId } = event.queryStringParameters;
  const credits = await API.fetchCredits(movieId);
  return { statusCode: 200, body: JSON.stringify(credits) };
};
