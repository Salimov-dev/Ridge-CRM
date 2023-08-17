import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
// import initDatabase from "./startUp/initDatabase.js"
import routes from "./routes/index.js";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use("/api", routes);
app.use("/api/uploads", express.static("uploads"));

const PORT = config.get("port") ?? 8080;

async function start() {
  try {
    mongoose.connection.once("open", () => {
      // initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green("MongoDB connected"));
    app.listen(8080, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
