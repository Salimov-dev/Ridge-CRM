import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import DividerStyled from "../../../../../../../../../../../divider/divider-styled";
import OpenPageObjectIconButton from "../../../../../../../../../../../buttons/icons buttons/open-page-object-icon";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../../../../../../../../../store/object/open-object-page.store";
import { getObjectAddressById } from "../../../../../../../../../../../../../store/object/objects.store";

const TaskObject = ({ task }) => {
  const dispatch = useDispatch();
  const taskObjectId = task?.objectId;
  const objectAddress = useSelector(getObjectAddressById(taskObjectId));

  const handleOpenObjectPage = (objectId) => {
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };

  return taskObjectId ? (
    <>
      <DividerStyled color={task?.isDone ? "darkGray" : "gray"} />
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography>{objectAddress}</Typography>
        <OpenPageObjectIconButton
          onClick={() => handleOpenObjectPage(taskObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default TaskObject;
