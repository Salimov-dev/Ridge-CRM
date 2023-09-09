import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "../../../../common/table/basic-table";
import DividerStyled from "../../../../common/divider/divider-styled";
import CreateMeetingButton from "../../../../UI/dialogs/buttons/create-meeting-button";
import { getMeetingLoadingStatus } from "../../../../../store/meeting/meetings.store";
import { meetingsColumnsDialog } from "../../../../../columns/meetings-columns-dialog/meetings-columns-dialog";

const Title = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectMeetings = ({ meetings, object }) => {
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  return (
    <>
      <DividerStyled />
      <Title>
        <Typography variant="h3">Встречи по объекту: {address}</Typography>
        <CreateMeetingButton />
      </Title>
      {meetings?.length ? (
        <BasicTable
          items={meetings}
          itemsColumns={meetingsColumnsDialog}
          isLoading={isMeetingsLoading}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </>
  );
};

export default ObjectMeetings;
