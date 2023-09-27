import tokenService from "../services/token.service.js";

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);

    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    console.log("!token");

    const data = tokenService.validateAccess(token);
    console.log("data", data);

    req.user = data;

    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
