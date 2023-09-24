import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import path from "path";
import routes from "./routes/index.js";

const corsOptions = {
  origin: "https//ridge-qnj1hsf42-salimov-dev.vercel.app",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use("/api", routes);
app.use("/api/uploads", express.static("uploads"));

const PORT = config.get("port") ?? 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green("MongoDB connected"));

    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
