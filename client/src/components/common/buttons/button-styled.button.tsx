import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { getIsLoggedIn } from "@store/user/users.store";
import { tokens } from "@theme/theme";
import { useSelector } from "react-redux";

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
  padding = "auto",
  border = null,
  background = null,
  backgroundHover = null,
  colorHover = null,
  margin = "0"
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoggedIn = useSelector(getIsLoggedIn());

  let color = "white";
  // let colorHover = "black";
  let borderColor = colors.grey[700];
  // let background = colors.grey[700];
  // let backgroundHover = colors.green["darkGreen"];

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
    color = "white";
    colorHover = "white";
    background = "firebrick";
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

  if (style === "MY_TASK_CALL") {
    background = "DarkOrange";
    colorHover = "white";
    backgroundHover = "linear-gradient(to right, SaddleBrown, DarkGreen)";
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
    background = "Chocolate";
    colorHover = "white";
    backgroundHover = "Sienna";
  }

  if (style === "TRANSFER_OJECTS") {
    background = "RoyalBlue";
    colorHover = "white";
    backgroundHover = "MediumBlue";
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

  if (style === "CONTACT") {
    background = "SteelBlue";
    colorHover = "white";
    backgroundHover = "MediumBlue";
  }

  if (style === "ADD_SOME_NEW") {
    background = null;
    color = "LimeGreen";
    colorHover = "white";
    backgroundHover = "DarkGreen";
    border = "1px dashed LimeGreen !important";
  }

  if (style === "REMOVE_SOME_NEW") {
    background = null;
    color = "Tomato";
    colorHover = "white";
    backgroundHover = "OrangeRed";
    border = "1px dashed Tomato !important";
  }

  if (style === "ADD_NEW_EMAIL") {
    background = null;
    color = "orange";
    colorHover = "white";
    backgroundHover = "DarkOrange";
    border = "1px dashed orange !important";
  }

  if (style === "ADD_NEW_OBJECT") {
    background = null;
    color = "SkyBlue";
    colorHover = "white";
    backgroundHover = "RoyalBlue";
    border = "1px dashed SteelBlue !important";
  }

  if (style === "CREATE_NEW_OBJECT") {
    background = null;
    color = "Aquamarine";
    colorHover = "white";
    backgroundHover = "CadetBlue";
    border = "1px dashed CadetBlue !important";
  }

  if (style === "COMPANY") {
    background = "DarkViolet";
    colorHover = "white";
    backgroundHover = "DarkMagenta";
  }

  if (style === "ADD_NEW_COMPANY") {
    background = null;
    color = "Gold";
    colorHover = "white";
    backgroundHover = "Tomato";
    border = "1px dashed Crimson !important";
  }

  if (style === "CREATE_NEW_COMPANY") {
    background = null;
    color = "Gainsboro";
    colorHover = "white";
    backgroundHover = "SaddleBrown";
    border = "1px dashed Peru !important";
  }

  if (style === "CREATE_NEW_Contact") {
    background = null;
    color = "GreenYellow";
    colorHover = "white";
    backgroundHover = "ForestGreen";
    border = "1px dashed GreenYellow !important";
  }

  if (style === "ADD_NEW_Contact") {
    background = null;
    color = "Orange";
    colorHover = "white";
    backgroundHover = "DarkOrange";
    border = "1px dashed Orange !important";
  }

  if (style === "REGISTER") {
    background = "ForestGreen";
    color = "white";
    colorHover = "white";
    backgroundHover = "DarkGreen";
  }

  if (style === "DELETE_ICON") {
    background = null;
    color = null;
    colorHover = null;
    backgroundHover = null;
    border = null;
  }

  if (style === "VIDEO_INSTR") {
    background = "Red";
    color = "white";
    colorHover = "white";
    backgroundHover = "FireBrick";
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
        height: {
          xs: !isLoggedIn ? "pre-wrap" : "nowrap",
          sm: height
        },
        color: color,
        border: border,
        borderColor: borderColor,
        background: background,
        whiteSpace: {
          xs: !isLoggedIn ? "pre-wrap" : "nowrap",
          sm: "nowrap"
        },
        width: width,
        margin: margin,
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
