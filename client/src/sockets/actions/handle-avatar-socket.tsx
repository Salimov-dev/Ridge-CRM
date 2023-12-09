import { useDispatch } from "react-redux";
import { updateAvatarUpdate } from "../../store/avatar/avatar.store";

const handleAvatarSocket = (socket) => {
  const dispatch = useDispatch();

  // socket.on("createTask", async (newTask) => {
  //   dispatch<any>(createTaskUpdate(newTask));
  // });
  socket.on("updateAvatar", async (updatedAvatar) => {
    dispatch<any>(updateAvatarUpdate(updatedAvatar));
  });
  // socket.on("deleteTask", async (taskId) => {
  //   dispatch<any>(removeTaskUpdate(taskId));
  // });
};

export default handleAvatarSocket;
