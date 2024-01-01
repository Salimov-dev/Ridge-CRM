import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "@common/table/basic-table";
import DividerStyled from "@common/divider/divider-styled";
import CreateMeetingButton from "@components/UI/dialogs/buttons/create-meeting-button";
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList,
} from "@store/meeting/meetings.store";
import { meetingsColumnsDialog } from "@columns/meetings-columns-dialog/meetings-columns-dialog";
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";

const Title = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectMeetings = ({ object, objectId, isAuthorEntity = true }) => {
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  const meetings = useSelector(getObjectMeetingsList(objectId));
  const sortedMeetings = sortingByDateAndTime(meetings);

  return (
    <>
      <DividerStyled />
      <Title>
        <Typography variant="h3">Встречи по объекту: {address}</Typography>
        {isAuthorEntity ? <CreateMeetingButton /> : null}
      </Title>
      {sortedMeetings?.length ? (
        <BasicTable
          items={sortedMeetings}
          itemsColumns={meetingsColumnsDialog}
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
