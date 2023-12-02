import { Server } from "socket.io";
import chalk from "chalk";
import SocketLastContact from "./components/socket-last-contact.js";

const SocketsIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(chalk.blue("A user connected"));

    SocketLastContact(io, socket);

    socket.on("disconnect", () => {
      console.log(chalk.red("User disconnected"));
    });
  });
};

export default SocketsIO;
