const SocketUser = (io, socket) => {
  socket.on("userUpdated", async (updatedUser) => {
    io.emit("updateUser", updatedUser);
  });
};

export default SocketUser;
