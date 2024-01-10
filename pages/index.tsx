import { useRouter } from "next/router";
import {
  BenefitsContainer,
  CTAContainer,
  HeroContainer,
  HomeContainer,
  HomeFooter,
  Title,
} from "../styles/Home";
import Image from "next/image";

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
    >
      <path
        d="M24.7188 13C24.7188 19.6878 19.2972 25.1094 12.6094 25.1094C5.92153 25.1094 0.5 19.6878 0.5 13C0.5 6.31216 5.92153 0.890625 12.6094 0.890625C19.2972 0.890625 24.7188 6.31216 24.7188 13ZM11.2087 19.4118L20.1931 10.4274C20.4981 10.1224 20.4981 9.62769 20.1931 9.32261L19.0882 8.21777C18.7832 7.91265 18.2885 7.91265 17.9833 8.21777L10.6562 15.5448L7.2354 12.124C6.93032 11.8189 6.43564 11.8189 6.13052 12.124L5.02568 13.2288C4.72061 13.5339 4.72061 14.0286 5.02568 14.3336L10.1038 19.4118C10.4089 19.7169 10.9036 19.7169 11.2087 19.4118Z"
        fill="#173046"
      />
    </svg>
  );
};

export default function Home() {
  const handleAppleClick = () => {
    window.open(`https://apps.apple.com/br/app/urunga/id6448813467`);
  };

  const handleGoogleClick = () => {
    window.open(
      `https://play.google.com/store/apps/details?id=com.pedroluizcomz.urunga`
    );
  };

  const handleInstagramClick = () => {
    window.open(`https://www.instagram.com/app.urunga/`);
  };

  const handleTicTocClick = () => {
    window.open(`https://www.tiktok.com/@urunga?_t=8el9wSnX45u&_r=1`);
  };

  const handleEmailClick = () => {
    window.open(`mailto:app.urunga@gmail.com`);
  };

  const router = useRouter();

  return (
    <HomeContainer>
      <Title>
        <Image
          src={"/logo.svg"}
          alt={"Urunga"}
          height={100}
          width={100}
          className="logo-icon"
        />
        <div>
          <p onClick={() => router.push("/login")}>Parceiro</p>
          <p onClick={() => router.push("/app")}>App</p>
        </div>
      </Title>
      <HeroContainer>
        <Image
          src={"/images/logoBranco.png"}
          alt={"Urunga"}
          className="logo-icon"
          fill={true}
        />

        <h1>Seu aplicativo de descontos em estabelicimentos</h1>
      </HeroContainer>
      <CTAContainer>
        <div className="phone-container">
          <Image
            src={"/images/phone.jpg"}
            alt={"Urunga"}
            className="phone-img"
            fill={true}
          />
        </div>
        <div className="info-list">
          <h2>Baixe o App</h2>
          <ul>
            <li>{CheckIcon()}Filtros Personalizados</li>
            <li>{CheckIcon()}Economize em Restaurantes</li>
            <li>{CheckIcon()}Códigos Verificados</li>
            <li>{CheckIcon()}Navegação Intuitiva</li>
          </ul>
          <div>
            <Image
              src="/images/appStore.png"
              alt="imagem 1"
              width={160}
              height={40}
              onClick={handleAppleClick}
            />
            <Image
              src="/images/playStore.png"
              alt="imagem 1"
              width={160}
              height={40}
              onClick={handleGoogleClick}
            />
          </div>
        </div>
      </CTAContainer>
      <BenefitsContainer>
        <h1>Vantangens</h1>
        <div className="benefit-container">
          <div className="card">
            <Image
              src="/images/comida1.jpg"
              alt="imagem 1"
              width={200}
              height={200}
            />
            <div className="card-text">
              Economize mais a cada dia! Descubra cupons exclusivos e garanta
              descontos incríveis nos seus restaurantes favoritos.
            </div>
          </div>
          <div className="card">
            <Image
              src="/images/comida2.jpg"
              alt="imagem 2"
              width={200}
              height={200}
            />
            <div className="card-text">
              Descontos à sua disposição! Navegue por categorias e encontre as
              melhores ofertas para todas as suas necessidades em um só lugar.
            </div>
          </div>
          <div className="card">
            <Image
              src="/images/comida3.jpg"
              alt="imagem 3"
              width={200}
              height={200}
            />
            <div className="card-text">
              Expanda seu paladar! Estamos sempre adicionando novos restaurantes
              ao aplicativo, oferecendo uma variedade ainda maior de opções e
              descontos para suas refeições.
            </div>
          </div>
        </div>
      </BenefitsContainer>
      <HomeFooter>
        <div className="main-info">
          <div className="social">
            <p>Acompanhe</p>
            <ul>
              <li>
                <Image
                  src={"/icons/instagram.svg"}
                  alt={"RatingStar"}
                  height={30}
                  width={30}
                  onClick={handleInstagramClick}
                />
              </li>

              <li>
                <Image
                  src={"/icons/tictoc.svg"}
                  alt={"RatingStar"}
                  height={30}
                  width={30}
                  onClick={handleTicTocClick}
                />
              </li>

              <li>
                <Image
                  src="/icons/mail.svg"
                  alt="Email"
                  height={30}
                  width={30}
                  onClick={handleEmailClick}
                />
              </li>
            </ul>
          </div>
          <div className="app">
            <p>Baixe o App</p>
            <div>
              <Image
                src="/images/appStore.png"
                alt="appStore"
                width={120}
                height={50}
                onClick={handleAppleClick}
              />
              <Image
                src="/images/playStore.png"
                alt="playStore"
                width={120}
                height={50}
                onClick={handleGoogleClick}
              />
            </div>
          </div>
        </div>
        <Image
          src={"/logo.svg"}
          alt={"Urunga"}
          height={100}
          width={100}
          className="logo-icon"
        />
      </HomeFooter>
    </HomeContainer>
  );
}
