import "/styles/GlobalStyle.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googleoptimize.com/optimize.js?id=OPT-KC2PT6F"
        ></script>
        <title>Working</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
