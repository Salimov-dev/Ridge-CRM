import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
// components
import DividerStyled from "@components/common/divider/divider-styled";
import OpenPageElementIconButton from "@components/common/buttons/icons buttons/open-page-element.button-icon";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectAddressById } from "@store/object/objects.store";

const TaskObject = ({ task, setState }) => {
  const taskObjectId = task?.objectId;
  const objectAddress = useSelector(getObjectAddressById(taskObjectId));
  const { handleOpenObjectPage } = useDialogHandlers(setState);

  return taskObjectId ? (
    <>
      <DividerStyled color={task?.isDone ? "darkGray" : "gray"} margin="0" />
      <Box
        sx={{ display: "flex", gap: "4px", justifyContent: "space-between" }}
      >
        <Typography>{objectAddress}</Typography>
        <OpenPageElementIconButton
          onClick={() => handleOpenObjectPage(taskObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default TaskObject;
