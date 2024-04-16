import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// columns
import { lastContactColumns } from "@columns/last-contact.columns";
// components
import BasicTable from "@common/table/basic-table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import RowTitle from "@components/common/titles/row-title";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import {
  getLastContactsList,
  getLastContactsLoadingStatus
} from "@store/last-contact/last-contact.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleManager,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

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

const LastContacts = ({ object, setState }) => {
  const objectId = object?._id;
  const currentUserId = useSelector(getCurrentUserId());

  const lastContactsList = useSelector(getLastContactsList());
  const lastContacts = lastContactsList?.filter(
    (contact) => contact.objectId === objectId
  );
  const sortedLastContacts = lastContacts?.reverse();

  const isLastContactsLoading = useSelector(getLastContactsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

  const {
    handleOpenCreateLastContactPage,
    handleOpenUpdateLastContactPage,
    handleOpenContactPage
  } = useDialogHandlers(setState);

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
            onClick={() => handleOpenCreateLastContactPage(objectId)}
          />
        ) : null}
      </Container>

      {sortedLastContacts?.length ? (
        <BasicTable
          items={sortedLastContacts}
          itemsColumns={lastContactColumns(
            handleOpenUpdateLastContactPage,
            handleOpenContactPage,
            isCurrentUserRoleManager
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
