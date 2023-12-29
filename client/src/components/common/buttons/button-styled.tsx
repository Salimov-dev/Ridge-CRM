import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { tokens } from "@theme/theme";

const ButtonStyled = ({
  title = "title",
  onClick = () => {},
  isLoading = false,
  variant = "OBJECT",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let color = "white";
  let background = colors.grey[700];
  let backgroundHover = colors.grey[300];

  if ((variant = "OBJECT")) {
    background = colors.green["seaGreen"];
    backgroundHover = colors.green["darkGreen"];
  }

  return (
    <Button
      variant="contained"
      color="success"
      onClick={onClick}
      disabled={isLoading}
      sx={{
        color: color,
        background: background,
        "&:hover": { background: backgroundHover },
      }}
    >
      {title}
    </Button>
  );
};

export default ButtonStyled;
