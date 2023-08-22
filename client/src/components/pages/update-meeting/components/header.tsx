import { Box, Typography, styled, Button } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { FormatTime } from "../../../../utils/format-time";
import { FormatDate } from "../../../../utils/format-date";

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
  const navigate = useNavigate();
  return (
    <Component>
      <Title>
        <Typography variant="h2">Редактировать встречу:</Typography>
        <Typography variant="h2" sx={{ background: "yellow", color: "black" }}>
          <Box sx={{ display: "flex", gap: "8px" }}>
            {FormatDate(meeting.date)} в {FormatTime(meeting.time)} по адресу:{" "}
            {meeting?.location?.city}, {meeting?.location?.address}
          </Box>
        </Typography>
      </Title>

      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewOutlinedIcon
          sx={{ width: "20px", height: "20px", marginRight: "5px" }}
        />
        Назад
      </Button>
    </Component>
  );
};

export default Header;
