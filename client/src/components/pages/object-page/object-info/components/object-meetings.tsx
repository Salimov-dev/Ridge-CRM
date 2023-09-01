import { Box, Typography } from "@mui/material";
import DividerStyled from "../../../../common/divider/divider-styled";
import CreateMeetingButton from "../../../../../layouts/calendar/components/header/components/create-meeting-button";
import BasicTable from "../../../../common/table/basic-table";
import { meetingsColumns } from "../../../../../columns/meetings-columns";

const ObjectMeetings = ({meetings, onOpenCreateMeeting, isMeetingsLoading}) => {
  return (
    <>
      <DividerStyled />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Встречи по этому объекту:</Typography>
        <CreateMeetingButton onOpen={onOpenCreateMeeting} />
      </Box>
      {meetings?.length ? (
        <BasicTable
          items={meetings}
          itemsColumns={meetingsColumns}
          isLoading={isMeetingsLoading}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </>
  );
};

export default ObjectMeetings;
