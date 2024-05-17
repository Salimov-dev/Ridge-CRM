import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateContact from "@components/pages/contact/create-contact.page";
import UpdateContact from "@components/pages/contact/update-contact.page";
// dialogs;
import contactsDialogsState from "@dialogs/dialog-handlers/contacts.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface ContactsDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ContactsDialogPages: FC<ContactsDialogPagesProps> = ({
  state,
  setState
}) => {
  const { handleCloseCreateContactPage, handleCloseContactPage } =
    contactsDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={<CreateContact onClose={handleCloseCreateContactPage} />}
        maxWidth="sm"
        onClose={handleCloseCreateContactPage}
        open={state.createContactPage}
      />
      <DialogStyled
        component={
          <UpdateContact state={state} onClose={handleCloseContactPage} />
        }
        onClose={handleCloseContactPage}
        maxWidth="sm"
        open={state.openContactPage}
      />
    </>
  );
};

export default ContactsDialogPages;
