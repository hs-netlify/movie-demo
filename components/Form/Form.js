import React, { useState } from "react";
import { Wrapper, Content, FormWrapper } from "./Form.styles";
import Button from "../Button/Button";

const Form = () => {
  const [state, setState] = useState({ name: "", comment: "" });
  const [posting, setPosting] = useState(false);
  const handleChange = (e) => setState({ [e.target.name]: e.target.value });

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = (e) => {
    setPosting(false);

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
  const { name, comment } = state;
  return posting ? (
    <Wrapper>
      <h1>POSTING COMMENT ...</h1>
    </Wrapper>
  ) : (
    <Wrapper image="https://image.tmdb.org/t/p/w1280/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg">
      <Content>
        <FormWrapper>
          <form
            id="comments"
            onSubmit={handleSubmit}
            name="contact"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="contact" />
            <h1 style={{ color: "black" }}>Contact Us</h1>
            <h3>Name:</h3>
            <input
              style={{
                fontSize: "1.4rem",

                padding: "5px",
                width: "100%",
              }}
              type="text"
              placeholder="Name"
              name="name"
              vale={name}
              onChange={handleChange}
            ></input>
            <h3>Comment:</h3>
            <textarea
              name="comment"
              style={{
                fontSize: "1.2rem",

                padding: "5px",
                width: "100%",
                minHeight: "100px",
              }}
              placeholder="Comment"
              value={comment}
              onChange={handleChange}
            ></textarea>
            <h1 style={{ color: "black" }}></h1>
            <Button text="Submit" type="submit"></Button>
          </form>
        </FormWrapper>
      </Content>
    </Wrapper>
  );
};

export default Form;
