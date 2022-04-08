import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 720px;

  object-fit: cover;
  border-radius: 20px;
`;

export const Wrapper = styled.div`
  transition: all 0.3s;

  animation: animateMovieThumb 0.5s;

  &.clickable:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  @keyframes animateMovieThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
