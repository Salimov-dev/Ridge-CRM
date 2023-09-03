import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import { FormatTime } from "../../../../../../../../../../utils/date/format-time";
import {
  setIsDoneMeeting,
  setIsNotDoneMeeting,
} from "../../../../../../../../../../store/meeting/meetings.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
const Title = ({ meet }) => {
  const dispatch = useDispatch();

  const handleDoneMeeting = (meet) => {
    const newMeeting = { ...meet, isDone: true };
    dispatch(setIsDoneMeeting(newMeeting));
  };

  const handleNotDoneMeeting = (meet) => {
    const newMeeting = { ...meet, isDone: false };
    dispatch(setIsNotDoneMeeting(newMeeting));
  };
  return (
    <Component>
      <Typography sx={{ fontSize: "15px", textDecoration: "underline" }}>
        <b>Встреча в: {FormatTime(meet.time)}</b>
      </Typography>
      {!meet?.isDone ? (
        <Box onClick={() => handleDoneMeeting(meet)}>
          {<CheckIcon sx={{ "&:hover": { transform: "scale(1.2)" } }} />}
        </Box>
      ) : (
        <Box onClick={() => handleNotDoneMeeting(meet)}>
          {
            <DoDisturbAltOutlinedIcon
              sx={{ "&:hover": { transform: "scale(1.2)" } }}
            />
          }
        </Box>
      )}
    </Component>
  );
};

export default Title;
