import React from "react";

import Link from "next/link";

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

const Header = () => (
  <Wrapper>
    <Content>
      <Link href="/">
        <LogoImg src="/images/react-movie-logo.svg" alt="rmdb-logo" />
      </Link>

      <TMDBLogoImg src="/images/tmdb_logo.svg" />
    </Content>
  </Wrapper>
);

export default Header;
