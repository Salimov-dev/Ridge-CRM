import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
// components
import DividerStyled from "@components/common/divider/divider-styled";
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
// hooks
// store
import { getObjectAddressById } from "@store/object/objects.store";
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";

const TaskObject = ({ task, setState }) => {
  const taskObjectId = task?.objectId;
  const objectAddress = useSelector(getObjectAddressById(taskObjectId));
  const { handleOpenObjectPage } = objectsDialogsState({ setState });

  return taskObjectId ? (
    <>
      <DividerStyled color={task?.isDone ? "darkGray" : "gray"} margin="0" />
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {taskObjectId && <Typography>{objectAddress}</Typography>}
        <OpenPageElementIconButton
          color="Gainsboro"
          colorHover="white"
          width="20px"
          padding="0 0 0 10px"
          onClick={() => handleOpenObjectPage(taskObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default TaskObject;
