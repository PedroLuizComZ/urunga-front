import { VideoBoxContainer } from "./style";

const VideoBox = ({ data }: any) => {
  return (
    <VideoBoxContainer>
      {data.map(({ title, videos }: any, index: number) => (
        <div className="video-group">
          <h2>{title}</h2>
          <div className="video-container">
            {videos.map((video: any, index: any) => (
              <div key={index} className="video-item">
                <video width="300" height="400" controls>
                  <source src={`/videos/${video}`} type="video/mp4" />
                  Seu navegador não suporta o e lemento de vídeo.
                </video>
              </div>
            ))}
          </div>
        </div>
      ))}
    </VideoBoxContainer>
  );
};

export default VideoBox;
