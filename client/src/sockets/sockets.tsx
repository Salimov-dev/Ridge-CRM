import { io } from "socket.io-client";
import configFile from "../config.json";
import handleLastContactSocket from "./actions/handle-last-contact-socket";
import handleMeetingSocket from "./actions/handle-meeting-socket";

const Sockets = () => {
  const socket = io(configFile.ioEndPoint);

  handleLastContactSocket(socket)
  // handleMeetingSocket(socket)
};

export default Sockets;
