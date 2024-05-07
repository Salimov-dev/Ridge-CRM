import { Dispatch, SetStateAction } from "react";
import { IPresentationDialogsState } from "@interfaces/presentation/presentation.interfaces";

interface IPresentationDialogsStateProps {
  setState: Dispatch<SetStateAction<IPresentationDialogsState>>;
}

const presentationDialogsState = ({
  setState
}: IPresentationDialogsStateProps) => {
  const handleOpenCreatePresentationPage = (): void => {
    setState((prevState) => ({
      ...prevState,
      createPresentationPage: true
    }));
  };

  const handleCloseCreatePresentationPage = (): void => {
    setState((prevState) => ({
      ...prevState,
      createPresentationPage: false
    }));
  };

  const handleOpenUpdatePresentationPage = (presentationId: string): void => {
    setState((prevState) => ({
      ...prevState,
      updatePresentationPage: true,
      presentationId: presentationId
    }));
  };
  const handleCloseUpdatePresentationPage = () => {
    setState((prevState) => ({
      ...prevState,
      updatePresentationPage: false
    }));
  };

  return {
    handleOpenCreatePresentationPage,
    handleCloseCreatePresentationPage,
    handleOpenUpdatePresentationPage,
    handleCloseUpdatePresentationPage
  };
};

export default presentationDialogsState;
