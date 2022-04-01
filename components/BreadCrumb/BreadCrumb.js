import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import { Wrapper, Content } from "./BreadCrumb.styles";

const BreadCrumb = ({ movieTitle }) => (
  <Wrapper>
    <Content>
      <Link href="/">
        <span>Home</span>
      </Link>
      <span>|</span>
      <span>{movieTitle}</span>
    </Content>
  </Wrapper>
);

BreadCrumb.propTypes = {
  movieTitle: PropTypes.string,
};

export default BreadCrumb;
