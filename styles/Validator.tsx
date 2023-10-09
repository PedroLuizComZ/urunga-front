import styled from "styled-components";

export const ValidatorContainer = styled.div`
  max-width: 100vw;
  max-width: 850px;
  height: 100%;
  min-height: 100vh;
  margin: auto;
  padding: 15px;

  .loaderContainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-icon {
    width: 100%;
    object-fit: contain;
  }

  h1 {
    text-align: center;
  }

  p {
    text-align: center;
    font-size: 20px;
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
    margin-top: 200px;
  }
`;
