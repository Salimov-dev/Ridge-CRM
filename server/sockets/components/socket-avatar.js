const SocketAvatar = (io, socket) => {
  socket.on("avatarUpdated", async (newAvatar) => {
    io.emit("updateAvatar", newAvatar);
  });
  socket.on("avatarDeleted", async (userId) => {
    io.emit("deleteAvatar", userId);
  });
};

export default SocketAvatar;
