import { Box, Typography } from "@mui/material";
import BasicTable from "../../../../common/table/basic-table";
import DividerStyled from "../../../../common/divider/divider-styled";
import { meetingsColumns } from "../../../../../columns/meetings-columns/meetings-columns";
import CreateMeetingButton from "../../../../../layouts/calendar/components/header/components/create-meeting-button";

const ObjectMeetings = ({
  meetings,
  object,
  onOpenCreateMeeting,
  isMeetingsLoading,
}) => {
  const address = `${object?.location?.city}, ${object?.location?.address}`;

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
        <Typography variant="h3">Встречи по объекту: {address}</Typography>
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
