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
import { AppProps } from "next/app";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXBvDE1nKy9O63Cv1iHeouOEGQMfd4YtA",
  authDomain: "urunga-1c092.firebaseapp.com",
  projectId: "urunga-1c092",
  storageBucket: "urunga-1c092.appspot.com",
  messagingSenderId: "682995738569",
  appId: "1:682995738569:web:6d48bad9f2c2b4b1f8ea18",
  measurementId: "G-JLVLLTFCHW",
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userType = Cookies.get("userType");
    if (token) {
      if (userType === "admin" && router.pathname === "/login") {
        router.push("/restaurantes");
      }

      if (userType === "app" && router.pathname === "/app") {
        router.push("/app/list");
      }
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }, []);

  if (router.pathname === "/") {
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
