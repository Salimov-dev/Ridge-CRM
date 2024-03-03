import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OpenPageElementIconButton from "../buttons/icons buttons/open-page-element.button-icon";
import { AlignCenter } from "../columns/styled";
import { getContactsList } from "@store/contact/contact.store";

const ContactTableEntity = ({ contacts, onOpenContactPage }) => {
  const contactsList = useSelector(getContactsList());
  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {contacts.map((contact, index) => {
        const contactId = contact.contact;
        const getContactName = (contactId) => {
          const findedContact = contactsList?.find(
            (item) => item._id === contactId
          );
          return findedContact?.name;
        };

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {getContactName(contactId)}
            <OpenPageElementIconButton
              title="Открыть контакт"
              containerWidth="10px"
              height="20px"
              heightButton="20px"
              width="16px"
              onClick={() => onOpenContactPage(contactId)}
            />
          </Box>
        );
      })}
    </AlignCenter>
  );
};

export default ContactTableEntity;
