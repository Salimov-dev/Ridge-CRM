import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import DividerStyled from "@components/common/divider/divider-styled";
import OpenPageObjectIconButton from "@components/common/buttons/icons buttons/open-page-object.button-icon";
import { getObjectAddressById } from "@store/object/objects.store";

const TaskObject = ({ task }) => {
  const taskObjectId = task?.objectId;
  const objectAddress = useSelector(getObjectAddressById(taskObjectId));

  return taskObjectId ? (
    <>
      <DividerStyled color={task?.isDone ? "darkGray" : "gray"} margin="0" />
      <Box
        sx={{ display: "flex", gap: "4px", justifyContent: "space-between" }}
      >
        <Typography>{objectAddress}</Typography>
        <OpenPageObjectIconButton
        // onClick={() => handleOpenObjectPage(taskObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default TaskObject;
