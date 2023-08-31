import { Box, Typography } from "@mui/material";
import BasicTable from "../../../../components/common/table/basic-table";

const CurrentWeeklyMyTasks = ({ myTasks, columns, isLoading }) => {
  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h3">
          Мои задачи на текущей неделе ({myTasks?.length})шт:
        </Typography>
      </Box>
      <BasicTable
        items={myTasks}
        itemsColumns={columns}
        isLoading={isLoading}
      />
    </>
  );
};

export default CurrentWeeklyMyTasks;
