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

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LastContacts = ({ objectId, object, margin = "0", isAuthorEntity }) => {
  const isLastContactsLoading = useSelector(getLastContactsLoadingStatus());
  const columns = lastContactColumns;
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
        <CreateLastContactButton
          title="Добавить последний контакт"
          isAuthorEntity={isAuthorEntity}
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
