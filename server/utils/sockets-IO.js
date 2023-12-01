import { Server } from "socket.io";
import chalk from "chalk";

const SocketsIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(chalk.blue("A user connected"));

    // last contact
    socket.on("lastContactCreated", async (newLastContact) => {
      io.emit("createLastContact", newLastContact);
    });
    socket.on("lastContactUpdated", async (updatedLastContact) => {
      io.emit("updateLastContact", updatedLastContact);
    });
    socket.on("lastContactDeleted", async (updatedLastContact) => {
      io.emit("deleteLastContact", updatedLastContact);
    });

    socket.on("disconnect", () => {
      console.log(chalk.red("User disconnected"));
    });
  });
};

export default SocketsIO;
