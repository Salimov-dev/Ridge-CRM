import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import DividerStyled from "../../../../../../../../../../../../../components/common/divider/divider-styled";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../../../../../../../../../store/object/open-object-page.store";
import OpenPageObjectIconButton from "../../../../../../../../../../../buttons/icons buttons/open-page-object-icon";

const MeetingObject = ({ objects, meet }) => {
  const meetingObjectId = meet?.objectId;
  const isMeetingObjectId = Boolean(meetingObjectId);
  const isMeetingDone = meet?.isDone;
  const dispatch = useDispatch();

  const handleOpenObjectPage = (objectId) => {
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj._id === id);
    const result = `${object?.location.city}, ${object?.location.address}`;
    return result;
  };

  return isMeetingObjectId ? (
    <>
      <DividerStyled color={isMeetingDone ? "darkGray" : "gray"} />
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography>{getObjectAddress(meetingObjectId)}</Typography>
        <OpenPageObjectIconButton
          onClick={() => handleOpenObjectPage(meetingObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default MeetingObject;
