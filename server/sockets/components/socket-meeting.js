const SocketMeeting = (io, socket) => {
  socket.on("meetingCreated", async (newMeeting) => {
    io.emit("createMeeting", newMeeting);
  });
  socket.on("meetingUpdated", async (updatedMeeting) => {
    io.emit("updateMeeting", updatedMeeting);
  });
  socket.on("meetingDeleted", async (meetingId) => {
    io.emit("deleteMeeting", meetingId);
  });
};

export default SocketMeeting;
