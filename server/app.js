import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import http from "http";
import routes from "./routes/index.js";

const corsOptions = {
  allowedHeaders: [
    "content-type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Origin",
    "X-Requested-With",
    "Authorization",
    "Accept",
  ],
  origin: [
    "https://www.ridge-crm.ru",
    "https://dev-craft-kappa.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  optionSuccessStatus: 200,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/api", routes);
app.use("/api/uploads", express.static("uploads"));

const PORT = config.get("port") || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
