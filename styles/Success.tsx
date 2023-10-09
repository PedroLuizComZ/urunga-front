import styled from "styled-components";

export const SuccessContainer = styled.div`
  max-width: 100vw;
  max-width: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding: 15px;

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
      background: #ffffff;
      border: 1px solid #c6c6c6;
      border-radius: 10px;
      height: 45px;
      width: 100%;
      padding-left: 40px;
    }
  }

  h1 {
    text-align:center;
    margin-bottom: 30px;
  }

  p {
    text-align:center;
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
  }
`;

