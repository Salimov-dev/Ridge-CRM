import { IPresentationDialogsState } from "@interfaces/presentation/presentation.interfaces";
import { Dispatch, SetStateAction } from "react";

interface IVideoPlayerDialogsStateProps {
  setState: Dispatch<SetStateAction<IPresentationDialogsState>>;
}

const videoPlayerDialogsState = ({
  setState
}: IVideoPlayerDialogsStateProps) => {
  const handleOpenVideoPlayerPage = (): void => {
    setState((prevState) => ({
      ...prevState,
      videoPlayerPage: true
    }));
  };

  const handleCloseVideoPlayerPage = (): void => {
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

export default videoPlayerDialogsState;
