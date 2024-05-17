import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import MakePaymentPage from "@components/pages/payment/make-payment.page";
// dialogs;
import paymentDialogsState from "@dialogs/dialog-handlers/payments.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface PaymentsDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const PaymentsDialogPages: FC<PaymentsDialogPagesProps> = ({
  state,
  setState
}) => {
  const { handleCloseMakePaymentPage } = paymentDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={<MakePaymentPage onClose={handleCloseMakePaymentPage} />}
        onClose={handleCloseMakePaymentPage}
        open={state.makePaymentPage}
        maxWidth="sm"
      />
    </>
  );
};

export default PaymentsDialogPages;
