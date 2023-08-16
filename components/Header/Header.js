import React from "react";

import { Wrapper, Content, TMDBLogoImg } from "./Header.styles";

const Header = () => (
  <Wrapper>
    <Content>
      <div></div>
      <TMDBLogoImg src="/images/tmdb_logo.svg" />
    </Content>
  </Wrapper>
);

export default Header;
