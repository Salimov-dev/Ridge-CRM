const SocketAvatar = (io, socket) => {
  socket.on("avatarUpdated", async (newAvatar) => {
    io.emit("updateAvatar", newAvatar);
  });
};

export default SocketAvatar;
