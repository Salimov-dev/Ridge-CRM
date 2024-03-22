import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OpenPageElementIconButton from "../buttons/icons buttons/open-page-element.button-icon";
import { AlignCenter } from "../columns/styled";
import { getContactsList } from "@store/contact/contact.store";
import styled from "@emotion/styled";
import EmptyTd from "../columns/empty-td";

const Component = styled(Box)`
  display: flex;
  gap: 8px;
  alignitems: center;
  justify-content: center;
`;

const ContactTableEntity = ({ contacts, onOpenContactPage }) => {
  const contactsList = useSelector(getContactsList());
  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {contacts?.length ? (
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
                  containerWidth="10px"
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
