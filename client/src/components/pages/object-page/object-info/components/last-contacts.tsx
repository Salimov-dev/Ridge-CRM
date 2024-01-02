import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../common/divider/divider-styled";
import BasicTable from "../../../../common/table/basic-table";
import {
  getLastContactsList,
  getLastContactsLoadingStatus,
} from "../../../../../store/last-contact/last-contact.store";
import { lastContactColumns } from "../../../../../columns/last-contacts-columns/last-contact-columns";
import CreateLastContactButton from "@components/UI/dialogs/buttons/create-last-contact-button";
import ButtonStyled from "@components/common/buttons/button-styled";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LastContacts = ({
  objectId,
  onOpen,
  onUpdate,
  object,
  margin = "0",
  isAuthorEntity,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLastContactsLoading = useSelector(getLastContactsLoadingStatus());
  const columns = lastContactColumns(onUpdate);
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  const lastContactsList = useSelector(getLastContactsList());
  const lastContacts = lastContactsList?.filter(
    (contact) => contact.objectId === objectId
  );
  const sortedLastContacts = lastContacts.reverse();

  return (
    <>
      <DividerStyled />
      <Container sx={{ alignItems: "start" }}>
        <Typography variant="h3" sx={{ margin: margin }}>
          Последние контакты: {address}
        </Typography>
        <ButtonStyled
          title="Добавить последний контакт"
          style="LAST_CONTACT"
          variant="contained"
          onClick={onOpen}
        />
      </Container>

      {sortedLastContacts?.length ? (
        <BasicTable
          items={sortedLastContacts}
          itemsColumns={columns}
          isLoading={isLastContactsLoading}
          isDialogMode={true}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </>
  );
};

export default LastContacts;
