import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "@common/table/basic-table";
import { lastContactColumns } from "@columns/last-contact.columns";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import RowTitle from "@components/common/titles/row-title";
import {
  getLastContactsList,
  getLastContactsLoadingStatus
} from "@store/last-contact/last-contact.store";

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
  isAuthorEntity
}) => {
  const isLastContactsLoading = useSelector(getLastContactsLoadingStatus());
  const columns = lastContactColumns(onUpdate);
  const address = `${object?.city}, ${object?.address}`;

  const lastContactsList = useSelector(getLastContactsList());

  const lastContacts = lastContactsList?.filter(
    (contact) => contact.objectId === objectId
  );
  const sortedLastContacts = lastContacts?.reverse();

  return (
    <>
      <Container sx={{ alignItems: "start" }}>
        <RowTitle
          title="Последние контакты по объекту"
          background="linear-gradient(to right, Chocolate , SaddleBrown)"
          margin="16px 0px -4px 0"
        />
        <ButtonStyled
          title="Добавить последний контакт"
          style="LAST_CONTACT"
          variant="contained"
          width="280px"
          onClick={() => onOpen(objectId)}
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
