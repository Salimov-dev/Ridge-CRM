import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateMeeting from "../../../pages/update-meeting/update-meeting";
import {
  loadUpdateMeetingOpenState,
  setUpdateMeetingOpenState,
} from "../../../../store/meeting/update-meeting.store";

const MeetingUpdateDialog = () => {
  const dispatch = useDispatch();
  const isOpenUpdateMeeting = useSelector(loadUpdateMeetingOpenState());

  const handleCloseUpdate = () => {
    dispatch(setUpdateMeetingOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateMeeting onClose={handleCloseUpdate} />}
      onClose={handleCloseUpdate}
      open={isOpenUpdateMeeting}
      fullWidth={false}
    />
  );
};

export default MeetingUpdateDialog;
