import express from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import tokenService from "../services/token.service.js";
import UserLicense from "../models/UserLicense.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = process.env;

const router = express.Router({ mergeParams: true });

// регистрация пользователя
router.post("/signUp", [
  check("email", "Email некорректный").isEmail(),
  check(
    "password",
    "Пароль не может быть пустым и должен содержать минимум 8 символов, одну заглавную букву и одну цифру"
  )
    .notEmpty()
    .withMessage("Пароль не может быть пустым")
    .isLength({ min: 8 })
    .withMessage("Пароль должен содержать минимум 8 символов")
    .matches(/^(?=.*\d)(?=.*[A-Z])/)
    .withMessage(
      "Пароль должен содержать как минимум одну заглавную букву и одну цифру"
    )
    .trim(),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Проверяем наличие ошибок для поля "password"
        const passwordError = errors.errors.find(
          (error) => error.path === "password"
        );
        if (passwordError) {
          const passwordMessage = passwordError.msg;
          return res.status(400).json({
            error: {
              message: passwordMessage,
              code: 400
            }
          });
        }

        // Проверяем наличие ошибок для поля "email"
        const emailError = errors.errors.find(
          (error) => error.path === "email"
        );
        if (emailError) {
          const emailMessage = emailError.msg;
          return res.status(400).json({
            error: {
              message: emailMessage,
              code: 400
            }
          });
        }

        // Если найдены только ошибки валидации, но нет конкретных для email и password, возвращаем общее сообщение
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400
          }
        });
      }

      const { email, password, color, city } = req.body;

      // проверяем есть ли юзер с такой почтой
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

      // хеширем пароль
      const hashedPassword = await bcrypt.hash(password, 12);

      // ссылка для активации почты
      const activationLinkId = uuidv4();
      const activationLink = `${API_URL}/activate/${activationLinkId}`;

      const newUser = await User.create({
        email,
        password: hashedPassword,
        color,
        city,
        activationLink: activationLinkId
      });

      // создаем новую лицензию для пользователя
      await UserLicense.create({
        userId: newUser._id
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      // Создаем экземпляр отправителя
      const registrationNewUser = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD
        }
      });

      // Создаем экземпляр отправителя
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
      <p>Рады видеть под новым аккаунтом ${newUser.email}</p>
      <p>Бесплатный период пользования Грядкой составляет 14 календарных дней, этот срок не сгорает, если решите приобрести подписку на пользование системой ранее его окончания</p>
      <p>Будем признательны за обратную связь при использовании в работе нашей системы</p>
      <p>Работайте самостоятельно или соберите свою команду менеджеров и порвите рынок недвижимости с помощью Грядки ЦРМ!</p>
      <p>Желаем приятного сбора урожая!</p><br>

      <h4>И не забудьте обязательно подтвердить свою почту по ссылке: </h4>
      <a href="${activationLink}">${activationLink}</a><br>

      <p>----------------------------------------</p>
      <p>Грядка ЦРМ</p>
      <p>${API_URL}</p>
      <p>Телеграм: https://t.me/ridge_crm</p>
      <p>Почта: ${SMTP_USER}</p>
      `;

      // HTML содержимое письма для администратора Грядки о регистрации нового пользователя
      const htmlForAdmin = `
      <h3>У Вас новый пользователь в Грядке ЦРМ под логином ${newUser.email}!</h3>

      <p>----------------------------------------</p>
      <p>Грядка ЦРМ</p>
      <p>${API_URL}</p>
      <p>Телеграм: https://t.me/ridge_crm</p>
      <p>Почта: ${SMTP_USER}</p>
      `;

      // Отправляем письмо пользователю об успешной регистрации
      await registrationNewUser.sendMail({
        from: SMTP_USER,
        to: newUser.email,
        subject: "Регистрация в Грядке ЦРМ",
        html: htmlForNewUser
      });

      // Отправляем письмо Администратору о регистрации нового пользователя
      await adminNotification.sendMail({
        from: SMTP_USER,
        to: SMTP_USER,
        subject: "Регистрация нового пользователя в Грядке ЦРМ",
        html: htmlForAdmin
      });

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
        error: e.message
      });
    }
  }
]);

// логин с паролем
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
      const existingUser = await User.findOne({ where: { email } });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "Неправильные логин или пароль",
            code: 400
          }
        });
      }

      const userRoleManager = "69gfoep3944jgjdso345002";
      const roleObserver = "69dgp34954igfj345043001";
      const isUserRoleManager = existingUser.role.includes(userRoleManager);
      const isUserRoleObserver = existingUser.role.includes(roleObserver);

      if (!existingUser.isActive && (isUserRoleManager || isUserRoleObserver)) {
        return res.status(400).send({
          error: {
            message: "Ваш аккаунт заблокирован, обратитесь к своему Куратору!",
            code: 400
          }
        });
      }

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

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD
        }
      });

      // HTML содержимое для письма
      const html = `
      <h3>Приветствуем, ${existingUser.firstName || "Новый пользователь"}!</h3>
      ${
        !existingUser.firstName
          ? `<h4>Заполните свой профиль в Грядке, чтобы мы могли приветствовать Вас по имени</h4>`
          : ""
      }
      <p>Обнаружен вход в Грядку ЦРМ через Ваш аккаунт ${existingUser.email}</p>
      <p>Если это были не Вы, рекомендуем сменить пароль или обратиться в техподдержку Грядки</p><br>
      <p>----------------------------------------</p>
      <p>Грядка ЦРМ</p>
      <p>${API_URL}</p>
      <p>Телеграм: https://t.me/ridge_crm</p>
      <p>Почта: ${SMTP_USER}</p>
      `;

      // Отправляем письмо
      await transporter.sendMail({
        from: SMTP_USER,
        to: existingUser.email,
        subject: "Вход в аккаунт",
        html: html
      });

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
