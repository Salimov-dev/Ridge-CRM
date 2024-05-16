import { Box, IconButton, Tooltip, styled } from "@mui/material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { FC } from "react";

interface OpenPageElementIconButtonProps {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  heightButton?: string;
  color?: string;
  colorHover?: string;
  padding?: string;
}

const Components = styled(Box)`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const OpenPageElementIconButton: FC<OpenPageElementIconButtonProps> = ({
  onClick,
  disabled = false,
  title = "Открыть объект",
  heightButton = "auto",
  color = "white",
  colorHover = "yellow",
  padding
}) => {
  return (
    <Components>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          padding: padding,
          height: heightButton,
          color: color,
          "&:disabled": {
            color: "rgba(0, 0, 0, 0.26)",
            pointerEvents: "none"
          },
          "&:hover": {
            transform: disabled ? "none" : "scale(1.2)",
            color: colorHover,
            background: "transparent"
          }
        }}
      >
        <Tooltip title={title} placement="top-start" arrow>
          <OpenInNewOutlinedIcon />
        </Tooltip>
      </IconButton>
    </Components>
  );
};

export default OpenPageElementIconButton;
