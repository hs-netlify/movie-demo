const Blog = () => <div>My blog that works</div>;

export async function getStaticProps() {
  return {
    props: {
      // Pass your fetched data as props to your component
    },
  };
}

export default Blog;
