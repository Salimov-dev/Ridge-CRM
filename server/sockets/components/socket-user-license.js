const SocketUserLicense = (io, socket) => {
  socket.on("userLicenseUpdated", async (updatedUserLicense) => {
    console.log("updatedUserLicense", updatedUserLicense);
    io.emit("updateUserLicense", updatedUserLicense);
  });
};

export default SocketUserLicense;
