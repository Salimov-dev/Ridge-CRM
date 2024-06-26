import { Server } from "socket.io";
// utils
import { corsOptions } from "../utils/cors-options.js";
// sockets
import SocketObject from "./components/socket-object.js";
import SocketMeeting from "./components/socket-meeting.js";
import SocketLastContact from "./components/socket-last-contact.js";
import SocketPresentation from "./components/socket-presentation.js";
import SocketTask from "./components/socket-task.js";
import SocketUser from "./components/socket-user.js";
import SocketAvatar from "./components/socket-avatar.js";
import SocketUserLicense from "./components/socket-user-license.js";
import SocketCompany from "./components/socket-company.js";
import SocketContact from "./components/socket-contact.js";
import SocketTeammate from "./components/socket-teammate.js";

const Sockets = (server) => {
  const io = new Server(server, {
    cors: corsOptions
  });

  io.on("connection", (socket) => {
    SocketUser(io, socket);
    SocketObject(io, socket);
    SocketMeeting(io, socket);
    SocketLastContact(io, socket);
    SocketTask(io, socket);
    SocketPresentation(io, socket);
    SocketAvatar(io, socket);
    SocketUserLicense(io, socket);
    SocketCompany(io, socket);
    SocketContact(io, socket);
    SocketTeammate(io, socket);

    socket.on("disconnect", () => {});
  });

  return io;
};

export default Sockets;
