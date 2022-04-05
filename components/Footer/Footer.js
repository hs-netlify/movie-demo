import React from "react";
import Link from "next/link";
import { Wrapper, Content } from "./Footer.styles";

const Footer = () => (
  <Wrapper>
    <Content>
      <Link href="/contact-us">
        <h1 stlye={{ cursor: "pointer" }}>Contact Us</h1>
      </Link>
    </Content>
  </Wrapper>
);

export default Footer;
