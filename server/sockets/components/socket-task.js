const SocketTask = (io, socket) => {
  socket.on("taskCreated", async (newTask) => {
    io.emit("createTask", newTask);
  });
  socket.on("taskUpdated", async (updatedTask) => {
    io.emit("updateTask", updatedTask);
  });
  socket.on("taskDeleted", async (taskId) => {
    io.emit("deleteTask", taskId);
  });
};

export default SocketTask;
