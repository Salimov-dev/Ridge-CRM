import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import SocketsIO from "../sockets/sockets-IO.js";
import http from "http";

const PORT = config.get("port") ?? 8080;

const mongooseConnection = ({ app }) => {
  const server = http.createServer(app);
  mongoose
    .connect(config.get("mongoUri"))
    .then(() => {
      console.log(chalk.green("MongoDB connected"));

      SocketsIO(server);

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
