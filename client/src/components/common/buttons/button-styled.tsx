import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { tokens } from "@theme/theme";

const ButtonStyled = ({
  title = "title",
  onClick = () => {},
  isLoading = false,
  style,
  variant = "outlined",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let color = "white";
  let colorHover = "black";
  let borderColor = colors.grey[700];
  let background = colors.grey[700];
  let backgroundHover = colors.green["darkGreen"];

  if (style === "OBJECT") {
    colorHover = "white";
    background = colors.green["seaGreen"];
    backgroundHover = colors.green["darkGreen"];
  }

  if (style === "SUCCESS") {
    color = colors.green["mediumSeaGreen"];
    colorHover = "white";
    borderColor = colors.success["mediumSeaGreen"];
    backgroundHover = colors.success["darkGreen"];
  }

  if (style === "CANCEL") {
    color = colors.cancel["lightCoral"];
    colorHover = "white";
    borderColor = colors.cancel["lightCoral"];
    backgroundHover = colors.cancel["red"];
  }

  if (style === "MY_TASK") {
    background = colors.task["myTask"];
    colorHover = "white";
    backgroundHover = colors.task["myTaskHover"];
  }

  if (style === "MANAGER_TASK") {
    background = colors.task["managerTask"];
    colorHover = "white";
    backgroundHover = colors.task["managerTaskHover"];
  }

  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={isLoading}
      sx={{
        color: color,
        borderColor: borderColor,
        background: background,
        whiteSpace: "nowrap",
        "&:hover": {
          color: colorHover,
          background: backgroundHover,
          borderColor: borderColor,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default ButtonStyled;
