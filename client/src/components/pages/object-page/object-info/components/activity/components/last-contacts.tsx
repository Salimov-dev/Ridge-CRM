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

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LastContacts = ({
  objectId,
  onOpen,
  onUpdate,
  isAuthorEntity,
  onOpenContactPage,
  isCurator
}) => {
  const lastContactsList = useSelector(getLastContactsList());
  const isLastContactsLoading = useSelector(getLastContactsLoadingStatus());
  const lastContacts = lastContactsList?.filter(
    (contact) => contact.objectId === objectId
  );
  const sortedLastContacts = lastContacts?.reverse();

  return (
    <Component>
      <Container sx={{ alignItems: "start" }}>
        <RowTitle
          title="Последние контакты по объекту"
          background="linear-gradient(to right, Chocolate , SaddleBrown)"
          margin="0px 0px -4px 0"
        />
        {isAuthorEntity ? (
          <ButtonStyled
            title="Добавить последний контакт"
            style="LAST_CONTACT"
            variant="contained"
            width="280px"
            onClick={() => onOpen(objectId)}
          />
        ) : null}
      </Container>

      {sortedLastContacts?.length ? (
        <BasicTable
          items={sortedLastContacts}
          itemsColumns={lastContactColumns(
            onUpdate,
            onOpenContactPage,
            isAuthorEntity,
            isCurator
          )}
          isLoading={isLastContactsLoading}
          isDialogMode={true}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </Component>
  );
};

export default LastContacts;
