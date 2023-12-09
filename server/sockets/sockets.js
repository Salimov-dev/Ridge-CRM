import { Server } from "socket.io";
import chalk from "chalk";
// sockets
import SocketObject from "./components/socket-object.js";
import SocketMeeting from "./components/socket-meeting.js";
import SocketLastContact from "./components/socket-last-contact.js";
import SocketPresentation from "./components/socket-presentation.js";
import SocketTask from "./components/socket-task.js";
import SocketUser from "./components/socket-user.js";
import SocketAvatar from "./components/socket-avatar.js";

const Sockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(chalk.blue("A user connected"));

    SocketUser(io, socket);
    SocketObject(io, socket);
    SocketMeeting(io, socket);
    SocketLastContact(io, socket);
    SocketTask(io, socket);
    SocketPresentation(io, socket);
    SocketAvatar(io, socket);

    socket.on("disconnect", () => {
      console.log(chalk.red("User disconnected"));
    });
  });
};

export default Sockets;