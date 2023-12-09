import { useDispatch } from "react-redux";
import { removeAvatartUpdate, updateAvatarUpdate } from "../../store/avatar/avatar.store";

const handleAvatarSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("updateAvatar", async (updatedAvatar) => {
    await dispatch<any>(updateAvatarUpdate(updatedAvatar));
  });
  socket.on("deleteAvatar", async (userId) => {
    await dispatch<any>(removeAvatartUpdate(userId));
  });
};

export default handleAvatarSocket;
