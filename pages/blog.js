const Blog = () => <div>My blog that works</div>;

const delayedFetch = new Promise(async (resolve) => {
  const res = await fetch("https://www.gov.uk/bank-holidays.json");
  const data = await res.json();

  setTimeout(() => {
    resolve(data);
  }, 2000);
});

export const getStaticProps = async () => {
  const delayedData = await delayedFetch();
  return { props: {} };
};

export default Blog;
