import { useDispatch, useSelector } from "react-redux";
import {
  loadUpdateMeetingOpenState,
  setUpdateMeetingOpenState,
} from "../../../../store/meeting/update-meeting.store";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateMeeting from "../../../pages/update-meeting/update-meeting";

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
