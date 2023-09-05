import { Button, Typography } from "@mui/material";

const CreateMeetingButton = ({ onOpen, disabled }) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={onOpen}
      disabled={disabled}
      sx={{
        color: "white",
        background: "blue",
        "&:hover": { background: "darkBlue" },
      }}
    >
      <Typography variant="body0">Создать встречу</Typography>
    </Button>
  );
};

export default CreateMeetingButton;
