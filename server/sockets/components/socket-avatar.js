const SocketAvatar = (io, socket) => {
  socket.on("avatarUpdated", async (newTask) => {
    io.emit("updateAvatar", newTask);
  });
};

export default SocketAvatar;
