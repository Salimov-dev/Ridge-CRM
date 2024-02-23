import { useDispatch } from "react-redux";
import {
  createContactUpdate,
  removeContactUpdate,
  updateContactUpdate
} from "@store/contact/contact.store";

const handleContactSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createContact", async (newContact) => {
    dispatch<any>(createContactUpdate(newContact));
  });
  socket.on("updateContact", async (updatedContact) => {
    dispatch<any>(updateContactUpdate(updatedContact));
  });
  socket.on("deleteContact", async (contactId) => {
    dispatch<any>(removeContactUpdate(contactId));
  });
};

export default handleContactSocket;
