import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background: var(--medGrey);
  color: var(--white);
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--maxWidth);
  padding: 0 20px;

  &.clickable:hover {
    cursor: pointer;
  }

  span {
    font-size: 1.2rem;
    color: var(--white);
    padding-right: 10px;

    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;
