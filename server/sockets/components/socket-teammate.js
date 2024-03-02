const SocketTeammate = (io, socket) => {
  socket.on("teammateUpdated", async (updatedTeammate) => {
    io.emit("updateTeammate", updatedTeammate);
  });
};

export default SocketTeammate;
