import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import http from "http";
import routes from "./routes/index.js";

const corsOptions = {
  origin: process.env.CORS_DOMAIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);
app.use("/api/uploads", express.static("uploads"));

const PORT = config.get("port") || 5000;

const server = http.createServer(app);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green("MongoDB connected"));

    server.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
