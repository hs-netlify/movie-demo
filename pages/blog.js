const Blog = () => <div>My blog that works</div>;

export async function getStaticProps() {
  // Add your data fetching logic here

  async function dummyAwaitFunction() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Dummy data fetched after a delay");
      }, 2000); // 2 seconds delay
    });
  }

  await dummyAwaitFunction();

  return {
    props: {
      // Pass your fetched data as props to your component
    },
  };
}

export default Blog;
