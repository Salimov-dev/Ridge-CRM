import express from "express";
import User from "../models/User.js";
import lic from "../middleware/license-account-type.middleware.js";
import auth from "../middleware/auth.middleware.js";
import bcrypt from "bcryptjs";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import nodemailer from "nodemailer";
import { sequelize } from "../utils/postgre-conection.js";
import { check, validationResult } from "express-validator";
import UserLicense from "../models/UserLicense.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import dayjs from "dayjs";
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL, API_YOUTUBE } =
  process.env;

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;

    // если пользователь Менеджер
    if (userRole.includes(roleManager)) {
      const curatorId = user.curatorId;
      const userCurator = await User.findByPk(curatorId);

      const userToSend = { ...user.dataValues };
      const userCuratorToSend = { ...userCurator.dataValues };

      delete userToSend.password; // удаляем пароль менеджера
      delete userCurator.password; // удаляем пароль куратора

      return res.status(200).send([userToSend, userCuratorToSend]);
    }

    // если пользователь Наблюдатель
    if (userRole.includes(roleObserver)) {
      const curatorId = user.curatorId;
      const userCurator = await User.findByPk(curatorId);

      // Добавить юзеров, где userId === curatorId
      const curatorUsers = await User.findAll({
        where: { curatorId: userCurator._id } // Найти пользователей с curatorId равным userCurator._id
      });

      const userToSend = { ...user.dataValues };
      const userCuratorToSend = { ...userCurator.dataValues };

      delete userToSend.password; // удаляем пароль менеджера
      delete userCuratorToSend.password; // удаляем пароль куратора

      const managerList = [
        userToSend,
        userCuratorToSend,
        ...curatorUsers.map((user) => {
          const userData = { ...user.dataValues };
          delete userData.password;
          return userData;
        })
      ];

      return res.status(200).send(managerList);
    }

    // если пользователь Куратор
    if (userRole.includes(roleCurator)) {
      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const usersData = [
        { ...user.dataValues, password: undefined },
        ...curatorUsers.map((curatorUser) => {
          const userToSend = { ...curatorUser.dataValues };
          delete userToSend.password; // удаляем пароль
          return userToSend;
        })
      ];
      return res.status(200).send(usersData);
    }

    return res.status(200).send([]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.patch("/:userId/update-user", auth, lic, async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.update(req.body, {
      where: { _id: userId },
      returning: true
    });

    if (!updatedUser[0]) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.send(updatedUser[1][0]);
  } catch (e) {
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

router.patch("/:userId/update-teammate", auth, lic, async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUserId = req.user._id;
    const currentDate = dayjs();
    const { _id: updatedUserId, color, role, isActive } = req.body;

    const addRoleToUser = (userRoles, roleId) => {
      if (!userRoles) {
        return [roleId];
      }
      userRoles = [roleId];

      return userRoles;
    };

    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({
        message: "Пользователь не найдена."
      });
    }

    const updatedUser = await existingUser.update(
      {
        color: color,
        role: addRoleToUser(existingUser?.role, role),
        isActive: isActive,
        updated_at: currentDate
      },
      { where: { _id: userId } }
    );

    // Обновление лицензии текущего пользователя
    const userLicense = await UserLicense.findOne({
      where: { userId: currentUserId }
    });

    if (!userLicense) {
      return res.status(404).json({
        message: "Лицензия пользователя не найдена."
      });
    }

    // Удаление updatedUserId из текущего массива (managers или observers)
    let updatedManagers = [...userLicense.managers];
    let updatedObservers = [...userLicense.observers];

    if (updatedManagers.includes(updatedUserId)) {
      updatedManagers = updatedManagers.filter((id) => id !== updatedUserId);
    } else if (updatedObservers.includes(updatedUserId)) {
      updatedObservers = updatedObservers.filter((id) => id !== updatedUserId);
    }

    // Добавление updatedUserId в массив с новой ролью
    if (role === roleManager) {
      updatedManagers.push(updatedUserId);
    } else if (role === roleObserver) {
      updatedObservers.push(updatedUserId);
    }

    const usersList = await User.findAll();

    // считаем количество активных пользователей в лицензии
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

    // тип лицензии
    const currentLicenseTypeId = userLicense.accountType;
    const trialLicenseTypeId = "71pbfi4954itj045tloop001";
    const activeLicenseTypeId = "718gkgdbn48jgfo3kktjt002";
    const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";

    // считаем новую дату окончания лицензии
    const subscriptionCostPerUser = 25; // Стоимость подписки за одного пользователя
    const currentLicenseStartDate = dayjs(userLicense.dateStart);
    const currentLicenseEndDate = dayjs(userLicense.dateEnd);
    const currentLicenseTrialEndDate = dayjs(userLicense.dateTrialEnd);

    const licenseDaysLeftQuantity = Math.floor(
      userLicense.balance / (subscriptionCostPerUser * totalUsersCount)
    );

    let newLicenseEndDate = currentLicenseStartDate.add(
      licenseDaysLeftQuantity,
      "day"
    );

    if (currentLicenseTypeId === trialLicenseTypeId) {
      newLicenseEndDate = currentLicenseTrialEndDate.subtract(1, "day");
    }

    if (currentLicenseTypeId === activeLicenseTypeId) {
      newLicenseEndDate = currentDate
        .add(licenseDaysLeftQuantity, "day")
        .subtract(1, "day");
    }

    // Обновление лицензии пользователя
    await UserLicense.update(
      {
        activeUsersQuantity: totalUsersCount,
        managers: updatedManagers,
        observers: updatedObservers,
        dateEnd: newLicenseEndDate
      },
      { where: { userId: currentUserId } }
    );

    const updatedLicense = await UserLicense.findOne({
      where: { userId: currentUserId }
    });

    res.status(200).json({ updatedUser, updatedLicense });
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

// Создание нового члена команды
router.post("/create-teammate", auth, lic, async (req, res) => {
  try {
    const curatorUserId = req.user._id;
    const curatorData = await User.findByPk(curatorUserId);
    const curatorFirstName = curatorData.dataValues.firstName;
    const curatorLastName = curatorData.dataValues.lastName;

    if (!curatorData) {
      return res.status(404).json({ message: "Куратор не найден" });
    }

    const { email, role, curatorId, color, city } = req.body;

    const password = "gRoP07u3";
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        error: {
          message:
            "Пользователь с таким e-mail уже зарегистрирован! Выберите другой e-mail",
          code: 400
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const addRoleToUser = (userRoles, roleId) => {
      if (!userRoles) {
        return [roleId];
      }

      if (!userRoles.includes(roleId)) {
        return [...userRoles, roleId];
      }

      return userRoles;
    };

    const setupPassLinkId = uuidv4();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: addRoleToUser(existingUser?.role, role),
      curatorId: curatorId,
      color,
      city,
      setupPassLink: setupPassLinkId,
      isActive: false
    });

    await UserLicense.create({
      userId: newUser._id
    });

    let roleNewUser = "";
    const roleManager = "69gfoep3944jgjdso345002";
    const roleObserver = "69dgp34954igfj345043001";

    if (newUser?.role.includes(roleManager)) {
      roleNewUser = "managers";
    } else if (newUser?.role.includes(roleObserver)) {
      roleNewUser = "observers";
    }

    // Обновляем лицензию текущего пользователя, добавляя _id нового пользователя в соответствующий массив
    if (roleNewUser) {
      // Используем userId нового пользователя для обновления лицензии текущего пользователя
      await UserLicense.update(
        {
          [roleNewUser]: sequelize.literal(
            `array_append("${roleNewUser}", '${newUser._id}')`
          )
        },
        {
          where: { userId: curatorId } // Обновляем лицензию текущего пользователя, который создает нового члена команды
        }
      );
    }
    const setupPassLink = `${API_URL}/password/setup-password/${newUser.email}/${setupPassLinkId}`;

    const registrationNewUser = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    });

    const adminNotification = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    });

    // HTML содержимое письма для пользователя о регистрации
    const htmlForNewUser = `
      <h3>С удовольствием приветствуем Вас в Грядке ЦРМ!</h3>
      <p>Рады видеть Вас под новым аккаунтом ${newUser.email}</p>
      <p>Ваш куратор с аккаунтом ${curatorData.email}</p>
      
      <h4>Обязательно перейдите по ссылке, установите свой личный пароль и приступайте к работе в Грядке ЦРМ!!</h4>
      <a href="${setupPassLink}">${setupPassLink}</a><br>
      
      <p>Желаем приятного сбора урожая!</p><br>
      <p>----------------------------------------</p>
      <p>Грядка ЦРМ</p>
      <p>${API_URL}</p>
      <p>Телеграм: https://t.me/ridge_crm</p>
      <p>Почта: ${SMTP_USER}</p>
      <p>Youtube: ${API_YOUTUBE}</p>
      `;

    // HTML содержимое письма Администратору о добавлении куратором нового члена команды
    const htmlForAdmin = `
      <h4>Куратор ${curatorLastName} ${curatorFirstName} с аккаунтом ${curatorData.email} добавил себе в команду нового пользователям ${newUser.email}!</h4>

      <p>----------------------------------------</p>
      <p>Грядка ЦРМ</p>
      <p>${API_URL}</p>
      <p>Телеграм: https://t.me/ridge_crm</p>
      <p>Почта: ${SMTP_USER}</p>
      <p>Youtube: ${API_YOUTUBE}</p>
      `;

    await registrationNewUser.sendMail({
      from: SMTP_USER,
      to: newUser.email,
      subject: "Вас добавили в Грядку ЦРМ",
      html: htmlForNewUser
    });

    await adminNotification.sendMail({
      from: SMTP_USER,
      to: SMTP_USER,
      subject: "Куратор добавил нового пользователя",
      html: htmlForAdmin
    });
    res.status(201).send(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    });
  }
});

// Роут для обновления текущего пароля пользователя
router.patch("/:userId/update-password", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    // Находим пользователя в базе данных
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Текущий пароль введен неверно" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: hashedNewPassword },
      { where: { _id: userId } }
    );

    res.status(200).json({ message: "Пароль успешно обновлен" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    });
  }
});

export default router;
