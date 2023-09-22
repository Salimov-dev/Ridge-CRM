import { Box, styled } from "@mui/material";
import NegativeOutlinedButton from "../../../common/buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../../common/buttons/positive-outlined-button";
import OpenObjectCloudButton from "../../../UI/dialogs/buttons/open-object-cloud-button";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-left: 20px;
`;

const ButtonsPanel = ({
  object,
  onClose,
  onEdit,
  isEdit,
  negativeTitle = "отмена",
  isAuthorEntity = true,
}) => {
  return (
    <Component>
      <Box sx={{ display: "flex", gap: "4px" }}>
        {isEdit ? (
          <>
            <OpenObjectCloudButton object={object} />
            {isAuthorEntity ? (
              <PositiveOutlinedButton title="Править" onClick={onEdit} />
            ) : null}
          </>
        ) : null}
        <NegativeOutlinedButton title={negativeTitle} onClick={onClose} />
      </Box>
    </Component>
  );
};

export default ButtonsPanel;
