import { io } from "socket.io-client";
import configFile from "../config.json";
import handleLastContactSocket from "./actions/handle-last-contact-socket";
import handleMeetingSocket from "./actions/handle-meeting-socket";
import handleObjectSocket from "./actions/handle-object-socket";

const Sockets = () => {
  const socket = io(configFile.ioEndPoint);

  handleObjectSocket(socket);
  handleMeetingSocket(socket);
  handleLastContactSocket(socket);
};

export default Sockets;
