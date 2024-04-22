import express from "express";
import UserLicense from "../models/UserLicense.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import dayjs from "dayjs";

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

router.patch("/:userLicenseId?/edit", auth, async (req, res) => {
  try {
    const { userLicenseId } = req.params;

    if (!userLicenseId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор лицензии (UserLicenseId)."
      });
    }

    const existingUserLicense = await UserLicense.findByPk(userLicenseId);
    const userId = existingUserLicense.userId;

    if (!existingUserLicense) {
      return res.status(404).json({
        message: "Лицензия не найдена."
      });
    }

    // вычисление активных пользователей лицензии
    const usersList = await User.findAll();

    const usersManagersArray = existingUserLicense?.managers;
    const activeUsersManagers = usersManagersArray?.filter((userId) => {
      const user = usersList.find((user) => user._id === userId);
      return user && user.isActive;
    });

    const usersObserversArray = existingUserLicense?.observers;
    const activeUsersObservers = usersObserversArray?.filter((userId) => {
      const user = usersList.find((user) => user._id === userId);
      return user && user.isActive;
    });

    const managersLength = activeUsersManagers?.length || 0;
    const observersLength = activeUsersObservers?.length || 0;
    const totalUsersCount = managersLength + observersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора

    // тип лицензии
    const currentLicenseTypeId = existingUserLicense.accountType;
    const trialLicenseTypeId = "71pbfi4954itj045tloop001";
    const activeLicenseTypeId = "718gkgdbn48jgfo3kktjt002";
    const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";
    const isLicenseTrialType = currentLicenseTypeId === trialLicenseTypeId;
    const isLicenseActiveType = currentLicenseTypeId === activeLicenseTypeId;
    const isLicenseBlockedType = currentLicenseTypeId === blockedLicenseTypeId;
    let newCurrentLicenseTypeId = currentLicenseTypeId;

    // дата
    const currentDate = dayjs();
    const currentLicenseStartDate = dayjs(existingUserLicense.dateStart);
    const currentLicenseEndDate = dayjs(existingUserLicense.dateEnd);
    const currentLicenseTrialEndDate = dayjs(existingUserLicense.dateTrialEnd);
    let newLicenseStartDate = currentLicenseStartDate;
    let newLicenseEndDate = currentLicenseEndDate;

    // баланс
    const currentLicenseBalance = existingUserLicense.balance;
    const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
    const licenseDaysLeftQuantity = Math.floor(
      existingUserLicense.balance / (subscriptionCostPerUser * totalUsersCount)
    );

    if (isLicenseTrialType && currentLicenseBalance > 0) {
      newCurrentLicenseTypeId = activeLicenseTypeId;
      newLicenseStartDate = currentDate;
      newLicenseEndDate = currentDate.add(licenseDaysLeftQuantity, "day");
    }

    if (isLicenseActiveType) {
      newLicenseEndDate = currentLicenseStartDate.add(
        licenseDaysLeftQuantity,
        "day"
      );
    }

    if (isLicenseBlockedType) {
      newLicenseStartDate = currentDate;
      newLicenseEndDate = newLicenseStartDate.add(
        licenseDaysLeftQuantity,
        "day"
      );
    }

    // кол-во оставшихся дней
    const daysLeftQuantity =
      (isLicenseTrialType
        ? currentLicenseTrialEndDate
        : newLicenseEndDate
      )?.diff(currentDate, "day") + 1;

    const daysDifference =
      daysLeftQuantity +
      (currentDate.isSame(newLicenseEndDate, "day") ||
        currentDate.isSame(currentLicenseTrialEndDate, "day"));

    await UserLicense.update(
      {
        activeUsersQuantity: totalUsersCount,
        accountType: newCurrentLicenseTypeId,
        dateStart: newLicenseStartDate,
        dateEnd: newLicenseEndDate,
        accessDaysQuantity: !isLicenseBlockedType ? daysDifference : 0
      },
      { where: { userId } }
    );

    const updatedLicense = await UserLicense.findOne({
      where: { userId }
    });

    res.status(200).json(updatedLicense);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:userLicenseId?/updateClicksOnMap", auth, async (req, res) => {
  try {
    const { userLicenseId } = req.params;

    if (!userLicenseId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор лицензии (UserLicenseId)."
      });
    }

    const existingUserLicense = await UserLicense.findByPk(userLicenseId);

    if (!existingUserLicense) {
      return res.status(404).json({
        message: "Лицензия не найдена."
      });
    }

    const userId = existingUserLicense.userId;

    // Вычитаем клик по карте из текущего количества quantityClicksOnMap лицензии
    const newQuantityClicksOnMap = req.body.quantityClicksOnMap;

    let currentLicenseQuantityClicksOnMap =
      existingUserLicense.quantityClicksOnMap;

    if (currentLicenseQuantityClicksOnMap === 0) {
      return res.status(400).json({
        error: {
          message: "Количество кликов на текущий день закончилось",
          code: 400
        }
      });
    }

    await UserLicense.update(
      {
        quantityClicksOnMap: newQuantityClicksOnMap
      },
      { where: { userId } }
    );

    const updatedLicense = await UserLicense.findOne({
      where: { userId }
    });

    res.status(200).json(updatedLicense);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
