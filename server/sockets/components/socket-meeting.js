const SocketMeeting = (io, socket) => {
  socket.on("meetingCreated", async (newMeeting) => {
    io.emit("createMeeting", newMeeting);
  });
  socket.on("meetingUpdated", async (updatedMeeting) => {
    io.emit("updateMeeting", updatedMeeting);
  });
  socket.on("meetingDeleted", async (updatedMeeting) => {
    io.emit("deleteMeeting", updatedMeeting);
  });
};

export default SocketMeeting;
