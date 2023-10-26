import styled from "styled-components";

export const HomeContainer = styled.div``;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    p {
      margin: 0 20px;
      cursor: pointer;
    }
  }
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

  @media (max-width: 1150px) {
    flex-direction: column;

    .info-list {
      margin-bottom: 60px;
    }
  }
  .phone-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;

    img {
      position: relative !important;
    }
  }

  .info-list {
    margin-left: 60px;
    h2 {
      margin-bottom: 40px;
    }

    ul {
      list-style: none;
      li {
        margin: 12px 0;
        svg {
          margin-right: 16px;
        }
      }
    }

    div {
      margin-top: 30px;
      margin-right: 20px;

      img {
        object-fit: contain;
        cursor: pointer;
      }
    }
  }
`;

export const BenefitsContainer = styled.div`
  display: flex;
  background-color: #173046;
  flex-direction: column;
  padding: 100px 0px;

  @media (max-width: 1150px) {
    .benefit-container {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .card {
      margin-bottom: 115px;
    }

    .card:last-child {
      margin-bottom: 0;
    }
  }

  .benefit-container {
    display: flex;
    justify-content: space-around;
    background-color: #173046;
    padding: 20px;
  }

  h1 {
    margin-bottom: 150px;
    color: #ffffff;
    text-align: center;
  }

  .card {
    border: 2px solid #ffffff;
    border-radius: 15px;
    width: 350px;
    position: relative;
    background-color: #173046;
    display: flex;
    align-items: center;
    min-height: 255px;
  }

  .card img {
    color: transparent;
    border-radius: 50%;
    border: solid 2px #ffffff;
    object-fit: cover;
    position: relative;
    top: -100px;
  }

  .card-text {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #173046;
    color: white;
    padding: 10px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    text-align: center;
    height: 140px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 8px;
  }
`;

export const HomeFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 20px;
  }

  .main-info {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 60px;

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;

      .social {
        ul {
          justify-content: space-between;

          img {
            margin: 0;
          }
        }
      }

      .app {
        p {
          text-align: center;
        }
      }
    }
  }

  .social {
    ul {
      display: flex;
      list-style: none;
    }
  }

  img {
    object-fit: contain;
    margin-right: 10px;
    cursor: pointer;
  }

  svg {
    margin-right: 16px;
    cursor: pointer;
  }
`;
