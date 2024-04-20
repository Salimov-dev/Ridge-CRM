import config from "config";

const getDatabaseConfig = () => {
  const environment = process.env.NODE_ENV || "development";

  let databaseConfig;

  if (environment === "production") {
    databaseConfig = config.get("production");
  } else {
    databaseConfig = config.get("development");
  }

  return databaseConfig;
};

export default getDatabaseConfig;
