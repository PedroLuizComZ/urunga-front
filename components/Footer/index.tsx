import Image from "next/image";
import { FooterContainer, Spacing } from "./style";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  if (router.asPath !== "/app" && router.asPath !== "/app/cadastro") {
    return (
      <>
        <Spacing />
        <FooterContainer>
          <div onClick={() => router.push("/app/list")}>
            <Image
              src={`/icons/home.svg`}
              alt={"home"}
              height={30}
              width={30}
            />
          </div>
          <div onClick={() => router.push("/app/profile")}>
            <Image
              src={`/icons/profile.svg`}
              alt={"profile"}
              height={30}
              width={30}
            />
          </div>
        </FooterContainer>
      </>
    );
  } else {
    return null;
  }
}
