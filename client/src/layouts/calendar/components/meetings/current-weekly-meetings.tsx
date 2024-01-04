import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import BasicTable from "../../../../components/common/table/basic-table";
import { getMeetingLoadingStatus } from "../../../../store/meeting/meetings.store";

const Title = styled(Box)`
  margin-bottom: "10px";
`;

const CurrentWeeklyMeetings = ({ meetings, columns }) => {
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  return (
    <>
      <Title>
        <Typography variant="h3">Встречи на текущей неделе:</Typography>
      </Title>
      <BasicTable
        items={meetings}
        itemsColumns={columns}
        isLoading={isMeetingsLoading}
      />
    </>
  );
};

export default CurrentWeeklyMeetings;
