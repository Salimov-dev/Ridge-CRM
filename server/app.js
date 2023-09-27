import routes from "./routes/index.js";
import mongoose from "mongoose";
import express from "express";
import chalk from "chalk";
import cors from "cors";
import http from "http";
import path from "path";

const app = express();
const PORT = 8080;

const corsOptions = {
  origin: [
    "https://dev-craft-kappa.vercel.app",
    "https://www.ridge-crm.ru",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "HEAD", "PUT", "DELETE", "PATCH", "OPTIONS"],
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

app.get('/objects', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"))
});

mongoose
  .connect(
    "mongodb://ruspb1987:rtkNpn2w1Jc8poKQ@ac-1hnuvn3-shard-00-00.ejnptrn.mongodb.net:27017,ac-1hnuvn3-shard-00-01.ejnptrn.mongodb.net:27017,ac-1hnuvn3-shard-00-02.ejnptrn.mongodb.net:27017/?ssl=true&replicaSet=atlas-ty0rfj-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  // .connect(process.env.MONGODB_URI)
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
