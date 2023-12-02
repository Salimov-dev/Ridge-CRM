import { io } from "socket.io-client";
import configFile from "../config.json";
// actions
import handleLastContactSocket from "./actions/handle-last-contact-socket";
import handleMeetingSocket from "./actions/handle-meeting-socket";
import handleObjectSocket from "./actions/handle-object-socket";
import handlePresentationSocket from "./actions/handle-presentation-socket";
import handleTaskSocket from "./actions/handle-task-socket";
import handleUserSocket from "./actions/handle-user-socket";

const Sockets = () => {
  const socket = io(configFile.ioEndPoint);

  handleUserSocket(socket);
  handleObjectSocket(socket);
  handleMeetingSocket(socket);
  handleTaskSocket(socket);
  handleLastContactSocket(socket);
  handlePresentationSocket(socket);
};

export default Sockets;
