import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateLastContact from "@components/pages/last-contact/create-last-contact.page";
import UpdateLastContact from "@components/pages/last-contact/update-last-contact.page";
// dialogs;
import lastContactsDialogsState from "@dialogs/dialog-handlers/last-contacts.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface LastContactsDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const LastContactsDialogPages: FC<LastContactsDialogPagesProps> = ({
  state,
  setState
}) => {
  const { handleCloseCreateLastContactPage, handleCloseUpdateLastContactPage } =
    lastContactsDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={
          <CreateLastContact
            state={state}
            onClose={handleCloseCreateLastContactPage}
          />
        }
        onClose={handleCloseCreateLastContactPage}
        open={state.createLastContactPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <UpdateLastContact
            state={state}
            onClose={handleCloseUpdateLastContactPage}
          />
        }
        onClose={handleCloseUpdateLastContactPage}
        open={state.updateLastContactPage}
        maxWidth="sm"
      />
    </>
  );
};

export default LastContactsDialogPages;
