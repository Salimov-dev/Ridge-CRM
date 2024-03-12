import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import VideoPlayer from "@components/common/video-player/video-player";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Component = styled(Box)`
  padding-bottom: 30px;
`;

const VideoPlayerPage = ({ videoTitle, videoSrc, onClose }) => {
  return (
    <Component>
      <HeaderWithCloseButton
        title={videoTitle}
        color="white"
        margin="0 0 20px 0"
        onClose={onClose}
        background="Red"
      />
      <Typography>
        Скоро здесь будет обучающее видео по этой странице, а пока посмотрите
        спидран :)
      </Typography>
      <VideoPlayer src={videoSrc} />
    </Component>
  );
};

export default VideoPlayerPage;
