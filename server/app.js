import routes from "./routes/index.js";
import mongoose from "mongoose";
import express from "express";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { spawn } from "child_process";

const app = express();
const PORT = config.get("port") ?? 8080;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://31.129.108.151",
    "https://ridge-crm.ru",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use("/api/uploads", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const ARCHIVE_PATH = path.join(__dirname, "db", `${DB_NAME}.gzip`);

const DB_NAME = "test";
const BACKUP_DIR = path.join(__dirname, "db");
const MAX_BACKUPS = 100;

cron.schedule("0 * * * *", () => backupMongoDB());

function backupMongoDB() {
  const now = new Date();
  const backupFileName = `${now.toISOString().replace(/:/g, "-")}.gzip`;
  const archivePath = path.join(BACKUP_DIR, backupFileName);

  const child = spawn("mongodump", [
    `--db=${DB_NAME}`,
    `--archive=${archivePath}`,
    "--gzip",
    `--uri=${config.get("mongoUri")}`,
  ]);

  child.stdout.on(`data`, (data) => {
    console.log(`stdout:/n`, data);
  });
  child.stderr.on(`data`, (data) => {
    console.log(`stderr:/n`, Buffer.from(data).toString());
  });
  child.on("error", (error) => {
    console.log(`error:/n`, error);
  });
  child.on("exit", (code, signal) => {
    if (code) console.log(`Process exit with code:`, code);
    else if (signal) console.log(`Process killed with signal:`, signal);
    else console.log(`Backup is successful`);
  });

  // Удаляем старые резервные копии, если их количество превышает MAX_BACKUPS
  fs.readdir(BACKUP_DIR, (err, files) => {
    if (!err) {
      files.sort(); // Сортируем имена файлов
      while (files.length > MAX_BACKUPS) {
        const fileToDelete = path.join(BACKUP_DIR, files.shift());
        fs.unlink(fileToDelete, (err) => {
          if (err) {
            console.error(`Error deleting old backup: ${err}`);
          }
        });
      }
    }
  });
}

// function backupMongoDB() {
//   const child = spawn("mongodump", [
//     `--db=${DB_NAME}`,
//     `--archive=${ARCHIVE_PATH}`,
//     "--gzip",
//     `--uri=${config.get("mongoUri")}`,
//   ]);

//   child.stdout.on(`data`, (data) => {
//     console.log(`stdout:/n`, data);
//   });
//   child.stderr.on(`data`, (data) => {
//     console.log(`stderr:/n`, Buffer.from(data).toString());
//   });
//   child.on("error", (error) => {
//     console.log(`error:/n`, error);
//   });
//   child.on("exit", (code, signal) => {
//     if (code) console.log(`Process exit with code:`, code);
//     else if (signal) console.log(`Process killed with signal:`, signal);
//     else console.log(`Backup is successfull`);
//   });
// }

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

mongoose
  .connect(config.get("mongoUri"))
  .then(() => {
    console.log(chalk.green("MongoDB connected"));

    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    );
  })
  .catch((e) => {
    console.log(chalk.red(e.message));
    process.exit(1);
  });
