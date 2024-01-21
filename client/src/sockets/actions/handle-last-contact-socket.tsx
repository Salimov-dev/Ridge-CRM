import { useDispatch } from "react-redux";
import {
  createLastContactUpdate,
  removeLastContactUpdate,
  updateLastContactUpdate,
} from "@store/last-contact/last-contact.store";

const handleLastContactSocket = (socket) => {
  const dispatch = useDispatch();

  socket.on("createLastContact", async (newLastContact) => {
    dispatch<any>(createLastContactUpdate(newLastContact));
  });
  socket.on("updateLastContact", async (updatedLastContact) => {
    dispatch<any>(updateLastContactUpdate(updatedLastContact));
  });
  socket.on("deleteLastContact", async (lastContactId) => {
    dispatch<any>(removeLastContactUpdate(lastContactId));
  });
};

export default handleLastContactSocket;
