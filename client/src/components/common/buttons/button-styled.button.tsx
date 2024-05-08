import { FC } from "react";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { tokens } from "@theme/theme";
import { useSelector } from "react-redux";
// hooks
import useWindowWidth from "@hooks/window-width/use-window-width";
import { getIsLoggedIn } from "@store/user/users.store";
// interfaces
import { ButtonTypes } from "@interfaces/button/button.interface";

interface ButtonStyledProps {
  title: string;
  height?: string;
  onClick: () => void;
  style?: string;
  disabled?: boolean;
  variant?: ButtonTypes;
  size?: "small" | "medium" | "large";
  width?: string;
  icon?: React.ReactNode;
  fontSize?: string;
  padding?: string;
  border?: string;
  background?: string;
  backgroundHover?: string;
  colorHover?: string;
  margin?: string;
}

const ButtonStyled: FC<ButtonStyledProps> = ({
  title = "title",
  height = "auto",
  onClick = () => {},
  style = "",
  disabled = false,
  variant = "outlined",
  width = "min-content",
  icon = "",
  fontSize = "auto",
  padding = "auto",
  border = "",
  background = "",
  backgroundHover = "",
  colorHover = "",
  margin = "0",
  size = "medium"
}): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const windowWidth = useWindowWidth();

  let color = "white";
  let borderColor = colors.grey[700];

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
    width = windowWidth > 600 ? "fit-content" : "100%";
    padding = windowWidth > 600 ? "20px" : "10px";
    backgroundHover = colors.green["darkGreen"];
    icon = windowWidth > 600 ? icon : null;
  }

  if (style === "CONTACT") {
    background = "SteelBlue";
    colorHover = "white";
    backgroundHover = "MediumBlue";
  }

  if (style === "ADD_SOME_NEW") {
    color = "LimeGreen";
    colorHover = "white";
    backgroundHover = "DarkGreen";
    border = "1px dashed LimeGreen !important";
  }

  if (style === "REMOVE_SOME_NEW") {
    color = "Tomato";
    colorHover = "white";
    backgroundHover = "OrangeRed";
    border = "1px dashed Tomato !important";
  }

  if (style === "ADD_NEW_EMAIL") {
    color = "orange";
    colorHover = "white";
    backgroundHover = "DarkOrange";
    border = "1px dashed orange !important";
  }

  if (style === "ADD_NEW_OBJECT") {
    color = "SkyBlue";
    colorHover = "white";
    backgroundHover = "RoyalBlue";
    border = "1px dashed SteelBlue !important";
  }

  if (style === "CREATE_NEW_OBJECT") {
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
    color = "Gold";
    colorHover = "white";
    backgroundHover = "Tomato";
    border = "1px dashed Crimson !important";
  }

  if (style === "CREATE_NEW_COMPANY") {
    color = "Gainsboro";
    colorHover = "white";
    backgroundHover = "SaddleBrown";
    border = "1px dashed Peru !important";
  }

  if (style === "CREATE_NEW_Contact") {
    color = "GreenYellow";
    colorHover = "white";
    backgroundHover = "ForestGreen";
    border = "1px dashed GreenYellow !important";
  }

  if (style === "ADD_NEW_Contact") {
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
    background = "";
    color = "";
    colorHover = "";
    backgroundHover = "";
    border = "";
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
      startIcon={icon}
      size={size}
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
