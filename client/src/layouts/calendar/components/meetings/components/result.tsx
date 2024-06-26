import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
// components
import DividerStyled from "@components/common/divider/divider-styled";
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
// store
import { getObjectAddressById } from "@store/object/objects.store";

const MeetingObject = ({ meet }) => {
  const meetingObjectId = meet?.objectId;
  const isMeetingObjectId = Boolean(meetingObjectId);
  const isMeetingDone = meet?.isDone;
  const objectAddress = useSelector(getObjectAddressById(meetingObjectId));

  return isMeetingObjectId ? (
    <>
      <DividerStyled color={isMeetingDone ? "darkGray" : "gray"} margin="0" />
      <Box
        sx={{ display: "flex", gap: "4px", justifyContent: "space-between" }}
      >
        <Typography>{objectAddress}</Typography>
        <OpenPageElementIconButton
        // onClick={() => handleOpenObjectPage(meetingObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default MeetingObject;
