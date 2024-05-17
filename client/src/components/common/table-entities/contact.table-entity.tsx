import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { Dispatch, FC, SetStateAction } from "react";
// components
import OpenPageElementIconButton from "../button-icons/open-page-element.button-icon";
import { AlignCenter } from "@styled/styled-columns";
import EmptyTd from "../columns/empty-td";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// dialogs
import contactsDialogsState from "@dialogs/dialog-handlers/contacts.dialog-handlers";
// store
import { getContactById, getContactsList } from "@store/contact/contact.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

interface ContactTableEntityProps {
  contacts: { contact: string }[];
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  alignitems: center;
  justify-content: center;
`;

const ContactTableEntity: FC<ContactTableEntityProps> = ({
  contacts,
  setState
}): JSX.Element => {
  const contactsList = useSelector(getContactsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const { handleOpenContactPage } = contactsDialogsState({ setState });

  const currentUserContacts = contacts.filter((cont) => {
    const contact = useSelector(getContactById(cont.contact));
    const result = contact?.userId === currentUserId;
    return result;
  });

  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {(isCurrentUserRoleManager ? currentUserContacts : contacts)?.length ? (
        contacts.map((contact) => {
          const contactId = contact.contact;

          const getContactName = (contactId: string) => {
            const findedContact = contactsList?.find(
              (item) => item._id === contactId
            );

            return findedContact?.name;
          };

          return (
            getContactName(contactId) && (
              <Component key={contactId}>
                {getContactName(contactId)}
                <OpenPageElementIconButton
                  title="Открыть контакт"
                  heightButton="20px"
                  onClick={() => handleOpenContactPage(contactId)}
                />
              </Component>
            )
          );
        })
      ) : (
        <EmptyTd />
      )}
    </AlignCenter>
  );
};

export default ContactTableEntity;
