import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface IContactsDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const contactsDialogsState = ({ setState }: IContactsDialogsStateProps) => {
  const handleOpenCreateContactPage = () => {
    setState((prevState) => ({ ...prevState, createContactPage: true }));
  };
  const handleCloseCreateContactPage = () => {
    setState((prevState) => ({ ...prevState, createContactPage: false }));
  };

  // обновление стейта при обновлении контакта
  const handleOpenContactPage = (contactId: string) => {
    setState((prevState) => ({
      ...prevState,
      openContactPage: true,
      contactId: contactId
    }));
  };
  const handleCloseContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      openContactPage: false
    }));
  };

  return {
    handleOpenCreateContactPage,
    handleCloseCreateContactPage,
    handleOpenContactPage,
    handleCloseContactPage
  };
};

export default contactsDialogsState;
