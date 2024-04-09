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
// import http from "http";
import https from "https";
import config from "config";
import fs from "fs";
import cron from "node-cron";
import subscriptions from "./utils/subscriptions.js";

const PORT = config.get("port") ?? 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  key: fs.readFileSync(path.resolve(__dirname, "cert.key")), // Путь к закрытому ключу SSL
  cert: fs.readFileSync(path.resolve(__dirname, "cert.crt")), // Путь к SSL-сертификату
  ca: fs.readFileSync(path.resolve(__dirname, "cert_ca.crt")) // Путь к промежуточному SSL-сертификату
};

const app = express();
// const server = http.createServer(options, app);
const server = https.createServer(options, app);

Sockets(server);

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

cron.schedule("0 2 * * *", () => subscriptions()); // каждый день в 02:00
// cron.schedule("0 0 * * *", () => subscriptions()); // каждый день в 00:00
// cron.schedule("3 0 * * *", () => subscriptions()); // каждый день в 00:01
// cron.schedule("59 23 * * *", () => subscriptions()); //  в 23:59:59 каждый день
// cron.schedule("* * * * *", () => subscriptions()); // каждую минуту
// subscriptions();

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
