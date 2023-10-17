import "../styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { AdminPage } from "../styles/Admin";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Cookies from "js-cookie";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userType = Cookies.get("userType");
    if (token) {
      if (userType === "admin" && router.pathname === "/") {
        router.push("/restaurantes");
      }

      if (userType === "user" && router.pathname === "/app") {
        router.push("/app/list");
      }
    }
  }, []);

  if (router.pathname === "/home") {
    return <Component {...pageProps} />;
  }

  if (router.pathname.includes("/app")) {
    return (
      <>
        <Component {...pageProps} />
        <Footer />
        <ToastContainer />
      </>
    );
  } else {
    return (
      <AdminPage>
        <Link href="/">
          <h1 className="main-title">Urunga</h1>
        </Link>
        <Component {...pageProps} />
      </AdminPage>
    );
  }
}

export default MyApp;
