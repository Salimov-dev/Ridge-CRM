import { Box, styled } from "@mui/material";
import Loader from "../../../common/loader/loader";
import ButtonsPanel from "../buttons-panel/buttons-panel";

const Component = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 4px;
`;

const FooterButtons = ({ object, onClose, onEdit, isEdit, isLoading, isAuthorEntity=true }) => {
  return !isLoading ? (
    <Component>
      <ButtonsPanel
        object={object}
        onClose={onClose}
        onEdit={onEdit}
        negativeTitle="Закрыть"
        isEdit={isEdit}
        isAuthorEntity={isAuthorEntity}
      />
    </Component>
  ) : (
    <Loader />
  );
};

export default FooterButtons;
