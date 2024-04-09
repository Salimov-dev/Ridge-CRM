import { useDispatch, useSelector } from "react-redux";
import {
  createObjectUpdate,
  removeObjectUpdate,
  updateMultipleObjectsUpdate,
  updateObjectUpdate,
  updateObjectsUpdate
} from "@store/object/objects.store.ts";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const handleObjectSocket = (socket) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  socket.on("createObject", async (newObject) => {
    const objectUserId = newObject?.userId;

    if (
      isManager === undefined ||
      (isManager && objectUserId !== currentUserId)
    ) {
      return null;
    } else {
      dispatch<any>(createObjectUpdate(newObject));
    }
  });
  socket.on("updateObject", async (updatedObject) => {
    dispatch<any>(updateObjectUpdate(updatedObject));
  });
  socket.on("updateObjects", async (updatedObjects) => {
    dispatch<any>(updateObjectsUpdate(updatedObjects));
  });
  socket.on("updateMultipleObjects", async (updatedObjects) => {
    dispatch<any>(updateMultipleObjectsUpdate(updatedObjects));
  });
  socket.on("deleteObject", async (ObjectId) => {
    dispatch<any>(removeObjectUpdate(ObjectId));
  });
};

export default handleObjectSocket;
