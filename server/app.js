import routes from "./routes/index.js";
import mongoose from "mongoose";
import express from "express";
import chalk from "chalk";
import cors from "cors";
import http from "http";

const app = express();
const PORT = 8080;

const corsOptions = {
  origin: [
    "https://dev-craft-kappa.vercel.app",
    "https://www.ridge-crm.ru",
    "http://localhost:5173",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use("/api/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGODB_URI)
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
