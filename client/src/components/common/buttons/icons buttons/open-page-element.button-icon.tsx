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
  width = "24px",
  height = "24px",
  heightButton = "auto",
  containerWidth = "auto",
  color = "white"
}) => {
  return (
    <Components sx={{ width: containerWidth }}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          height: heightButton,
          color: color,
          "&:disabled": {
            // стили для неактивной иконки

            color: "rgba(0, 0, 0, 0.26)", // изменяем цвет на серый
            pointerEvents: "none" // отключаем события указателя, чтобы иконка не реагировала на нажатия
          },
          "&:hover": {
            // стили при наведении (неактивное состояние)
            transform: disabled ? "none" : "scale(1.2)", // если disabled, не изменяем масштаб
            color: "yellow",
            background: "transparent"
          }
        }}
      >
        <Tooltip title={title} placement="top-start" arrow>
          <OpenInNewOutlinedIcon
            sx={{
              width: width,
              height: height,
              opacity: disabled ? "0.5" : "1" // устанавливаем прозрачность
            }}
          />
        </Tooltip>
      </IconButton>
    </Components>
  );
};

export default OpenPageElementIconButton;
