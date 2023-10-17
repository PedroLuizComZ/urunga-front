import styled from "styled-components";

export const ListContainer = styled.div`
  max-width: 100vw;
  max-width: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding: 15px;

  .info-icons {
    margin-top: -15px;
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
    margin-top: 100px;
  }

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
`;

export const Categories = styled.div`
  h2 {
    padding: 15px;
    padding-bottom: 0;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .category-group::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .category-group {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .category-group {
    display: flex;
    max-width: 100vw;
    overflow: auto;
    padding: 16px;

    .orange {
      background-color: #ffc107;
    }
    .blue {
      background-color: #5ac8fa;
    }
    .purple {
      background-color: #5856d6;
    }
    .red {
      background-color: #ff2d55;
    }
    .coral {
      background-color: #ff7f50;
    }
    .pink {
      background-color: #ffb6c1;
    }
    .green {
      background-color: #b6dc73;
    }
    .brown {
      background-color: #523a28;
    }

    .category-item {
      margin-right: 20px;
    }

    .orange,
    .blue,
    .purple,
    .red,
    .coral,
    .green,
    .brown,
    .pink {
      height: 90px;
      width: 90px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
      margin-top: 10px;
      font-size: 15px;
      text-align: center;
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

    .image-holder {
      border-radius: 8px;
      img {
        border-radius: 8px;
      }
      margin-right: 20px;
    }

    .info-box {
      font-weight: 800;
      font-size: 17px;
      line-height: 22px;
      color: #000000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 200px;

      p {
        font-style: normal;
        font-weight: 800;
        font-size: 17px;
        line-height: 22px;
        color: #000000;
      }

      span {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.08px;
        color: #b8bbc6;
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
    }
  }

  .loaderContainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CitySelector = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  select {
    background: #ffffff;
    border: 0;
    border-radius: 10px;
    height: 45px;
  }
`;
