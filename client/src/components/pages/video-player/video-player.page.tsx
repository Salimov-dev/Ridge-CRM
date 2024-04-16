import styled from "@emotion/styled";
import { Box } from "@mui/material";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import VideoPlayer from "@components/common/video-player/video-player";

const Component = styled(Box)`
  padding-bottom: 30px;
`;

const VideoPlayerPage = ({ videoTitle, videoSrc, onClose }) => {
  return (
    <Component>
      <HeaderWithCloseButtonForPage
        title={videoTitle}
        color="white"
        margin="0 0 20px 0"
        onClose={onClose}
        background="Red"
      />
      <VideoPlayer src={videoSrc} />
    </Component>
  );
};

export default VideoPlayerPage;
