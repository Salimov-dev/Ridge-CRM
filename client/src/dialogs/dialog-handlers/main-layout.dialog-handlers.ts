import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface IMainLayoutDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const mainLayoutDialogsState = ({ setState }: IMainLayoutDialogsStateProps) => {
  const handleOpenAgreementPage = () => {
    setState((prevState) => ({
      ...prevState,
      agreementPage: true
    }));
  };
  const handleCloseAgreementPage = () => {
    setState((prevState) => ({
      ...prevState,
      agreementPage: false
    }));
  };

  const handleOpenPersonalPolicyPage = () => {
    setState((prevState) => ({
      ...prevState,
      personalPolicyPage: true
    }));
  };
  const handleClosePersonalPolicyPage = () => {
    setState((prevState) => ({
      ...prevState,
      personalPolicyPage: false
    }));
  };

  return {
    handleOpenAgreementPage,
    handleCloseAgreementPage,
    handleOpenPersonalPolicyPage,
    handleClosePersonalPolicyPage
  };
};

export default mainLayoutDialogsState;
