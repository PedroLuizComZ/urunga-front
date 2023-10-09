import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    const token = Cookies.get("token");
    if(token !== undefined && (router.asPath === "/" || router.asPath === "/cadastro")) {
      router.push('/list');
    }
  }, []);
  
  return (
    <>
      <Component {...pageProps} />
      <Footer/>
      <ToastContainer />
    </>
  );
}
