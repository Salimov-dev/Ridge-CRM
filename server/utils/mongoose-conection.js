import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";

const mongooseConnection = ({ server }) => {
  mongoose
    .connect(config.get("mongoUri"))
    .then(() => {
      console.log(chalk.yellow("MongoDB connected"));
    })
    .catch((e) => {
      console.log(chalk.red(e.message));
      process.exit(1);
    });
};

export default mongooseConnection;
