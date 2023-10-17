import styled from "styled-components";

export const HomeContainer = styled.div``;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroContainer = styled.div`
  background-image: url(/images/homeBanner.png);
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-direction: column;

  h1 {
    position: relative;
    height: 120px;
    margin-top: -120px;
    color: #ffffff;
    max-width: 800px;
    text-align: center;
    margin-bottom: 0;
  }

  img {
    position: relative !important;
    object-fit: contain;
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const CTAContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .phone-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;

    img {
      position: relative !important;
    }
  }
`;
