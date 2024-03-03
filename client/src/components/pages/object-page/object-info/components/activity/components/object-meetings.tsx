import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "@common/table/basic-table";
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import RowTitle from "@components/common/titles/row-title";
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList
} from "@store/meeting/meetings.store";

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

const ObjectMeetings = ({
  object,
  objectId,
  onOpenCreateMeeting,
  columns,
  isAuthorEntity = true
}) => {
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const address = `${object?.city}, ${object?.address}`;

  const meetings = useSelector(getObjectMeetingsList(objectId));
  const sortedMeetings = sortingByDateAndTime(meetings);

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
            onClick={() => onOpenCreateMeeting(objectId)}
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
