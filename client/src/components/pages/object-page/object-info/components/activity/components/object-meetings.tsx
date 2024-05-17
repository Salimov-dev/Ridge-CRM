import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// hooks
// components
import BasicTable from "@common/table/basic-table";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import RowTitle from "@components/common/titles/row-title";
// utils
import sortingByDateAndTime from "@utils/sort/sorting-by-date-and-time";
// store
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList
} from "@store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleManager,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";
import { meetingsColumns } from "@columns/meetings.columns";
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { Dispatch, FC, SetStateAction } from "react";
import meetingsDialogsState from "@dialogs/dialog-handlers/meetings.dialog-handlers";

interface ObjectMeetingsProps {
  object: IObject | null;
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

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

const ObjectMeetings: FC<ObjectMeetingsProps> = ({
  object,
  setState,
  state
}): JSX.Element => {
  const currentUserId = useSelector(getCurrentUserId());
  const objectId = object?._id;

  const meetings = useSelector(getObjectMeetingsList(objectId));
  const sortedMeetings = sortingByDateAndTime(meetings);

  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

  const { handleOpenCreateMeetingPage } = meetingsDialogsState({ setState });

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
          itemsColumns={meetingsColumns({
            state: state,
            setState: setState,
            isCurrentUserRoleManager: isCurrentUserRoleManager
          })}
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
