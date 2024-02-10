const SocketUserLicense = (io, socket) => {
  socket.on("userLicenseCreated", async (newUserLicense) => {
    io.emit("createUserLicense", newUserLicense);
  });
  socket.on("userLicenseUpdated", async (updatedUserLicense) => {
    io.emit("updateUserLicense", updatedUserLicense);
  });
  socket.on("userLicenseDeleted", async (userLicenseId) => {
    io.emit("deleteUserLicense", userLicenseId);
  });
};

export default SocketUserLicense;
