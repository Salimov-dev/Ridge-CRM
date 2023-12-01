const roleMiddleware = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "CURATOR") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Доступ запрещен. Недостаточно прав." });
  }
};

export default roleMiddleware
