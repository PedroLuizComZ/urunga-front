import {
  CTAContainer,
  HeroContainer,
  HomeContainer,
  Title,
} from "../styles/Home";
import Image from "next/image";

export default function Home() {
  return (
    <HomeContainer>
      <Title>
        <Image
          src={"/logo.svg"}
          alt={"Logo"}
          height={88}
          width={88}
          className="logo-icon"
        />
      </Title>
      <HeroContainer>
        <Image
          src={"/images/logoBranco.png"}
          alt={"Logo"}
          className="logo-icon"
          fill={true}
        />

        <h1>Seu aplicativo de descontos em estabelicimentos</h1>
      </HeroContainer>
      <CTAContainer>
        <div className="phone-container">
          <Image
            src={"/images/phone.jpg"}
            alt={"Logo"}
            className="phone-img" 
            fill={true}
          />
        </div>
        <div>
          <h2>Baixe o APP</h2>
          <ul>
            <li>

            </li>
          </ul>
        </div>
      </CTAContainer>
    </HomeContainer>
  );
}
