import http from "http";
import https from "https";

const getConnectionProtocol = () => {
  const environment = process.env.NODE_ENV || "development";

  if (environment === "development") {
    return http;
  } else {
    return https;
  }
};

export default getConnectionProtocol;
