import { Box, Typography } from "@mui/material";
import BasicTable from "../../../../components/common/table/basic-table";
import { useSelector } from "react-redux";
import { getMeetingLoadingStatus } from "../../../../store/meeting/meetings.store";

const CurrentWeeklyMeetings = ({ meetings, columns }) => {
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h3">Встречи на текущей неделе:</Typography>
      </Box>
      <BasicTable
        items={meetings}
        itemsColumns={columns}
        isLoading={isMeetingsLoading}
      />
    </>
  );
};

export default CurrentWeeklyMeetings;
