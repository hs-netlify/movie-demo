import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./Button.styles";

const Button = ({ text, callback, type = "button" }) => (
  <Wrapper type={type} onClick={callback}>
    {text}
  </Wrapper>
);

Button.propTypes = {
  text: PropTypes.string,
  callback: PropTypes.func,
};

export default Button;
