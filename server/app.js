import routes from "./routes/index.js";
// utils
import { corsOptions } from "./utils/cors-options.js";
import backupMongoDB from "./utils/backup-mongo-db.js";
import mongooseConnection from "./utils/mongoose-conection.js";
// modules
import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import express from "express";
import cron from "node-cron";
import cors from "cors";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
// app.use("/api/uploads", express.static("uploads"));
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

cron.schedule("0 * * * *", () => backupMongoDB());

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

mongooseConnection({ app });
