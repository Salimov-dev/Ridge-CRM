import { useDispatch } from "react-redux";
import {
  createMeetingUpdateIO,
  removeMeetingUpdateIO,
  updateMeetingUpdateIO,
} from "../../store/last-contact/last-contact.store";

const handleMeetingSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createMeeting", async (newMeeting) => {
    dispatch<any>(createMeetingUpdateIO(newMeeting));
  });
  socket.on("updateMeeting", async (updatedMeeting) => {
    dispatch<any>(updateMeetingUpdateIO(updatedMeeting));
  });
  socket.on("deleteMeeting", async (MeetingId) => {
    dispatch<any>(removeMeetingUpdateIO(MeetingId));
  });
};

export default handleMeetingSocket;
