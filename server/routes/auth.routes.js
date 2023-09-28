import express from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import tokenService from "../services/token.service.js";

const router = express.Router({ mergeParams: true });

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        role: "MANAGER",
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }
      const tokens = tokenService.generate({ _id: existingUser._id });

      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
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
      _id: dbToken.user.toString(),
    });

    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

export default router;
