import { Box, styled } from "@mui/material";
import NegativeOutlinedButton from "../../../common/buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../../common/buttons/positive-outlined-button";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = ({ onClose, onEdit, isEdit }) => {
  return (
    <Component>
      <Box sx={{ display: "flex", gap: "4px" }}>
        {isEdit ? (
          <PositiveOutlinedButton title="Править" onClick={onEdit} />
        ) : null}
        <NegativeOutlinedButton title="Отмена" onClick={onClose} />
      </Box>
    </Component>
  );
};

export default ButtonsPanel;
