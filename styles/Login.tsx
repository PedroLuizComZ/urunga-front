import styled from "styled-components";

export const LoginContainer = styled.div`
  max-width: 100vw;
  max-width: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding: 15px;
  min-height: calc(var(--vh, 1vh) * 100);
  .logo-icon {
    width: 100%;
    object-fit: contain;
  }

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 34px;
    color: var(--primary-color);
    margin-bottom: 30px;
    width: 100%;
  }

  form {
    width: 100%;

    .forget-password {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      color: #fb344f;
      width: 100%;
      text-align: end;
      margin-bottom: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;

    span {
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 19px;
      color: var(--primary-color);
      margin-bottom: 12px;
    }

    input {
      background: #ffffff;
      border: 1px solid #c6c6c6;
      border-radius: 10px;
      height: 45px;
      padding: 0 10px;
    }
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

  p {
    flex: 1;
    display: flex;
    align-items: flex-end;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #999ea1;

    label {
      margin-left: 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      color: var(--primary-color);
    }
  }
`;
