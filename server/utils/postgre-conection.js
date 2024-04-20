import chalk from "chalk";
import { Sequelize } from "sequelize";
import getDatabaseConfig from "./get-database-config.js";

export const sequelize = new Sequelize(
  getDatabaseConfig().DB_NAME,
  getDatabaseConfig().DB_USER,
  getDatabaseConfig().DB_PASSWORD,
  {
    host: getDatabaseConfig().DB_HOST,
    dialect: "postgres"
  }
);

const postgreConnection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(chalk.red("PostgreSQL connected"));
      return sequelize.sync();
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
