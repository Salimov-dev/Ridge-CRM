import { Button, Typography } from "@mui/material";

const CreateMeetingButton = ({ onOpen }) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={onOpen}
      sx={{
        color: "white",
        background: "blue",
        "&:hover": { background: "darkBlue" },
      }}
    >
      <Typography variant="body0">Добавить встречу</Typography>
    </Button>
  );
};

export default CreateMeetingButton;
