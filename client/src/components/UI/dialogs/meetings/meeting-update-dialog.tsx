import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateMeeting from "../../../pages/update-meeting/update-meeting";
import {
  getUpdateMeetingOpenState,
  setUpdateMeetingOpenState,
} from "../../../../store/meeting/update-meeting.store";
import React from "react";

const MeetingUpdateDialog = React.memo(() => {
  const dispatch = useDispatch();
  const isOpenUpdateMeeting = useSelector(getUpdateMeetingOpenState());

  const handleCloseUpdate = () => {
    dispatch<any>(setUpdateMeetingOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateMeeting onClose={handleCloseUpdate} />}
      onClose={handleCloseUpdate}
      open={isOpenUpdateMeeting}
      fullWidth={false}
    />
  );
});

export default MeetingUpdateDialog;
