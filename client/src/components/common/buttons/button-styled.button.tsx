import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { tokens } from "@theme/theme";

const ButtonStyled = ({
  title = "title",
  height = "auto",
  onClick = () => {},
  style,
  size = "medium",
  disabled = false,
  variant = "outlined",
  width = "min-content",
  icon = null,
  fontSize = "auto",
  padding = "auto"
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

  if (style === "DELETE") {
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

  if (style === "LAST_CONTACT") {
    background = colors.lastContact["primary"];
    colorHover = "white";
    backgroundHover = colors.lastContact["hover"];
  }

  if (style === "MEETING") {
    background = colors.meeting["primary"];
    colorHover = "white";
    backgroundHover = colors.meeting["hover"];
  }

  if (style === "PRESENTATION") {
    background = colors.presentation["primary"];
    colorHover = "white";
    backgroundHover = colors.presentation["hover"];
  }

  if (style === "TRANSFER_OJECTS") {
    background = colors.presentation["primary"];
    colorHover = "white";
    backgroundHover = colors.presentation["hover"];
  }

  if (style === "OPEN_OBJECT") {
    color = colors.grey[200];
    colorHover = "white";
    backgroundHover = colors.green["darkGreen"];
  }

  if (style === "TRY_DEMO") {
    background = "ForestGreen";
    colorHover = "white";
    backgroundHover = colors.green["darkGreen"];
  }

  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      size={size}
      startIcon={icon}
      sx={{
        padding: padding,
        fontSize: fontSize,
        height: height,
        color: color,
        borderColor: borderColor,
        background: background,
        whiteSpace: "nowrap",
        width: width,
        "&:hover": {
          color: colorHover,
          background: backgroundHover,
          borderColor: borderColor
        }
      }}
    >
      {title}
    </Button>
  );
};

export default ButtonStyled;
