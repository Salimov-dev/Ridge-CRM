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
        message: "Необходимо указать идентификатор лицензии (UserLicenseId)."
      });
    }

    const existingUserLicense = await UserLicense.findByPk(UserLicenseId);

    if (!existingUserLicense) {
      return res.status(404).json({
        message: "Лицензия не найдена."
      });
    }

    // Обновляем поле balance в существующей лицензии
    existingUserLicense.balance = parseFloat(existingUserLicense.balance);
    existingUserLicense.balance += parseInt(req.body.balance);
    const newBalance = existingUserLicense.balance;

    // id для статуса "Действующий"
    const activetedId = "718gkgdbn48jgfo3kktjt002";

    // Если баланс равен 0 меняем accountType
    if (
      existingUserLicense._previousDataValues.balance === 0 &&
      req.body.balance > 49
    ) {
      existingUserLicense.accountType = activetedId;
    }

    // Получаем текущую дату и время
    const currentDate = new Date();

    // Обновляем поле dateStart на текущую дату и время
    existingUserLicense.dateStart = currentDate;

    // Получаем количество пользователей (менеджеров и наблюдателей) и добавляем 1 за текущего пользователя
    const managersCount = existingUserLicense.managers.length;
    const observersCount = existingUserLicense.observers.length;
    const totalUsersCount = managersCount + observersCount + 1;

    // Вычисляем количество дней, на которое хватит баланса
    const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
    const daysLeft = Math.floor(
      existingUserLicense.balance / (subscriptionCostPerUser * totalUsersCount)
    );

    // Вычисляем дату окончания лицензии на основе текущей даты и количества дней, на которое хватит баланса
    const endDate = new Date(
      currentDate.getTime() + daysLeft * 24 * 60 * 60 * 1000
    );
    existingUserLicense.dateEnd = endDate;

    // Сохраняем обновленную лицензию
    await existingUserLicense.save();

    res.status(200).json(existingUserLicense);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
