import React from "react";

import Link from "next/link";

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

const Header = () => (
  <Wrapper>
    <Content>
      <div></div>
      <TMDBLogoImg src="/images/tmdb_logo.svg" />
    </Content>
  </Wrapper>
);

export default Header;
