import { Box, Tooltip, styled } from "@mui/material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

const Components = styled(Box)`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const OpenPageObjectIconButton = ({ onClick }) => {
  return (
    <Components onClick={onClick}>
      <Tooltip title="Открыть объект" placement="top-start" arrow>
        <OpenInNewOutlinedIcon
          sx={{
            opacity: "0.5",
            "&:hover": { opacity: "1", transform: "scale(1.2)" },
          }}
        />
      </Tooltip>
    </Components>
  );
};

export default OpenPageObjectIconButton;
