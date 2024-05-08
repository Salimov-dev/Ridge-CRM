import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import VideoTrainingPage from "@components/pages/video-training/video-training.page";
// dialogs
import videoTrainingDialogsState from "@dialogs/dialog-handlers/video-training.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface VideoTrainingDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  videoTitle: string;
  videoSrc: string;
}

const VideoTrainingDialogPages: FC<VideoTrainingDialogPagesProps> = ({
  state,
  setState,
  videoTitle,
  videoSrc
}) => {
  const { handleCloseVideoPlayerPage } = videoTrainingDialogsState({
    setState
  });

  return (
    <DialogStyled
      component={
        <VideoTrainingPage
          onClose={handleCloseVideoPlayerPage}
          videoTitle={videoTitle}
          videoSrc={videoSrc}
        />
      }
      onClose={handleCloseVideoPlayerPage}
      maxWidth="lg"
      open={state.videoPlayerPage}
    />
  );
};

export default VideoTrainingDialogPages;
