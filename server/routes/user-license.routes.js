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
    let newCurrentLicenseTypeId = currentLicenseTypeId;

    // дата
    const currentDate = dayjs();
    const currentLicenseStartDate = dayjs(existingUserLicense.dateStart);
    const currentLicenseEndDate = dayjs(existingUserLicense.dateEnd);
    let newLicenseStartDate = currentLicenseStartDate;
    let newLicenseEndDate = currentLicenseEndDate;

    // баланс
    const currentLicenseBalance = existingUserLicense.balance;
    const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
    const licenseDaysLeftQuantity = Math.floor(
      existingUserLicense.balance / (subscriptionCostPerUser * totalUsersCount)
    );

    if (
      currentLicenseTypeId === trialLicenseTypeId &&
      currentLicenseBalance > 0
    ) {
      newCurrentLicenseTypeId = activeLicenseTypeId;
      newLicenseStartDate = currentDate;
      newLicenseEndDate = currentDate.add(licenseDaysLeftQuantity, "day");
    }

    if (
      (currentLicenseTypeId === activeLicenseTypeId ||
        currentLicenseTypeId === blockedLicenseTypeId) &&
      currentLicenseBalance > 0
    ) {
      newLicenseEndDate = currentLicenseEndDate.add(
        licenseDaysLeftQuantity,
        "day"
      );
    }

    await UserLicense.update(
      {
        activeUsersQuantity: totalUsersCount,
        accountType: newCurrentLicenseTypeId,
        dateStart: newLicenseStartDate,
        dateEnd: newLicenseEndDate
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
    console.log("userLicenseId", userLicenseId);

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

// router.patch("/:userLicenseId?/edit", auth, async (req, res) => {
//   try {
//     const { userLicenseId } = req.params;
//     if (!userLicenseId) {
//       return res.status(400).json({
//         message: "Необходимо указать идентификатор лицензии (UserLicenseId)."
//       });
//     }

//     const existingUserLicense = await UserLicense.findByPk(userLicenseId);

//     if (!existingUserLicense) {
//       return res.status(404).json({
//         message: "Лицензия не найдена."
//       });
//     }

//     // Обновляем поле balance в существующей лицензии
//     existingUserLicense.balance = parseFloat(existingUserLicense.balance);
//     existingUserLicense.balance += parseInt(req.body.balance);
//     const newBalance = existingUserLicense.balance;

//     // id для статуса "Действующий"
//     const activetedId = "718gkgdbn48jgfo3kktjt002";

//     // Если баланс равен 0 меняем accountType
//     if (
//       existingUserLicense._previousDataValues.balance === 0 &&
//       req.body.balance > 49
//     ) {
//       existingUserLicense.accountType = activetedId;
//     }

//     // Получаем текущую дату и время
//     const currentDate = new Date();

//     // Обновляем поле dateStart на текущую дату и время
//     existingUserLicense.dateStart = currentDate;

//     // Получаем количество пользователей (менеджеров и наблюдателей) и добавляем 1 за текущего пользователя
//     const managersCount = existingUserLicense.managers.length;
//     const observersCount = existingUserLicense.observers.length;
//     const totalUsersCount = managersCount + observersCount + 1;

//     // Вычисляем количество дней, на которое хватит баланса
//     const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
//     const daysLeft = Math.floor(
//       existingUserLicense.balance / (subscriptionCostPerUser * totalUsersCount)
//     );

//     // Ставим дату окончания лицензии на основе текущей даты и количества дней, на которое хватит баланса
//     const newDateEnd = req.body.dateEnd;
//     existingUserLicense.dateEnd = newDateEnd;

//     // Вычитаем клик по карте из текущего количества quantityClicksOnMap лицензии
//     const newQuantityClicksOnMap = req.body.quantityClicksOnMap;

//     let currentLicenseQuantityClicksOnMap =
//       existingUserLicense.quantityClicksOnMap;

//     if (currentLicenseQuantityClicksOnMap === 0) {
//       return res.status(400).json({
//         error: {
//           message: "Количество кликов на текущий день закончилось",
//           code: 400
//         }
//       });
//     }

//     existingUserLicense.quantityClicksOnMap = newQuantityClicksOnMap;

//     // Сохраняем обновленную лицензию
//     await existingUserLicense.save();

//     res.status(200).json(existingUserLicense);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({
//       message: "На сервере произошла ошибка, попробуйте позже"
//     });
//   }
// });

export default router;
