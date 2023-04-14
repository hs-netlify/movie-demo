const Blog = () => <div>My blog that works</div>;

// export const getStaticProps = async () => {
//   const delayedFetch = new Promise(async (resolve) => {
//     const res = await fetch("https://www.gov.uk/bank-holidays.json");
//     const data = await res.json();

//     setTimeout(() => {
//       resolve(data);
//     }, 2000);
//   });

  const delatedData = await delayedFetch();
  return { props: delatedData };
};

export default Blog;
