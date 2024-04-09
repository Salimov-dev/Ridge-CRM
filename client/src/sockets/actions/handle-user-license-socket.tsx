import { updateUserLicenseUpdate } from "@store/user/user-license.store";
import { useDispatch } from "react-redux";

const handleUserLicenseSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("updateUserLicense", async (updatedUserLicense) => {
    console.log("updatedUserLicense", updatedUserLicense);

    dispatch<any>(updateUserLicenseUpdate(updatedUserLicense));
  });
};

export default handleUserLicenseSocket;
