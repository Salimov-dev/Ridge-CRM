import mongoose from "mongoose";
import config from "config";
import chalk from "chalk";

const PORT = config.get("port") ?? 8080;

const mongooseConnection = ({app}) => {
  mongoose
    .connect(config.get("mongoUri"))
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
};

export default mongooseConnection;
