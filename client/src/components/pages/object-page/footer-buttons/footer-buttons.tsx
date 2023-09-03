import { Box, styled } from "@mui/material";
import Loader from "../../../common/loader/loader";
import ButtonsPanel from "../buttons-panel/buttons-panel";

const Component = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 4px;
`;

const FooterButtons = ({ onClose, isLoading }) => {
  return !isLoading ? (
    <Component>
      <ButtonsPanel onClose={onClose} />
    </Component>
  ) : (
    <Loader />
  );
};

export default FooterButtons;
