const SocketLastContact = (io, socket) => {
  socket.on("lastContactCreated", async (newLastContact) => {
    io.emit("createLastContact", newLastContact);
  });
  socket.on("lastContactUpdated", async (updatedLastContact) => {
    io.emit("updateLastContact", updatedLastContact);
  });
  socket.on("lastContactDeleted", async (updatedLastContact) => {
    io.emit("deleteLastContact", updatedLastContact);
  });
};

export default SocketLastContact;
