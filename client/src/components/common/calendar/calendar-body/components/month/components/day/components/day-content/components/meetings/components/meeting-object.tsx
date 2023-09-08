import { useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import DividerStyled from "../../../../../../../../../../../../../components/common/divider/divider-styled";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../../../../../../../../../store/object/open-object-page.store";

const MeetingObject = ({ objects, meet }) => {
  const meetingObjectId = meet?.objectId;
  const isMeetingObjectId = Boolean(meetingObjectId);
  const isMeetingDone = meet?.isDone
  const dispatch = useDispatch();

  const handleOpenObjectPage = (objectId) => {
    dispatch(setOpenObjectPageId(objectId));
    dispatch(setOpenObjectPageOpenState(true));
  };

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj._id === id);
    const result = `${object?.location.city}, ${object?.location.address}`;
    return result;
  };

  return isMeetingObjectId ? (
    <>
      <DividerStyled color={isMeetingDone ? 'darkGray' : 'gray'}/>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography>
          <b>Объект:</b> {getObjectAddress(meetingObjectId)}
        </Typography>
        <Box onClick={() => handleOpenObjectPage(meetingObjectId)}>
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

export default MeetingObject;
