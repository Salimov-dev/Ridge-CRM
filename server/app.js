import express from "express";
import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";
import cors from "cors";
import http from "http";
import routes from "./routes/index.js";

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "https://dev-craft-kappa.vercel.app",
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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// mongoose.connect(config.get("mongoUri"))
//   .then(() => {
//     console.log(chalk.green("MongoDB connected"));

//     app.listen(PORT, () =>
//       console.log(chalk.green(`Server has been started on port ${PORT}`))
//     );
//   })
//   .catch((e) => {
//     console.log(chalk.red(e.message));
//     process.exit(1);
//   });

// async function start() {
//   try {
//     await mongoose.connect(config.get("mongoUri"));
//     console.log(chalk.green("MongoDB connected"));

//     app.listen(PORT, () =>
//       console.log(chalk.green(`Server has been started on port ${PORT}`))
//     );
//   } catch (e) {
//     console.log(chalk.red(e.message));
//     process.exit(1);
//   }
// }

// start();

