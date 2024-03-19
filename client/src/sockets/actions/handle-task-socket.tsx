import { useDispatch, useSelector } from "react-redux";
import {
  createTaskUpdate,
  removeTaskUpdate,
  updateTaskUpdate
} from "@store/task/tasks.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const handleTaskSocket = (socket) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  socket.on("createTask", async (newTask) => {
    const taskUserId = newTask?.userId;

    if (
      isManager === undefined ||
      (isManager && taskUserId !== currentUserId)
    ) {
      return null;
    } else {
      dispatch<any>(createTaskUpdate(newTask));
    }
  });
  socket.on("updateTask", async (updatedTask) => {
    dispatch<any>(updateTaskUpdate(updatedTask));
  });
  socket.on("deleteTask", async (taskId) => {
    dispatch<any>(removeTaskUpdate(taskId));
  });
};

export default handleTaskSocket;
