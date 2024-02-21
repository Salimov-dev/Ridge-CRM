import { Box, IconButton, Tooltip, styled } from "@mui/material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

const Components = styled(Box)`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const OpenPageObjectIconButton = ({
  onClick,
  disabled = false,
  title = "Открыть объект"
}) => {
  return (
    <Components onClick={onClick}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          "&:disabled": {
            // стили для неактивной иконки
            color: "rgba(0, 0, 0, 0.26)", // изменяем цвет на серый
            pointerEvents: "none" // отключаем события указателя, чтобы иконка не реагировала на нажатия
          },
          "&:hover": {
            // стили при наведении (неактивное состояние)
            transform: disabled ? "none" : "scale(1.2)" // если disabled, не изменяем масштаб
          }
        }}
      >
        <Tooltip title={title} placement="top-start" arrow>
          <OpenInNewOutlinedIcon
            sx={{
              opacity: disabled ? "0.5" : "1" // устанавливаем прозрачность
            }}
          />
        </Tooltip>
      </IconButton>
    </Components>
  );
};

export default OpenPageObjectIconButton;
