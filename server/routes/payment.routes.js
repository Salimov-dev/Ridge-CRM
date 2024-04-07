import express from "express";
import auth from "../middleware/auth.middleware.js";
import UserLicense from "../models/UserLicense.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import User from "../models/User.js";
dotenv.config();

const { ROBO_SRC, ROBO_MERCHANT_LOGIN, ROBO_DESCRIPTION, ROBO_PASS_1 } =
  process.env;

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { amount } = req.body;

    const userId = req.user._id;

    const generateUniqueNumber = () => {
      const timestamp = Date.now();
      const timestampString = timestamp.toString().substr(0, 9); // Обрезаем до 9 символов
      return parseInt(timestampString); // Преобразуем обрезанную строку в число
    };

    const InvIdNumber = generateUniqueNumber();

    // генерирую хеш md5 РАБОЧАЯ БОЕВАЯ
    const ROBO_CRC = CryptoJS.MD5(
      `${ROBO_MERCHANT_LOGIN}:${amount}:${InvIdNumber}:${ROBO_PASS_1}`
    ).toString();

    // генерирую ссылку для оплаты
    const paymentLink = `${ROBO_SRC}?MerchantLogin=${ROBO_MERCHANT_LOGIN}&OutSum=${amount}&invoiceID=${InvIdNumber}&Description=${ROBO_DESCRIPTION}&SignatureValue=${ROBO_CRC}`;

    const userLicense = await UserLicense.findOne({
      where: { userId }
    });

    if (!userLicense) {
      return res.status(404).json({
        message: "Лицензия пользователя не найдена."
      });
    }

    await UserLicense.update(
      {
        paymentAmount: amount,
        paymentInvId: InvIdNumber
      },
      { where: { userId } }
    );

    res.status(200).json({ paymentLink });
  } catch (e) {
    console.error(e);
    if (e instanceof Sequelize.ValidationError) {
      const errorMessage = e.errors.map((error) => error.message).join(", ");
      res.status(400).json({ error: { message: errorMessage } });
    } else {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже"
      });
    }
  }
});

router.post("/confirm", auth, async (req, res) => {
  try {
    const { outSum, paymentInvId } = req.body;
    const paymentSum = Math.floor(parseFloat(outSum));

    const userLicense = await UserLicense.findOne({
      where: { paymentInvId }
    });

    if (!userLicense) {
      return res.status(404).json({
        message: "Лицензия пользователя не найдена."
      });
    }
    const licensePaymentAmount = userLicense.paymentAmount;

    if (paymentSum !== licensePaymentAmount) {
      return res.status(404).json({
        message: "Сумма оплаты не совпадает с заданной"
      });
    }

    const userId = userLicense.userId;

    // вычисление активных пользователей лицензии
    const usersList = await User.findAll();

    const usersManagersArray = userLicense?.managers;
    const activeUsersManagers = usersManagersArray?.filter((userId) => {
      const user = usersList.find((user) => user._id === userId);
      return user && user.isActive;
    });

    const usersObserversArray = userLicense?.observers;
    const activeUsersObservers = usersObserversArray?.filter((userId) => {
      const user = usersList.find((user) => user._id === userId);
      return user && user.isActive;
    });

    const managersLength = activeUsersManagers?.length || 0;
    const observersLength = activeUsersObservers?.length || 0;
    const totalUsersCount = managersLength + observersLength + 1; // 1 добавляю в качестве лицензии текущего пользователя Куратора

    // дата
    const currentDate = dayjs();
    const currentLicenseStartDate = dayjs(userLicense.dateStart);
    const currentLicenseEndDate = dayjs(userLicense.dateEnd);
    console.log(
      "currentLicenseEndDate",
      currentLicenseEndDate.format("DD.MM.YYYY")
    );
    let newLicenseStartDate = currentLicenseStartDate;
    let newLicenseEndDate = currentLicenseEndDate;

    // тип лицензии
    const trialLicenseTypeId = "71pbfi4954itj045tloop001";
    const activeLicenseTypeId = "718gkgdbn48jgfo3kktjt002";
    const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";
    const currentLicenseTypeId = userLicense?.accountType;
    const isLicenseTrialType = currentLicenseTypeId === trialLicenseTypeId;
    const isLicenseActiveType = currentLicenseTypeId === activeLicenseTypeId;
    const isLicenseBlockedType = currentLicenseTypeId === blockedLicenseTypeId;

    // баланс
    const currentLicenseBalance = userLicense.balance;
    const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
    const licenseDaysLeftQuantity = Math.floor(
      currentLicenseBalance / (subscriptionCostPerUser * totalUsersCount)
    );
    console.log("licenseDaysLeftQuantity", licenseDaysLeftQuantity);
    const newLicenseDaysLeftQuantity = Math.floor(
      paymentSum / (subscriptionCostPerUser * totalUsersCount)
    );
    console.log("newLicenseDaysLeftQuantity", newLicenseDaysLeftQuantity);

    if (isLicenseTrialType && currentLicenseBalance > 0) {
      newCurrentLicenseTypeId = activeLicenseTypeId;
      newLicenseStartDate = currentDate;
      newLicenseEndDate = currentDate.add(licenseDaysLeftQuantity, "day");
    }

    if (isLicenseActiveType) {
      console.log("isLicenseActiveType", isLicenseActiveType);
      console.log(
        "currentLicenseEndDate",
        currentLicenseEndDate.format("DD.MM.YYYY")
      );
      newLicenseEndDate = currentLicenseEndDate.add(
        newLicenseDaysLeftQuantity,
        "day"
      );
      console.log("newLicenseEndDate", newLicenseEndDate.format("DD.MM.YYYY"));
    }

    if (isLicenseBlockedType) {
      newLicenseStartDate = currentDate;
      newLicenseEndDate = newLicenseStartDate.add(
        licenseDaysLeftQuantity,
        "day"
      );
    }

    console.log(
      "newLicenseEndDate перед update",
      newLicenseEndDate.format("DD.MM.YYYY")
    );
    await UserLicense.update(
      {
        balance: Sequelize.literal("balance + " + paymentSum),
        paymentAmount: null,
        paymentInvId: null,
        activeUsersQuantity: totalUsersCount,
        accountType: activeLicenseTypeId,
        dateStart: newLicenseStartDate,
        dateEnd: newLicenseEndDate
        // dateStart: isLicenseBlockedType ? currentDate : currentLicenseStartDate
      },
      { where: { userId } }
    );

    const updatedLicense = await UserLicense.findOne({
      where: { userId }
    });
    console.log("updatedLicense", updatedLicense);

    res.status(200).json(updatedLicense);
  } catch (e) {
    console.error(e);
    if (e instanceof Sequelize.ValidationError) {
      const errorMessage = e.errors.map((error) => error.message).join(", ");
      res.status(400).json({ error: { message: errorMessage } });
    } else {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже"
      });
    }
  }
});

export default router;
