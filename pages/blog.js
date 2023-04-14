const Blog = () => <div>My blog that works</div>;

export const getStaticProps = async () => {
  const delayedFetch = new Promise(async (resolve) => {
    const res = await fetch("https://www.gov.uk/bank-holidays.json");
    const data = await res.json();

    setTimeout(() => {
      resolve(data);
    }, 2000);
  });

  let data = await delayedFetch();
  return { props: data };
};

export default Blog;
