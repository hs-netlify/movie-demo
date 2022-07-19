import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import Image from "next/image";
import { Wrapper } from "./Thumb.styles";

const Thumb = ({ image, movieId, clickable, staticGen }) =>
  clickable ? (
    <Wrapper className="relative clickable">
      <>
        {staticGen ? (
          <div className="rounded-full bg-red-400 flex justify-center items-center text-white h-12 w-12 absolute -top-4 -right-4">
            <span>SSG</span>
          </div>
        ) : null}
      </>

      <Link
        className="relative"
        href={{ pathname: `/movie/${movieId}`, query: { staticGen } }}
      >
        <Image
          width="100%"
          height="100%"
          className="h-full w-full max-w-3xl object-cover rounded-2xl"
          src={image}
          alt="movie-thumb"
        />
      </Link>
    </Wrapper>
  ) : (
    <Wrapper className="relative">
      <>
        {staticGen ? (
          <div className="rounded-full bg-red-400 text-white h-12 w-12 absolute -top-2 -right-2">
            SSG
          </div>
        ) : null}
      </>
      <Image src={image} alt="movie-thumb" />
    </Wrapper>
  );
Thumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
};

export default Thumb;
