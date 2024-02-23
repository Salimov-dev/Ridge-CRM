import { useDispatch } from "react-redux";
import {
  createTaskUpdate,
  removeTaskUpdate,
  updateTaskUpdate
} from "@store/task/tasks.store";

const handleTaskSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createTask", async (newTask) => {
    dispatch<any>(createTaskUpdate(newTask));
  });
  socket.on("updateTask", async (updatedTask) => {
    dispatch<any>(updateTaskUpdate(updatedTask));
  });
  socket.on("deleteTask", async (taskId) => {
    dispatch<any>(removeTaskUpdate(taskId));
  });
};

export default handleTaskSocket;
