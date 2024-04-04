import { Box, IconButton, Tooltip, styled } from "@mui/material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

const Components = styled(Box)`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const OpenPageElementIconButton = ({
  onClick,
  disabled = false,
  title = "Открыть объект",
  width = "16px",
  height = "16px",
  heightButton = "auto",
  color = "white",
  colorHover = "yellow"
}) => {
  return (
    <Components>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
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
          <OpenInNewOutlinedIcon
            sx={{
              width: width,
              height: height,
              opacity: disabled ? "0.5" : "1",
              padding: "0 0 4px 0"
            }}
          />
        </Tooltip>
      </IconButton>
    </Components>
  );
};

export default OpenPageElementIconButton;
