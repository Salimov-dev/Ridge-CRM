import { Box, Button, styled } from "@mui/material";
import CreateObjectFromRidgeButton from "../../../UI/dialogs/buttons/create-object-from-ridge-button";

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
        <Button
          type="submit"
          variant="outlined"
          color="success"
          disabled={isValid}
        >
          {isEditMode ? "Сохранить" : "Создать"}
        </Button>
        {isEditMode ? (
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={() => onRemove(removeId)}
          >
            Удалить
          </Button>
        ) : null}
      </Box>
      {isRidgeObject ? (
        <CreateObjectFromRidgeButton objectId={objectId} />
      ) : null}
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Button
          type="button"
          variant="outlined"
          color="error"
          onClick={onClose}
        >
          Отмена
        </Button>
      </Box>
    </Component>
  );
};

export default FooterButtons;
