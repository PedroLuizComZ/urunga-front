import styled from "styled-components";

export const VideoBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  max-width: 1500px;

  @media (max-width: 1100px) {
    flex-direction: column;

    .info-list {
      margin-bottom: 60px;
    }
  }

  .video-group {
    width: 300px;
    margin-bottom: 30px;
  }

  .video-item {
    width: 300px;
  }


  h2 {
    text-align: center;
    color: white;
    font-size: 18px;
    width: 300px;
    min-height: 80px;
  }
`;
