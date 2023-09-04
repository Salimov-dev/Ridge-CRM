import { Box, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { getObjectsList } from "../../../../../../../../../../store/object/objects.store";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../../../../../../store/object/open-object-page.store";
import DividerStyled from "../../../../../../../../../../components/common/divider/divider-styled";

const TaksObject = ({ task }) => {
  const objects = useSelector(getObjectsList());
  const taskObjectId = task?.objectId;
  const dispatch = useDispatch();

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj._id === id);
    const result = `${object?.location.city}, ${object?.location.address}`;
    return result;
  };

  const handleOpenObjectPage = (objectId) => {
    dispatch(setOpenObjectPageId(objectId));
    dispatch(setOpenObjectPageOpenState(true));
  };

  return taskObjectId ? (
    <>
      <DividerStyled />
      <Box sx={{ display: "flex", gap: "4px" }}>
      <Typography>
        <b>Объект:</b> {getObjectAddress(taskObjectId)}
      </Typography>
      <Box onClick={() => handleOpenObjectPage(taskObjectId)}>
        <Tooltip title="Открыть объект" placement="top-start" arrow>
          <OpenInNewOutlinedIcon
            sx={{
              opacity: "0.5",
              "&:hover": { opacity: "1", transform: "scale(1.2)" },
            }}
          />
        </Tooltip>
      </Box>
    </Box>
    </>
  
  ) : null;
};

export default TaksObject;
