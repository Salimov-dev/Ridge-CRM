import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import DividerStyled from "../../../../../../../../../../../../../components/common/divider/divider-styled";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../../../../../../../../../store/object/open-object-page.store";
import OpenPageObjectIconButton from "../../../../../../../../../../../buttons/icons buttons/open-page-object-icon";
import { getObjectAddressById } from "../../../../../../../../../../../../../store/object/objects.store";

const MeetingObject = ({meet }) => {
  const dispatch = useDispatch();
  const meetingObjectId = meet?.objectId;
  const isMeetingObjectId = Boolean(meetingObjectId);
  const isMeetingDone = meet?.isDone;
  const objectAddress = useSelector(getObjectAddressById(meetingObjectId));
  
  const handleOpenObjectPage = (objectId) => {
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };


  return isMeetingObjectId ? (
    <>
      <DividerStyled color={isMeetingDone ? "darkGray" : "gray"} />
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography>{objectAddress}</Typography>
        <OpenPageObjectIconButton
          onClick={() => handleOpenObjectPage(meetingObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default MeetingObject;
