import Image from "next/image";
import { FooterContainer, Spacing } from "./style";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  if (router.asPath !== "/" && router.asPath !== "/cadastro") {
    return (
      <>
        <Spacing />
        <FooterContainer>
          <div onClick={() => router.push("/list")}>
            <Image
              src={`/icons/home.svg`}
              alt={"home"}
              height={30}
              width={30}
            />
          </div>
          <div onClick={() => router.push("/profile")}>
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
