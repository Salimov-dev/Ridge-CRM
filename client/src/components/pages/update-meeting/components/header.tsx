import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../utils/date/format-time";
import { FormatDate } from "../../../../utils/date/format-date";
import PageBackButton from "../../../common/buttons/page-back-button";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
`;

const Title = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

const Header = ({ meeting }) => {
  return (
    <Component>
      <Title>
        <Typography variant="h2">Редактировать встречу:</Typography>
        <Typography variant="h2" sx={{ background: "yellow", color: "black" }}>
          <Box sx={{ display: "flex", gap: "8px" }}>
            {FormatDate(meeting?.date, "h2")} в{" "}
            {FormatTime(meeting?.time, "h2")} по адресу:
            {meeting?.location?.city}, {meeting?.location?.address}
          </Box>
        </Typography>
      </Title>

      <PageBackButton />
    </Component>
  );
};

export default Header;
