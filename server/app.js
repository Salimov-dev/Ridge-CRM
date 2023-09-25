import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import http from "http";
import routes from "./routes/index.js";

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

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "client")));

//   const indexPath = path.join(__dirname, "client", "index.html");

//   app.get("*", (req, res) => {
//     res.sendFile(indexPath);
//   });
// }

async function start() {
  try {
    await mongoose.connect(
      "mongodb://ruspb1987:rtkNpn2w1Jc8poKQ@ac-1hnuvn3-shard-00-00.ejnptrn.mongodb.net:27017,ac-1hnuvn3-shard-00-01.ejnptrn.mongodb.net:27017,ac-1hnuvn3-shard-00-02.ejnptrn.mongodb.net:27017/?ssl=true&replicaSet=atlas-ty0rfj-shard-0&authSource=admin&retryWrites=true&w=majority/test"
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
