import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
// components
import OpenPageElementIconButton from "../button-icons/open-page-element.button-icon";
import { AlignCenter } from "../../../styled/styled-columns";
import EmptyTd from "../columns/empty-td";
// store
import { getContactById, getContactsList } from "@store/contact/contact.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  alignitems: center;
  justify-content: center;
`;

const ContactTableEntity = ({ contacts, onOpenContactPage }) => {
  const contactsList = useSelector(getContactsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  const currentUserContacts = contacts?.filter((cont) => {
    const contact = useSelector(getContactById(cont.contact));
    const result = contact?.userId === currentUserId;
    return result;
  });
  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {(isManager ? currentUserContacts : contacts)?.length ? (
        contacts.map((contact, index) => {
          const contactId = contact.contact;

          const getContactName = (contactId) => {
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
                  height="20px"
                  heightButton="20px"
                  width="16px"
                  onClick={() => onOpenContactPage(contactId)}
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
