const SocketUser = (io, socket) => {
  socket.on("userCreated", async (newUser) => {
    io.emit("createUser", newUser);
  });
  socket.on("userUpdated", async (updatedUser) => {
    io.emit("updateUser", updatedUser);
  });
};

export default SocketUser;
