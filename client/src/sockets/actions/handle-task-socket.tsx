import { useDispatch, useSelector } from "react-redux";
import {
  createTaskUpdate,
  removeTaskUpdate,
  updateTaskUpdate
} from "@store/task/tasks.store";
import { getCurrentUserId } from "@store/user/users.store";

const handleTaskSocket = (socket) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());

  socket.on("createTask", async (newTask) => {
    if (newTask.userId === currentUserId) {
      return dispatch<any>(createTaskUpdate(newTask));
    }
    if (newTask.managerId === currentUserId) {
      return dispatch<any>(createTaskUpdate(newTask));
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
