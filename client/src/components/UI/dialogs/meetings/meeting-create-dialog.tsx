import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateMeeting from "../../../pages/create-meeting/create-meeting";
import {
  getCreateMeetingOpenState,
  setCreateMeetingOpenState,
} from "../../../../store/meeting/create-meeting.store";

const MeetingCreateDialog = ({ dateCreate, setDateCreate }) => {
  const dispatch = useDispatch();

  const isOpenCreateMeeting = useSelector(getCreateMeetingOpenState());
  const handleCloseCreateMeeting = () => {
    dispatch(setCreateMeetingOpenState(false));
    setDateCreate(null)
  };
  return (
    <DialogStyled
      component={
        <CreateMeeting
          onClose={handleCloseCreateMeeting}
          dateCreate={dateCreate}
        />
      }
      onClose={handleCloseCreateMeeting}
      open={isOpenCreateMeeting}
    />
  );
};

export default MeetingCreateDialog;
