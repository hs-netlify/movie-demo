import React from "react";

export const getStaticProps = async () => {
  const data = await (
    await fetch("https://jsonplaceholder.typicode.com/posts/1")
  ).json();

  return {
    props: {
      data,
    },
    revalidate: 300,
  };
};

const Home = ({ data }) => {
  return <>{JSON.stringify(data)}</>;
};

export default Home;
