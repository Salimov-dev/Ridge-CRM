const VideoPlayer = ({ src }) => {
  return (
    <div>
      <iframe
        width="100%"
        height="600px"
        src={src}
        title="YouTube video player"
        allowFullScreen
        style={{ border: "none" }}
      />
    </div>
  );
};

export default VideoPlayer;
