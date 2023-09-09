import { Box, styled } from "@mui/material";
import CreateObjectFromRidgeButton from "../../../UI/dialogs/buttons/create-object-from-ridge-button";
import PositiveOutlinedButton from "../../buttons/positive-outlined-button";
import NegativeOutlinedButton from "../../buttons/negative-outlined-button";

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
}) => {
  return (
    <Component>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <PositiveOutlinedButton
          title={isEditMode ? "Сохранить" : "Создать"}
          onClick={() => onRemove(removeId)}
          isValid={isValid}
        />
        {isEditMode ? (
          <NegativeOutlinedButton
            title="Удалить"
            onClick={() => onRemove(removeId)}
          />
        ) : null}
        {isRidgeObject ? (
          <CreateObjectFromRidgeButton objectId={objectId} />
        ) : null}
      </Box>
      <NegativeOutlinedButton
        title="Отмена"
        onClick={onClose}
      />
    </Component>
  );
};

export default FooterButtons;
