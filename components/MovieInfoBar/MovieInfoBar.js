import React from "react";
import PropTypes from "prop-types";

//helpers
import { calcTime, convertMoney } from "../../utils/helpers";

//Styles
import { Wrapper, Content } from "./MovieInfoBar.styles";

const MovieInfoBar = ({ time, budget, revenue }) => (
  <Wrapper>
    <Content>
      <div className="column">
        <p>Running time: {calcTime(time)}</p>
      </div>
      <div className="column">
        <p>Budget: {convertMoney(budget)}</p>
      </div>
      <div className="column">
        <p>Revenue: {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>
);

MovieInfoBar.propTypes = {
  title: PropTypes.string,
  budget: PropTypes.number,
  revenue: PropTypes.number,
};

export default MovieInfoBar;
