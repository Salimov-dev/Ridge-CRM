const SocketUserLicense = (io, socket) => {
  socket.on("userLicenseUpdated", async (updatedUserLicense) => {
    io.emit("updateUserLicense", updatedUserLicense);
  });
};

export default SocketUserLicense;
