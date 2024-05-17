import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface ICompaniesDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const companiesDialogsState = ({ setState }: ICompaniesDialogsStateProps) => {
  const handleOpenCreateCompanyPage = () => {
    setState((prevState) => ({ ...prevState, createCompanyPage: true }));
  };
  const handleCloseCreateCompanyPage = () => {
    setState((prevState) => ({ ...prevState, createCompanyPage: false }));
  };

  // обновление стейта при открытии  страницы правки компании
  const handleOpenUpdateCompanyPage = (companyId: string) => {
    setState((prevState) => ({
      ...prevState,
      updateCompanyPage: true,
      companyId: companyId
    }));
  };
  const handleCloseUpdateCompanyPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateCompanyPage: false
    }));
  };

  return {
    handleOpenCreateCompanyPage,
    handleCloseCreateCompanyPage,
    handleOpenUpdateCompanyPage,
    handleCloseUpdateCompanyPage
  };
};

export default companiesDialogsState;
