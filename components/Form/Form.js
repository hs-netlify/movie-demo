import React, { useState } from "react";
import { Wrapper, Content, FormWrapper } from "./Form.styles";
import Button from "../Button/Button";
import { useRouter } from "next/router";

const Form = () => {
  const [state, setState] = useState({ name: "", comment: "" });
  const [posting, setPosting] = useState(false);
  const handleChange = (e) => setState({ [e.target.name]: e.target.value });

  const sendData = (e) => {
    setPosting(false);
    e.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...state }),
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
        <FormWrapper
          id="comments"
          onSubmit={sendData}
          name="Comments"
          data-netlify="true"
        >
          <h1 style={{ color: "black" }}>Contact Us</h1>
          <h3>Name:</h3>
          <input
            style={{ fontSize: "1.4rem", margin: "10px", padding: "5px" }}
            type="text"
            placeholder="Name"
            name="name"
            vale={state.name}
            onChange={handleChange}
          ></input>
          <h3>Comment:</h3>
          <textarea
            name="comment"
            style={{
              fontSize: "1.2rem",
              margin: "10px",
              padding: "5px",
              minHeight: "100px",
            }}
            placeholder="Comment"
            value={state.comment}
            onChange={handleChange}
          ></textarea>
          <h1 style={{ color: "black" }}></h1>
          <Button type="submit" text="Submit" callback={() => sendData()} />
        </FormWrapper>
      </Content>
    </Wrapper>
  );
};

export default Form;
