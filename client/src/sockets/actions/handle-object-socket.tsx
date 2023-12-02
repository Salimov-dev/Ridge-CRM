import { useDispatch } from "react-redux";
import {
  createObjectUpdate,
  removeObjectUpdate,
  updateMultipleObjectsUpdate,
  updateObjectUpdate,
} from "../../store/Object/Objects.store";

const handleObjectSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createObject", async (newObject) => {
    dispatch<any>(createObjectUpdate(newObject));
  });
  socket.on("updateObject", async (updatedObject) => {
    dispatch<any>(updateObjectUpdate(updatedObject));
  });
  socket.on("updateMultipleObjects", async (updatedObjects) => {
    dispatch<any>(updateMultipleObjectsUpdate(updatedObjects));
  });
  socket.on("deleteObject", async (ObjectId) => {
    dispatch<any>(removeObjectUpdate(ObjectId));
  });
};

export default handleObjectSocket;
