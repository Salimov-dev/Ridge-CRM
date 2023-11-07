import { Box } from "@mui/material";
import NegativeOutlinedButton from "../../../common/buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../../common/buttons/positive-outlined-button";

const FooterButtons = ({onClose, onOpen, isValid}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <PositiveOutlinedButton
        title="Передать"
        isValid={isValid}
        type="text"
        onClick={onOpen}
      />
      <NegativeOutlinedButton title="Отмена" onClick={onClose} />
    </Box>
  );
};

export default FooterButtons;
