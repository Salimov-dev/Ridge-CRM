import { io } from "socket.io-client";
import configFile from "@config/config.json";
// actions
import handleLastContactSocket from "./actions/handle-last-contact-socket";
import handleMeetingSocket from "./actions/handle-meeting-socket";
import handleObjectSocket from "./actions/handle-object-socket";
import handlePresentationSocket from "./actions/handle-presentation-socket";
import handleTaskSocket from "./actions/handle-task-socket";
import handleUserSocket from "./actions/handle-user-socket";
import handleAvatarSocket from "./actions/handle-avatar-socket";
import handleUserLicenseSocket from "./actions/handle-user-license-socket";
import handleCompanySocket from "./actions/handle-company-socket";
import handleContactSocket from "./actions/handle-contact-socket";
import handleTeammateSocket from "./actions/handle-teammate-socket";
import handlePaymentSocket from "./actions/handle-payment-socket";

const Sockets = () => {
  const socket = io(configFile.ioEndPoint);

  handleUserSocket(socket);
  handleObjectSocket(socket);
  handleMeetingSocket(socket);
  handleTaskSocket(socket);
  handleLastContactSocket(socket);
  handlePresentationSocket(socket);
  handleAvatarSocket(socket);
  handleUserLicenseSocket(socket);
  handleCompanySocket(socket);
  handleContactSocket(socket);
  handleTeammateSocket(socket);
  handlePaymentSocket(socket);

  return null;
};

export default Sockets;
