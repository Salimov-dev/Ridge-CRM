import tokenService from "../services/token.service.js";

export default function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next;
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }

      const data = tokenService.validateAccess(token);
      if (data.role !== role) {
        res.status(403).json({ message: "Нет доступа" });
      }
      req.user = data;

      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
}
