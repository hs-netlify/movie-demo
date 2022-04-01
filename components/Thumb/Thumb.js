import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";

import { Image } from "./Thumb.styles";

const Thumb = ({ image, movieId, clickable }) => (
  <div>
    {clickable ? (
      <Link href={`/${movieId}`}>
        <Image src={image} alt="movie-thumb" />
      </Link>
    ) : (
      <Image src={image} alt="movie-thumb" />
    )}
  </div>
);

Thumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
};

export default Thumb;
