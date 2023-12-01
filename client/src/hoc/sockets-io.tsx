import { io } from "socket.io-client";
import configFile from "../config.json";
import { useDispatch } from "react-redux";
import {
  createLastContactUpdateIO,
  removeLastContactUpdateIO,
  updateLastContactUpdateIO,
} from "../store/last-contact/last-contact.store";

const SocketsIO = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io(configFile.ioEndPoint);

  // last contact
  socket.on("createLastContact", async (newLastContact) => {
    dispatch<any>(createLastContactUpdateIO(newLastContact));
  });
  socket.on("updateLastContact", async (updatedLastContact) => {
    dispatch<any>(updateLastContactUpdateIO(updatedLastContact));
  });
  socket.on("deleteLastContact", async (lastContactId) => {
    dispatch<any>(removeLastContactUpdateIO(lastContactId));
  });

  return children;
};

export default SocketsIO;
