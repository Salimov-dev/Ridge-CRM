import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import Agreement from "@components/pages/agreement/agreement";
import PersonalPolicy from "@components/pages/agreement/personal-policy";
// dialogs;
import mainLayoutDialogsState from "@dialogs/dialog-handlers/main-layout.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface MainLayoutDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const MainLayoutDialogPages: FC<MainLayoutDialogPagesProps> = ({
  state,
  setState
}) => {
  const { handleCloseAgreementPage, handleClosePersonalPolicyPage } =
    mainLayoutDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={<Agreement onClose={handleCloseAgreementPage} />}
        onClose={handleCloseAgreementPage}
        maxWidth="xl"
        open={state.agreementPage}
      />
      <DialogStyled
        component={<PersonalPolicy onClose={handleClosePersonalPolicyPage} />}
        onClose={handleClosePersonalPolicyPage}
        maxWidth="xl"
        open={state.personalPolicyPage}
      />
    </>
  );
};

export default MainLayoutDialogPages;
