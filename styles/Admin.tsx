import styled from "styled-components";

export const AdminPage = styled.div`
  background: #0e101c;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  min-height: 100vh;
  overflow-y: hidden;

  .main-title {
    padding: 15px;
    margin: 0;
  }

  a {
    text-decoration: none !important;
  }

  h1 {
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

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
    color: white;
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
    background: #3b3b3b;
    border-color: #3b3b3b;
    color: #ffffff;
  }

  button {
    background: #6b6b6b;
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
    color: white;
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

  .checkbox-container {
    display: flex;
    align-items: center;

    p {
      margin: 0;
      min-width: 130px;
      text-align: left;
    }

    .switch {
      margin-left: 20px;
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #2196f3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }

  .dashboard-container {
    display: flex;

    canvas {
      width: 50% !important;
      height: auto !important;
    }
  }

  .comments-item {
    padding: 10px;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
    border-radius: 5px;
    list-style: none;
  }
`;
