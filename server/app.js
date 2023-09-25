import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import http from "http";
import routes from "./routes/index.js";

const app = express();
const PORT = 3000;
// const PORT = config.get("port") ?? 8080;

const corsOptions = {
  origin: ["https://dev-craft-kappa.vercel.app", "http://localhost:5173"],
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://ruspb1987:rtkNpn2w1Jc8poKQ@cluster0.ejnptrn.mongodb.net/?retryWrites=true&w=majority/test"
    );

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();
