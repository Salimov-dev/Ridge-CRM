import chalk from "chalk";
import { Sequelize } from "sequelize";
import config from "config";

export const sequelize = new Sequelize(
  config.get("DB_NAME"),
  config.get("DB_USER"),
  config.get("DB_PASSWORD"),
  {
    host: config.get("DB_HOST"),
    dialect: "postgres",
  }
);

const postgreConnection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(chalk.red("PostgreSQL connected"));
      return sequelize.sync(); // Synchronize models with the database
    })
    .then(() => {
      console.log(chalk.green("Models synchronized with the database"));
    })
    .catch((err) => {
      console.error(
        chalk.red("Unable to connect to the DB Ridge PostgreSQL:"),
        err
      );
    });
};

export default postgreConnection;
