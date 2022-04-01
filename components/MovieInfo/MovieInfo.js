import React from "react";
import PropTypes from "prop-types";

//Components
import Thumb from "../Thumb/Thumb";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../utils/config";

//Styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";

const MovieInfo = ({ movie }) => {
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : "/images/no_image.jpg"
          }
          clickable={false}
          alt="movie-thumb"
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>Plot</h3>
          <p>{movie.overview}</p>

          <div className="rating-director">
            <div>
              <h3>Rating</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>Director{movie.directors.length > 1 ? "s" : ""}</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
        </Text>
      </Content>
    </Wrapper>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object,
};

export default MovieInfo;
