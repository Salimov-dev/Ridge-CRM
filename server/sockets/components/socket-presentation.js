const SocketPresentation = (io, socket) => {
  socket.on("presentationCreated", async (newPresentation) => {
    io.emit("createPresentation", newPresentation);
  });
  socket.on("presentationUpdated", async (updatedPresentation) => {
    io.emit("updatePresentation", updatedPresentation);
  });
  socket.on("presentationDeleted", async (presentationId) => {
    io.emit("deletePresentation", presentationId);
  });
};

export default SocketPresentation;
