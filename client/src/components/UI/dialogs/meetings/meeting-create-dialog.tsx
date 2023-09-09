import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateMeeting from "../../../pages/create-meeting/create-meeting";
import getDateToday from "../../../../utils/date/get-date-today";
import {
  getCreateMeetingOpenState,
  setCreateMeetingOpenState,
} from "../../../../store/meeting/create-meeting.store";

const MeetingCreateDialog = ({ dateCreate = getDateToday() }) => {
  const isOpenCreateMeeting = useSelector(getCreateMeetingOpenState());
  const dispatch = useDispatch();

  const handleCloseCreateMeeting = () => {
    dispatch(setCreateMeetingOpenState(false));
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
