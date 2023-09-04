import { Box, Button, styled } from "@mui/material";
import { getupdateMyTaskId } from "../../../../store/task/update-my-task.store";
import { useSelector } from "react-redux";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const FooterButtons = ({ isEditMode, isValid, onClose, onRemove, removeId }) => {

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
