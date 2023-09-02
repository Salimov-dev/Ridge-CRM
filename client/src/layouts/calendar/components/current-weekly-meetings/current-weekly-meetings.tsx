import { Box, Typography } from "@mui/material";
import BasicTable from "../../../../components/common/table/basic-table";

const CurrentWeeklyMeetings = ({ meetings, columns, isLoading }) => {
  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h3">
          Встречи на текущей неделе:
        </Typography>
      </Box>
      <BasicTable
        items={meetings}
        itemsColumns={columns}
        isLoading={isLoading}
      />
    </>
  );
};

export default CurrentWeeklyMeetings;
