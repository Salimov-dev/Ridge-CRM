import express from "express";
import UserLicense from "../models/UserLicense.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;

    if (userRole.includes(roleManager)) {
      const userLicenses = await UserLicense.findAll({ where: { userId } });
      return res.status(200).send(userLicenses);
    }

    if (userRole.includes(roleCurator) || userRole.includes(roleObserver)) {
      const userLicenses = await UserLicense.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersUserLicenses = await UserLicense.findAll({
        where: { userId: curatorManagerIds }
      });

      const usersUserLicenses = [
        ...userLicenses,
        ...curatorManagersUserLicenses.map((license) => license.dataValues)
      ];

      return res.status(200).send(usersUserLicenses);
    }

    return res.status(200).send([]);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:UserLicenseId?/edit", auth, async (req, res) => {
  try {
    const { UserLicenseId } = req.params;
    if (!UserLicenseId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор встречи (UserLicenseId)."
      });
    }

    const existingUserLicense = await UserLicense.findByPk(UserLicenseId);

    if (!existingUserLicense) {
      return res.status(404).json({
        message: "Лицензия не найдена."
      });
    }

    const updatedUserLicense = await existingUserLicense.update(req.body);

    res.status(200).json(updatedUserLicense);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
