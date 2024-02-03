import express from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import tokenService from "../services/token.service.js";

const router = express.Router({ mergeParams: true });

// регистрация пользователя
router.post("/signUp", [
  check("email", "Email некорректный").isEmail(),
  check("password", "Пароль не может быть пустым").exists().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400
          }
        });
      }

      const { email, password } = req.body;

      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400
          }
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user with Sequelize
      const newUser = await User.create({
        email,
        password: hashedPassword
      });

      // Generate tokens and save the refresh token
      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      // Send the response with tokens and user ID
      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже"
      });
    }
  }
]);

// создание нового члена команды
router.post("/create", [
  check("email", "Email некорректный").isEmail(),
  check("password", "Пароль не может быть пустым").exists().trim(),
  async (req, res) => {
    // Функция для добавления роли в массив
    const addRoleToUser = (userRoles, roleId) => {
      if (!userRoles) {
        // Если массив ролей не определен, создаем новый массив с ролью
        return [roleId];
      }

      // Проверяем, есть ли роль уже в массиве
      if (!userRoles.includes(roleId)) {
        // Если роли еще нет в массиве, добавляем ее
        return [...userRoles, roleId];
      }

      // Если роль уже есть в массиве, возвращаем текущий массив
      return userRoles;
    };

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400
          }
        });
      }

      const { email, password, role, curatorId } = req.body;

      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400
          }
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user with Sequelize
      const newUser = await User.create({
        email,
        password: hashedPassword,
        role: addRoleToUser(existingUser?.role, role),
        curatorId: curatorId
      });

      // Send the response with tokens and user ID
      res.status(201).send(newUser);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже"
      });
    }
  }
]);

router.post("/signInWithPassword", [
  check("email", "Email некорректный").isEmail(),
  check("password", "Пароль не может быть пустым").exists().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400
          }
        });
      }

      const { email, password } = req.body;

      // Find the user with the provided email
      const existingUser = await User.findOne({ where: { email } });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "Неправильные логин или пароль",
            code: 400
          }
        });
      }

      // Compare the hashed password
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "Неправильные логин или пароль",
            code: 400
          }
        });
      }

      // Generate tokens and save the refresh token
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      // Send the response with tokens and user ID
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже"
      });
    }
  }
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const tokens = await tokenService.generate({
      _id: dbToken.user.toString()
    });

    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    });
  }
});

export default router;
