import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import http from "http"; // Import http module
import { Server } from "socket.io"; // Import Server from socket.io
import LastContact from "../models/Last-contact.js";

const PORT = config.get("port") ?? 8080;

const mongooseConnection = ({ app }) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  // MongoDB connection
  mongoose
    .connect(config.get("mongoUri"))
    .then(() => {
      console.log(chalk.green("MongoDB connected"));

      io.on("connection", (socket) => {
        console.log(chalk.blue("A user connected"));

        socket.on("lastContactCreated", async (newLastContact) => {
          io.emit("updateLastContacts", newLastContact);
        });

        socket.on("disconnect", () => {
          console.log(chalk.red("User disconnected"));
        });
      });

      server.listen(PORT, () =>
        console.log(chalk.green(`Server has been started on port ${PORT}`))
      );
    })
    .catch((e) => {
      console.log(chalk.red(e.message));
      process.exit(1);
    });
};

export default mongooseConnection;
