import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  padding: 30px 100px;
  background: ${(props) =>
    `linear-gradient(
      to bottom, rgba(0,0,0,0)
      39%,rgba(0,0,0,0)
      41%,rgba(0,0,0,0.65)
      100%
    ),
    url('${props.image}'), var(--darkGrey)`};
  background-size: 100%, cover;
  background-position: center;
`;

export const Content = styled.div`
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 0.2), 0 1px 2px -1px rgb(0 0 0 / 0.2);
  border: 1px solid black;
  min-width: 500px;
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: white;

  animation: animateContent 1s;
  @keyframes animateContent {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const FormWrapper = styled.div`
  min-width: 500px;
  display: flex;
  font-size: 5px;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s;
`;
