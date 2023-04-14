const Blog = () => <div>My blog that works</div>;

export const getStaticProps = async () => {
  const res = await fetch("https://www.gov.uk/bank-holidays.json");
  const data = await res.json();
  return { props: data };
};

export default Blog;
