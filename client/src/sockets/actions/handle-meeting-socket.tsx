import { useDispatch } from "react-redux";
import {
  createMeetingUpdate,
  removeMeetingUpdate,
  updateMeetingUpdate,
} from "../../store/meeting/meetings.store";

const handleMeetingSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createMeeting", async (newMeeting) => {
    dispatch<any>(createMeetingUpdate(newMeeting));
  });
  socket.on("updateMeeting", async (updatedMeeting) => {
    dispatch<any>(updateMeetingUpdate(updatedMeeting));
  });
  socket.on("deleteMeeting", async (MeetingId) => {
    dispatch<any>(removeMeetingUpdate(MeetingId));
  });
};

export default handleMeetingSocket;
