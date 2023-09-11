import { Box, Button, styled } from "@mui/material";
import CreateObjectFromRidgeButton from "../../../UI/dialogs/buttons/create-object-from-ridge-button";
import NegativeOutlinedButton from "../../buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../buttons/positive-outlined-button";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const FooterButtons = ({
  objectId = "",
  removeId,
  onClose,
  onRemove,
  isEditMode,
  isValid,
  isRidgeObject = false,
  withoutRemoveButton
}) => {
  return (
    <Component>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <PositiveOutlinedButton
          title={isEditMode ? "Сохранить" : "Создать"}
          isValid={isValid}
          type = "submit"
        />
        {isEditMode && !withoutRemoveButton ? (
          <NegativeOutlinedButton
            title="Удалить"
            onClick={() => onRemove(removeId)}
          />
        ) : null}
        {isRidgeObject ? (
          <CreateObjectFromRidgeButton objectId={objectId} />
        ) : null}
      </Box>
      <NegativeOutlinedButton title="Отмена" onClick={onClose} />
    </Component>
  );
};

export default FooterButtons;
