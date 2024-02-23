const SocketCompany = (io, socket) => {
  socket.on("companyCreated", async (newCompany) => {
    io.emit("createCompany", newCompany);
  });
  socket.on("companyUpdated", async (updatedCompany) => {
    io.emit("updateCompany", updatedCompany);
  });
  socket.on("companyDeleted", async (companyId) => {
    io.emit("deleteCompany", companyId);
  });
};

export default SocketCompany;
