import { roleCurator } from "../utils/user-roles";

const roleMiddleware = (req, res, next) => {
  const user = req.user;
  const userRole = user.role;
  if (userRole.includes(roleCurator)) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Доступ запрещен. Недостаточно прав." });
  }
};

export default roleMiddleware;
