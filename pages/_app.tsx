import "../styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { AdminPage } from "../styles/Admin";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  console.log(router.pathname);

  if (router.pathname.includes("/app")) {
    return (
      <>
        <Component {...pageProps} />
      </>
    );
  } else {
    return (
      <AdminPage>
        <Link href="/">
          <h1>Urunga</h1>
        </Link>
        <Component {...pageProps} />
      </AdminPage>
    );
  }
}

export default MyApp;
