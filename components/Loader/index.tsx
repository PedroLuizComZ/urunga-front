import { LoaderComponent } from "./style";
import { useRouter } from "next/router";

export default function Loader() {
  const router = useRouter();

  if (router.asPath !== "/" && router.asPath !== "/cadastro") {
    return (
      <LoaderComponent>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </LoaderComponent>
    );
  } else {
    return null;
  }
}
