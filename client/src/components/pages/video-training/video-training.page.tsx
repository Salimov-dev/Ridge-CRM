import React, { FC } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import VideoPlayer from "@components/common/video-player/video-player";

interface VideoTrainingPageProps {
  videoTitle: string;
  videoSrc: string;
  onClose: () => void;
}

const Component = styled(Box)`
  padding-bottom: 30px;
`;

const VideoTrainingPage: FC<VideoTrainingPageProps> = React.memo(
  ({ videoTitle, videoSrc, onClose }): JSX.Element => {
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
  }
);

export default VideoTrainingPage;
