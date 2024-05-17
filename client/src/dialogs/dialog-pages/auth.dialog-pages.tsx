import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import AuthPage from "@components/pages/auth/auth.page";
// dialogs;
import authDialogsState from "@dialogs/dialog-handlers/auth.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface AuthDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const AuthDialogPages: FC<AuthDialogPagesProps> = ({ state, setState }) => {
  const { handleCloseAuthPage } = authDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={
          <AuthPage onClose={handleCloseAuthPage} startPage={state.startPage} />
        }
        maxWidth="xs"
        onClose={handleCloseAuthPage}
        open={state.authPage}
      />
    </>
  );
};

export default AuthDialogPages;
