import { Sequelize } from "sequelize";
import config from "config";
import chalk from "chalk";

const postgreConnection = () => {
  const sequelize = new Sequelize(
    config.get("DB_NAME"),
    config.get("DB_USER"),
    config.get("DB_PASSWORD"),
    {
      host: config.get("DB_HOST"),
      dialect: "postgres",
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log(chalk.red("PostgreSQL connected"));
    })
    .catch((err) => {
      console.error(
        chalk.red("Unable to connect to the DB Ridge PostgreSQL:"),
        err
      );
    });
};

export default postgreConnection;
