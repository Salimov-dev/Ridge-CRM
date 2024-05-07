import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import express from "express";
import cron from "node-cron";
import config from "config";
import cors from "cors";
import path from "path";
import fs from "fs";
// sockets
import Sockets from "./sockets/sockets.js";
// routes
import routes from "./routes/index.js";
// utils
import getConnectionProtocol from "./utils/get-connection-protocol.js";
import postgreConnection from "./utils/postgre-conection.js";
import { corsOptions } from "./utils/cors-options.js";
import subscriptions from "./utils/subscriptions.js";

const PORT = config.get("port") ?? 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  key: fs.readFileSync(path.resolve(__dirname, "cert.key")),
  cert: fs.readFileSync(path.resolve(__dirname, "cert.crt")),
  ca: fs.readFileSync(path.resolve(__dirname, "cert_ca.crt"))
};

const app = express();
const server = getConnectionProtocol().createServer(options, app);

Sockets(server);

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

cron.schedule("0 0 * * *", () => subscriptions()); // списание на лицензии каждый день в 00:00
// cron.schedule("* * * * *", () => subscriptions()); // списание на лицензии каждую минуту

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

server.listen(PORT, () =>
  console.log(chalk.green(`Server has been started on port ${PORT}`))
);

postgreConnection();
