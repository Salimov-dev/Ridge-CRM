import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import DividerStyled from "../../../../../../../../../../../divider/divider-styled";
import OpenPageObjectIconButton from "../../../../../../../../../../../buttons/icons buttons/open-page-object-icon";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../../../../../../../../../store/object/open-object-page.store";

const TaksObject = ({ task, objects }) => {
  const dispatch = useDispatch();
  const taskObjectId = task?.objectId;

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj._id === id);
    const result = `${object?.location?.city}, ${object?.location?.address}`;

    return result;
  };

  const handleOpenObjectPage = (objectId) => {
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };


  return taskObjectId ? (
    <>
      <DividerStyled color={task?.isDone ? "darkGray" : "gray"} />
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography variant="h6">{getObjectAddress(taskObjectId)}</Typography>
        <OpenPageObjectIconButton
          onClick={() => handleOpenObjectPage(taskObjectId)}
          address={getObjectAddress(taskObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default TaksObject;
