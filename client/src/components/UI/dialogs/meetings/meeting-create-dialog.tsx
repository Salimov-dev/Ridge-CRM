import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateMeeting from "../../../pages/create-meeting/create-meeting";
import getDateToday from "../../../../utils/date/get-date-today";
import {
  getCreateMeetingOpenState,
  setCreateMeetingOpenState,
} from "../../../../store/meeting/create-meeting.store";
import { getOpenObjectPageId, loadOpenObjectPageOpenState } from "../../../../store/object/open-object-page.store";

const MeetingCreateDialog = ({ dateCreate = getDateToday() }) => {
  const dispatch = useDispatch();
  const isOpenCreateMeeting = useSelector(getCreateMeetingOpenState());
  const objectPageId = useSelector(getOpenObjectPageId());
  const isObjectPage = useSelector(loadOpenObjectPageOpenState())

  const handleCloseCreateMeeting = () => {
    dispatch(setCreateMeetingOpenState(false));
  };

  return (
    <DialogStyled
      component={
        <CreateMeeting
          objectPageId={objectPageId}
          dateCreate={dateCreate}
          onClose={handleCloseCreateMeeting}
          isObjectPage={isObjectPage}
        />
      }
      onClose={handleCloseCreateMeeting}
      open={isOpenCreateMeeting}
    />
  );
};

export default MeetingCreateDialog;
