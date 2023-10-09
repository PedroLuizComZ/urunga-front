import styled from "styled-components";

export const AdminPage = styled.div`
  background: #0e101c;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  min-height: 100vh;

  form {
    max-width: 500px;
    margin: 0 auto;
  }

  h1 {
    font-weight: 100;
    color: white;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(79, 98, 148);
  }

  .form {
    background: #0e101c;
    max-width: 400px;
    margin: 0 auto;
  }

  p {
    text-align: center;
  }

  p[role="button"] {
    margin: 20px;
    cursor: pointer;
  }

  p::before {
    display: inline;
  }

  input,
  button,
  select {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid white;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 13px;
    margin-top: 20px;
    color: white;
    font-size: 14px;
    font-weight: 200;
  }

  input[type="submit"] {
    background: #ec5990;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 20px;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 10px;
  }

  input[type="submit"]:hover,
  button:hover {
    background: #bf1650;
  }

  button {
    cursor: pointer;
  }

  input[type="button"]:active,
  input[type="submit"]:active,
  button:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }

  input:disabled {
    opacity: 0.4;
  }

  input[type="button"]:hover,
  button:hover {
    transition: 0.3s all;
  }

  input[type="button"],
  button,
  input[type="submit"] {
    -webkit-appearance: none;
  }

  .App {
    max-width: 600px;
    margin: 0 auto;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  th {
    color: #000000;
    background-color: #dddddd;
  }

  .promotion-wrapper {
    display: flex;
    align-items: center;
  }

  .promotion-wrapper label {
    margin-bottom: 10px !important;
    height: 100%;
    margin-left: 20px !important;
    cursor: pointer;
    margin: 0;
  }
`;
