import styled from "styled-components";

export const RestaurantContainer = styled.div`
  max-width: 850px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin: auto;
  padding: 15px;
  margin-bottom: 65px;

  .back-icon {
    position: absolute;
    top: 35px;
    left: 15px;
  }

  .logo-icon {
    width: 100%;
    object-fit: contain;
  }

  .search-bar {
    width: 100%;

    img {
      color: transparent;
      position: relative;
      top: 34px;
      left: 10px;
    }

    input {
      background: #f2f2f2;
      border-radius: 10px;
      height: 45px;
      width: 100%;
      padding-left: 40px;
      border: 0;
    }
  }
`;

export const ItemList = styled.div`
  width: 100%;

  h2 {
    margin-bottom: 15px;
  }
  li {
    display: flex;
    margin-bottom: 12px;
    flex-direction: column;
    align-items: center;

    .image-holder {
      border-radius: 8px;
      img {
        border-radius: 50%;
      }
    }

    .info-box {
      margin-top: 30px;
      font-weight: 800;
      font-size: 17px;
      line-height: 22px;
      color: #000000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        font-style: normal;
        font-weight: 800;
        font-size: 28px;
        line-height: 22px;
        color: #000000;
        margin-bottom: 18px;
      }

      span {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.08px;
        color: #b8bbc6;
        margin-bottom: 8px;
      }

      .ratings {
        label {
          font-weight: 400;
          font-size: 13px;
          line-height: 18px;
          letter-spacing: -0.08px;
          color: #000000;
          margin: 0 4px;
        }

        small {
          font-weight: 400;
          font-size: 13px;
          line-height: 18px;
          letter-spacing: -0.08px;
          color: #b8bbc6;
        }
      }

      .social-media-container {
        img {
          margin: 10px;
          padding: 2px;
          cursor: pointer;
        }
      }
    }
  }
`;

export const InformationContainer = styled.div`
  width: 100%;

  p {
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    margin: 18px 0;
  }

  label {
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    color: #000000;
    opacity: 0.5;
    margin-left: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      margin-bottom: 18px;
      display: flex;
      align-items: center;
    }
  }
`;

export const QrCodeContainer = styled.div`
  width: 100vw;
  bottom: 0;
  padding: 15px;
  button {
    background: var(--primary-color);
    border-radius: 10px;
    width: 100%;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
    border: 0;
    justify-content: center;
    height: 50px;
    cursor: pointer;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const ModalReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;

  h1 {
    font-weight: 600;
    font-size: 27.65px;
    line-height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    margin: 25px 0;
  }

  img {
    cursor: pointer;
  }

  textarea {
    resize: none;
    width: 90%;
    margin: 25px 0;
    height: 200px;
    font-weight: 500;
    font-size: 19.2px;
    line-height: 100%;
    padding: 11px;
  }

  button {
    background: var(--primary-color);
    border-radius: 10px;
    width: 100%;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
    border: 0;
    justify-content: center;
    height: 50px;
    cursor: pointer;
    margin-bottom: 30px;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    color: #000000;
  }
`;
