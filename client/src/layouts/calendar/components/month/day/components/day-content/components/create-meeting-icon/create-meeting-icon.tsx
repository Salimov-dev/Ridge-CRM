import { Box, Tooltip, styled } from "@mui/material";
import AddAlarmOutlinedIcon from "@mui/icons-material/AddAlarmOutlined";
import { useDispatch } from "react-redux";
import { setCreateMeetingOpenState } from "../../../../../../../../../store/meeting/create-meeting.store";

const Component = styled(Box)`
  display: flex;
  justify-content: end;
`;

const CreateMeetingIcon = ({
  day,
  isCurrentDay,
  isFutureDay,
  setDateCreate,
}) => {
  const dispatch = useDispatch();

  const handleOpenCreateMeeting = () => {
    dispatch(setCreateMeetingOpenState(true));
    setDateCreate(day);
  };

  return (
    <Component onClick={handleOpenCreateMeeting}>
      {isCurrentDay || isFutureDay ? (
        <Tooltip title="Добавить встречу" placement="top-start" arrow>
          <AddAlarmOutlinedIcon
            sx={{
              width: "25px",
              height: "25px",
              opacity: "0.3",
              "&:hover": {
                opacity: "1",
                transform: "scale(1.2)",
                color: "RoyalBlue",
              },
            }}
          />
        </Tooltip>
      ) : null}
    </Component>
  );
};

export default CreateMeetingIcon;
