import { useDispatch, useSelector } from "react-redux";
import {
  createContactUpdate,
  removeContactUpdate,
  updateContactUpdate
} from "@store/contact/contact.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const handleContactSocket = (socket) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  socket.on("createContact", async (newContact) => {
    const contactUserId = newContact?.userId;

    if (
      isManager === undefined ||
      (isManager && contactUserId !== currentUserId)
    ) {
      return null;
    } else {
      dispatch<any>(createContactUpdate(newContact));
    }
  });
  socket.on("updateContact", async (updatedContact) => {
    dispatch<any>(updateContactUpdate(updatedContact));
  });
  socket.on("deleteContact", async (contactId) => {
    dispatch<any>(removeContactUpdate(contactId));
  });
};

export default handleContactSocket;
