const SocketObject = (io, socket) => {
  socket.on("objectCreated", async (newObject) => {
    io.emit("createObject", newObject);
  });
  socket.on("objectUpdated", async (updatedObject) => {
    io.emit("updateObject", updatedObject);
  });
  socket.on("multipleObjectsUpdated", async (updatedObjects) => {
    io.emit("updateMultipleObjects", updatedObjects);
  });
  socket.on("objectDeleted", async (updatedObject) => {
    io.emit("deleteObject", updatedObject);
  });
};

export default SocketObject;
