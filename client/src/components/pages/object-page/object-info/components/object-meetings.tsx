import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "@common/table/basic-table";
import DividerStyled from "@common/divider/divider-styled";
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList,
} from "@store/meeting/meetings.store";

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
  isAuthorEntity = true,
}) => {
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const address = `${object?.city}, ${object?.address}`;

  const meetings = useSelector(getObjectMeetingsList(objectId));
  const sortedMeetings = sortingByDateAndTime(meetings);

  return (
    <>
      <DividerStyled />
      <Title>
        <Typography variant="h3">Встречи по объекту: {address}</Typography>
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
    </>
  );
};

export default ObjectMeetings;
