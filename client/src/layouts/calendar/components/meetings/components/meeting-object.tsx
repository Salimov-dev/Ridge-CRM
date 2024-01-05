import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
// components
import DividerStyled from "@components/common/divider/divider-styled";
import OpenPageObjectIconButton from "@components/common/buttons/icons buttons/open-page-object.button-icon";
// store
import { getObjectAddressById } from "@store/object/objects.store";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

const MeetingObject = ({ meet, setState }) => {
  const meetingObjectId = meet?.objectId;
  const isMeetingObjectId = !!meetingObjectId;
  const isMeetingDone = meet?.isDone;
  const objectAddress = useSelector(getObjectAddressById(meetingObjectId));
  const { handleOpenObjectPage } = useDialogHandlers(setState);

  return isMeetingObjectId ? (
    <>
      <DividerStyled color={isMeetingDone ? "darkGray" : "gray"} margin="0" />
      <Box
        sx={{ display: "flex", gap: "4px", justifyContent: "space-between" }}
      >
        <Typography>{objectAddress}</Typography>
        <OpenPageObjectIconButton
          onClick={() => handleOpenObjectPage(meetingObjectId)}
        />
      </Box>
    </>
  ) : null;
};

export default MeetingObject;
