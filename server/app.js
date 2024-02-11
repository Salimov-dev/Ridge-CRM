import routes from "./routes/index.js";
// utils
import { corsOptions } from "./utils/cors-options.js";
import postgreConnection from "./utils/postgre-conection.js";
// sockets
import Sockets from "./sockets/sockets.js";
// modules
import chalk from "chalk";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import config from "config";
import cron from "node-cron";

const PORT = config.get("port") ?? 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

Sockets(server);

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// cron.schedule("0 * * * *", () => backupMongoDB());

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
