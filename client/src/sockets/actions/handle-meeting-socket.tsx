import { useDispatch, useSelector } from "react-redux";
import {
  createMeetingUpdate,
  removeMeetingUpdate,
  updateMeetingUpdate
} from "@store/meeting/meetings.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const handleMeetingSocket = (socket) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  socket.on("createMeeting", async (newMeeting) => {
    const meetingUserId = newMeeting?.userId;

    if (
      isManager === undefined ||
      (isManager && meetingUserId !== currentUserId)
    ) {
      return null;
    } else {
      dispatch<any>(createMeetingUpdate(newMeeting));
    }
  });
  socket.on("updateMeeting", async (updatedMeeting) => {
    dispatch<any>(updateMeetingUpdate(updatedMeeting));
  });
  socket.on("deleteMeeting", async (MeetingId) => {
    dispatch<any>(removeMeetingUpdate(MeetingId));
  });
};

export default handleMeetingSocket;
