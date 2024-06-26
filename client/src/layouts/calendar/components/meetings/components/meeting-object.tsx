import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
// components
import DividerStyled from "@components/common/divider/divider-styled";
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
// hooks
// store
import { getObjectAddressById } from "@store/object/objects.store";
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";

const MeetingObject = ({ meet, setState }) => {
  const meetingObjectId = meet?.objectId;
  const isMeetingObjectId = !!meetingObjectId;
  const isMeetingDone = meet?.isDone;
  const objectAddress = useSelector(getObjectAddressById(meetingObjectId));
  const { handleOpenObjectPage } = objectsDialogsState({ setState });

  return isMeetingObjectId ? (
    <>
      <DividerStyled color={isMeetingDone ? "darkGray" : "gray"} margin="0" />
      <Box
        sx={{ display: "flex", gap: "4px", justifyContent: "space-between" }}
      >
        <Typography>{objectAddress}</Typography>
        <OpenPageElementIconButton
          color="Gainsboro"
          colorHover="white"
          width="20px"
          padding="0 0 0 10px"
          onClick={() => handleOpenObjectPage(meetingObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default MeetingObject;
