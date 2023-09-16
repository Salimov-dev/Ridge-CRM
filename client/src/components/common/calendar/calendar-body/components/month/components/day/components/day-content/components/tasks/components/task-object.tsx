import { useDispatch } from "react-redux";
import DividerStyled from "../../../../../../../../../../../divider/divider-styled";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../../../../../../../../../store/object/open-object-page.store";
import {
  setUpdateRidgeObjectId,
  setUpdateRidgeObjectOpenState,
} from "../../../../../../../../../../../../../store/ridge-object/update-ridge-object.store";
import OpenPageObjectIconButton from "../../../../../../../../../../../buttons/icons buttons/open-page-object-icon";
import { Box, Typography } from "@mui/material";

const TaksObject = ({ task, objects, isRidgePage }) => {
  const dispatch = useDispatch();
  const taskObjectId = task?.objectId;

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj._id === id);
    const result = `${object?.location?.city}, ${object?.location?.address}`;

    return result;
  };

  const handleOpenObjectPage = (objectId) => {
    dispatch(setOpenObjectPageId(objectId));
    dispatch(setOpenObjectPageOpenState(true));
  };

  const handleOpenRidgeObjectPage = (objectId) => {
    dispatch(setUpdateRidgeObjectId(objectId));
    dispatch(setUpdateRidgeObjectOpenState(true));
  };

  return taskObjectId ? (
    <>
      <DividerStyled color={task?.isDone ? "darkGray" : "gray"} />
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography variant="h6">{getObjectAddress(taskObjectId)}</Typography>
        <OpenPageObjectIconButton
          onClick={() =>
            isRidgePage
              ? handleOpenRidgeObjectPage(taskObjectId)
              : handleOpenObjectPage(taskObjectId)
          }
          address={getObjectAddress(taskObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default TaksObject;
