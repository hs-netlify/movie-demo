import { IMAGE_BASE_URL, POSTER_SIZE } from "../../utils/config";
import API from "../../utils/API";

exports.handler = async () => {
  const randId = Math.floor(1000000 * Math.random());
  let movie = await API.fetchMovie(randId);

  return {
    statusCode: 200,
    body: `<div className="w-full h-40">
          <img
            className="w-full h-40 object-cover"
            alt="Not here!"
            src="${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}"
          ></img>
        </div>`,
  };
};
