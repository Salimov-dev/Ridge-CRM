import { useDispatch, useSelector } from "react-redux";
import {
  createLastContactUpdate,
  removeLastContactUpdate,
  updateLastContactUpdate
} from "@store/last-contact/last-contact.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const handleLastContactSocket = (socket) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  socket.on("createLastContact", async (newLastContact) => {
    const lastContactUserId = newLastContact?.userId;

    if (
      isManager === undefined ||
      (isManager && lastContactUserId !== currentUserId)
    ) {
      return null;
    } else {
      dispatch<any>(createLastContactUpdate(newLastContact));
    }
  });
  socket.on("updateLastContact", async (updatedLastContact) => {
    dispatch<any>(updateLastContactUpdate(updatedLastContact));
  });
  socket.on("deleteLastContact", async (lastContactId) => {
    dispatch<any>(removeLastContactUpdate(lastContactId));
  });
};

export default handleLastContactSocket;
