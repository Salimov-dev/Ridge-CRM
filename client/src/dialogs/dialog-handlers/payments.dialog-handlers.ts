import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface IPaymentsDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const paymentDialogsState = ({ setState }: IPaymentsDialogsStateProps) => {
  const handleCloseMakePaymentPage = () => {
    setState((prevState: any) => ({
      ...prevState,
      makePaymentPage: false
    }));
  };
  const handleOpenMakePaymentPage = () => {
    setState((prevState) => ({
      ...prevState,
      makePaymentPage: true
    }));
  };

  return {
    handleOpenMakePaymentPage,
    handleCloseMakePaymentPage
  };
};

export default paymentDialogsState;
