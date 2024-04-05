import express from "express";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router({ mergeParams: true });
const { SMTP_HOST, SMTP_PORT, SMTP_USER, API_URL, SMTP_PASSWORD } = process.env;

router.post("/forgot/:email?", async (req, res) => {
  try {
    const recoveryEmail = req.params.email;

    const existingUser = await User.findOne({
      where: { email: recoveryEmail }
    });

    if (!existingUser) {
      return res.status(400).json({
        error: {
          message: `Такая электронная почта не найдена! Проверьте введенную почту!`,
          code: 400
        }
      });
    }
    const existingUserEmail = existingUser.dataValues.email;

    const recoveryEmailLinkId = uuidv4();
    // const recoveryEmailLink = `http://localhost:5173/password/recovery/${recoveryEmailLinkId}`;
    const recoveryEmailLink = `${API_URL}/password/recovery/${recoveryEmailLinkId}`;

    const sendRecoveryPassMail = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    });

    const htmlForUser = `
    <h3>Приветствуем Вас в Грядке ЦРМ!</h3>
    <p>Был обнаружен запрос на восстановление пароля для ${existingUserEmail}</p>

    <h4>Перейдите по ссылке, чтобы изменить пароль на новый: </h4>
    <a href="${recoveryEmailLink}">${recoveryEmailLink}</a><br>

    <p>----------------------------------------</p>
    <p>Грядка ЦРМ</p>
    <p>${API_URL}</p>
    <p>Телеграм: https://t.me/ridge_crm</p>
    <p>Почта: ${SMTP_USER}</p>
    `;

    await sendRecoveryPassMail.sendMail({
      from: SMTP_USER,
      to: existingUserEmail,
      subject: "Восстановление пароля в Грядке ЦРМ",
      html: htmlForUser
    });

    await existingUser.update({
      recoveryPassLink: recoveryEmailLinkId
    });

    res.status(200).json({
      message: "Письмо с ссылкой на восстановление пароля отправлено на почту!"
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/confirm", [
  check("email", "Email некорректный").isEmail(),
  check(
    "newPassword",
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
  check(
    "confirmNewPassword",
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
        const newPasswordError = errors.errors.find(
          (error) => error.path === "newPassword"
        );
        if (newPasswordError) {
          const passwordMessage = newPasswordError.msg;
          return res.status(400).json({
            error: {
              message: passwordMessage,
              code: 400
            }
          });
        }

        const confirmPasswordError = errors.errors.find(
          (error) => error.path === "confirmNewPassword"
        );
        if (passwordError) {
          const passwordMessage = confirmPasswordError.msg;
          return res.status(400).json({
            error: {
              message: passwordMessage,
              code: 400
            }
          });
        }

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

        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400
          }
        });
      }

      const { email, newPassword, confirmNewPassword, recoveryId } = req.body;

      const existingUser = await User.findOne({
        where: { email: email }
      });

      const existingUserRecoveryId = await User.findOne({
        where: { recoveryPassLink: recoveryId }
      });

      if (!existingUser || !existingUserRecoveryId) {
        return res.status(400).json({
          error: {
            message: `Такая электронная почта не найдена или неверная ссылка на восстановление!`,
            code: 400
          }
        });
      }

      const currentPasswordHash = existingUser.password;

      // Сравниваем хеши нового пароля и текущего пароля
      const passwordsMatch = await bcrypt.compare(
        newPassword,
        currentPasswordHash
      );

      if (passwordsMatch) {
        return res.status(400).json({
          error: {
            message: `Новый пароль совпадает с предыдущим, придумайте новый!`,
            code: 400
          }
        });
      }

      const existingUserEmail = existingUser.dataValues.email;

      const successUpdatePassword = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD
        }
      });

      const htmlForUser = `
      <h3>Приветствуем Вас в Грядке ЦРМ!</h3>
      <p>Только что был изменен пароль для аккаунта ${existingUserEmail}</p>
      
      <h4>Если это были не Вы, срочно обратитесь в техническую поддержку или самостоятельно смените пароль прямо сейчас!</h4>
      <p>Ваш новый пароль: ${newPassword}</p>

      <p>----------------------------------------</p>
      <p>Грядка ЦРМ</p>
      <p>${API_URL}</p>
      <p>Телеграм: https://t.me/ridge_crm</p>
      <p>Почта: ${SMTP_USER}</p>
      `;

      await successUpdatePassword.sendMail({
        from: SMTP_USER,
        to: existingUserEmail,
        subject: "Ваш пароль изменен в Грядке ЦРМ",
        html: htmlForUser
      });

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await existingUser.update({
        password: hashedPassword
      });

      res.status(200).json({
        message: "Пароль успешно изменен!"
      });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка, попробуйте позже"
      });
    }
  }
]);

router.post("/clearRecoveryPassLink", async (req, res) => {
  try {
    const { email, recoveryId } = req.body;

    const existingUser = await User.findOne({
      where: { email: email }
    });

    const existingUserRecoveryId = await User.findOne({
      where: { recoveryPassLink: recoveryId }
    });

    if (!existingUser || !existingUserRecoveryId) {
      return res.status(400).json({
        error: {
          message: `Такая электронная почта не найдена или неверная ссылка на восстановление!`,
          code: 400
        }
      });
    }

    await existingUser.update({
      recoveryPassLink: null
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
