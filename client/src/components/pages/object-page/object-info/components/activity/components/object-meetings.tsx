import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// components
import BasicTable from "@common/table/basic-table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import RowTitle from "@components/common/titles/row-title";
// utils
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
// store
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList
} from "@store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectMeetings = ({ object, setState, columns }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const objectId = object?._id;

  const meetings = useSelector(getObjectMeetingsList(objectId));
  const sortedMeetings = sortingByDateAndTime(meetings);

  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

  const { handleOpenCreateMeetingPage } = useDialogHandlers(setState);

  return (
    <Component>
      <Title>
        <RowTitle
          title="Встречи по объекту"
          background="linear-gradient(to right, RoyalBlue , MediumBlue)"
          margin="0px 0px -4px 0"
        />
        {isAuthorEntity ? (
          <ButtonStyled
            title="Добавить встречу"
            style="MEETING"
            onClick={() => handleOpenCreateMeetingPage(objectId)}
          />
        ) : null}
      </Title>
      {sortedMeetings?.length ? (
        <BasicTable
          items={sortedMeetings}
          itemsColumns={columns}
          isLoading={isMeetingsLoading}
          isDialogMode={true}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </Component>
  );
};

export default ObjectMeetings;
