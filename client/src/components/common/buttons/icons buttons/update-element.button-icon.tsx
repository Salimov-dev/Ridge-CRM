import { Box, styled } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Component = styled(Box)`
  cursor: pointer;
`;

const UpdateElementIconButton = ({ itemId = "", onClick, isDone = false }) => {
  return !isDone ? (
    <Component onClick={() => onClick(itemId)}>
      <EditOutlinedIcon
        sx={{
          opacity: "0.5",
          "&:hover": { opacity: "1", transform: "scale(1.2)" },
        }}
      />
    </Component>
  ) : null;
};

export default UpdateElementIconButton;
