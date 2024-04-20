import http from "http";
import https from "https";

const getConnectionProtocol = () => {
  const environment = process.env.NODE_ENV || "development";

  if (environment === "production") {
    return https;
  } else {
    return http;
  }
};

export default getConnectionProtocol;
