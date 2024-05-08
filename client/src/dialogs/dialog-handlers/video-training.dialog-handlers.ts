import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface VideoTrainingDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const videoTrainingDialogsState = ({
  setState
}: VideoTrainingDialogsStateProps) => {
  const handleOpenVideoPlayerPage = () => {
    setState((prevState) => ({
      ...prevState,
      videoPlayerPage: true
    }));
  };
  const handleCloseVideoPlayerPage = () => {
    setState((prevState) => ({
      ...prevState,
      videoPlayerPage: false
    }));
  };

  return {
    handleOpenVideoPlayerPage,
    handleCloseVideoPlayerPage
  };
};

export default videoTrainingDialogsState;
