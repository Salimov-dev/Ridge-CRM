import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateMeetingOpenState } from "../../../../../store/meeting/create-meeting.store";
import { getMeetingLoadingStatus } from "../../../../../store/meeting/meetings.store";

const CreateMeetingButton = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getMeetingLoadingStatus())

  const handleOpenCreateMeeting = () => {
    dispatch(setCreateMeetingOpenState(true));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleOpenCreateMeeting}
      disabled={isLoading}
      sx={{
        color: "white",
        background: "RoyalBlue",
        "&:hover": { background: "blue" },
      }}
    >
      <Typography variant="body0">Создать встречу</Typography>
    </Button>
  );
};

export default CreateMeetingButton;
