const SocketContact = (io, socket) => {
  socket.on("contactCreated", async (newContact) => {
    io.emit("createContact", newContact);
  });
  socket.on("contactUpdated", async (updatedContact) => {
    io.emit("updateContact", updatedContact);
  });
  socket.on("contactDeleted", async (contactId) => {
    io.emit("deleteContact", contactId);
  });
};

export default SocketContact;
