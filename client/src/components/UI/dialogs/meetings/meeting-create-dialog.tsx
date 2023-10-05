import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateMeeting from "../../../pages/create-meeting/create-meeting";
import getDateToday from "../../../../utils/date/get-date-today";
import {
  getCreateMeetingOpenState,
  setCreateMeetingOpenState,
} from "../../../../store/meeting/create-meeting.store";

const MeetingCreateDialog = ({
  dateCreate = getDateToday(),
  objectPageId="",
  isObjectPage=false,
}) => {
  const dispatch = useDispatch();
  const isOpenCreateMeeting = useSelector(getCreateMeetingOpenState());

  const handleCloseCreateMeeting = () => {
    dispatch<any>(setCreateMeetingOpenState(false));
  };

  return (
    <DialogStyled
      component={
        <CreateMeeting
          dateCreate={dateCreate}
          onClose={handleCloseCreateMeeting}
          objectPageId={objectPageId}
          isObjectPage={isObjectPage}
        />
      }
      onClose={handleCloseCreateMeeting}
      open={isOpenCreateMeeting}
    />
  );
};

export default MeetingCreateDialog;
