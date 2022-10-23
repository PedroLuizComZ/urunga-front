import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Link href="/">
        <h1>Urunga</h1>
      </Link>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
