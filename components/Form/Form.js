import React, { useState } from "react";
import { Wrapper, Content, FormWrapper } from "./Form.styles";
import Button from "../Button/Button";
import { useRouter } from "next/router";

const Form = () => {
  const [state, setState] = useState({ name: "", comment: "" });
  const [posting, setPosting] = useState(false);

  const handleNameChange = (e) =>
    setState({ name: e.target.value, comment: state.comment });
  const handleCommentChange = (e) =>
    setState({ name: state.name, comment: e.target.value });

  const sendData = () => {
    setPosting(false);
    fetch("http://google.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
    }, 1000);
    setState({});
  };

  return posting ? (
    <Wrapper>
      <h1>POSTING COMMENT ...</h1>
    </Wrapper>
  ) : (
    <Wrapper image="https://image.tmdb.org/t/p/w1280/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg">
      <Content>
        <FormWrapper name="Comments" data-netlify="true">
          <h1 style={{ color: "black" }}>Contact Us</h1>
          <h3>Name:</h3>
          <input
            style={{ fontSize: "1.4rem", margin: "10px", padding: "5px" }}
            type="text"
            placeholder="Name"
            vale={state.name}
            onChange={handleNameChange}
          ></input>
          <h3>Comment:</h3>
          <textarea
            style={{
              fontSize: "1.2rem",
              margin: "10px",
              padding: "5px",
              minHeight: "100px",
            }}
            placeholder="Comment"
            value={state.comment}
            onChange={handleCommentChange}
          ></textarea>
          <h1 style={{ color: "black" }}></h1>
          <Button text="Submit" callback={() => sendData()} />
        </FormWrapper>
      </Content>
    </Wrapper>
  );
};

export default Form;
