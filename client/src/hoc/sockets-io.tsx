import { io } from "socket.io-client";
import configFile from "../config.json";
import { useDispatch } from "react-redux";
import { updateLastContactsList } from "../store/last-contact/last-contact.store";

const SocketsIO = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io(configFile.ioEndPoint);
  socket.on("updateLastContacts", async (newLastContact) => {
    dispatch<any>(updateLastContactsList(newLastContact));
  });
  return children;
};

export default SocketsIO;
