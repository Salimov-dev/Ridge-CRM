import { Box, Typography, styled } from "@mui/material";
import { FormatTime } from "../../../../utils/date/format-time";
import { FormatDate } from "../../../../utils/date/format-date";
import CloseButtonIcon from "../../../common/buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: start;
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

const Header = ({ meeting, onClose }) => {
  return (
    <Component>
      <Title>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h2">Редактировать встречу:</Typography>
          <Typography
            variant="h2"
            sx={{ background: "yellow", color: "black", marginLeft: "4px" }}
          >
            {FormatDate(meeting?.date)}
          </Typography>
          <Typography
            variant="h2"
            sx={{ background: "yellow", color: "black", padding: "0 4px" }}
          >
            в
          </Typography>
          <Typography
            variant="h2"
            sx={{ background: "yellow", color: "black" }}
          >
            {FormatTime(meeting?.time)}
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ background: "yellow", color: "black" }}>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Box>
              по адресу: {meeting?.location?.city}, {meeting?.location?.address}
            </Box>
          </Box>
        </Typography>
      </Title>

      <CloseButtonIcon onClose={onClose} />
    </Component>
  );
};

export default Header;
