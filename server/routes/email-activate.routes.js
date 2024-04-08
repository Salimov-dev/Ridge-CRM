import express from "express";
import User from "../models/User.js";
import lic from "../middleware/license-account-type.middleware.js";
import auth from "../middleware/auth.middleware.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router({ mergeParams: true });
const { SMTP_HOST, SMTP_PORT, SMTP_USER, API_URL, SMTP_PASSWORD } = process.env;

router.get("/:link?", auth, async (req, res) => {
  try {
    const activationLink = req.params.link;
    const existingUser = await User.findOne({ where: { activationLink } });

    if (!existingUser) {
      return res.status(400).json({
        error: {
          message: `Ссылка на активацию почты не найдена, запросите в своем Профиле новую ссылку`,
          code: 400
        }
      });
    }

    const isExistingUserEmailActivated = existingUser.isEmailActived;

    if (isExistingUserEmailActivated) {
      return res.status(400).json({
        error: {
          message: "Ваша почта уже активирована, приятного пользования!",
          code: 400
        }
      });
    }

    await existingUser.update({
      isEmailActived: true
    });

    res.status(200).json({ message: "Почта успешно активирована, спасибо!" });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/sendConfirmMail/:link?", auth, lic, async (req, res) => {
  try {
    const activationLinkId = req.params.link;
    const activationLink = `${API_URL}/activate/${activationLinkId}`;

    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({
        error: {
          message: `Пользователь не найден`,
          code: 400
        }
      });
    }

    const sendConfirmMail = nodemailer.createTransport({
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
    <p>Был обнаружен запрос на регистрацию почты с аккаунта ${user.email}</p>
   
    <h4>Перейдите по ссылке, чтобы подтвердить свою почту: </h4>
    <a href="${activationLink}">${activationLink}</a><br>

    <p>----------------------------------------</p>
    <p>Грядка ЦРМ</p>
    <p>${API_URL}</p>
    <p>Телеграм: https://t.me/ridge_crm</p>
    <p>Почта: ${SMTP_USER}</p>
    `;

    await sendConfirmMail.sendMail({
      from: SMTP_USER,
      to: user.email,
      subject: "Подтвердить почту в Грядке ЦРМ",
      html: htmlForUser
    });

    res
      .status(200)
      .json({ message: "Письмо с ссылкой на активацию отправлено на почту!" });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/clearActivationLink/:linkId?", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({
        error: {
          message: `Пользователь не найден`,
          code: 400
        }
      });
    }

    await user.update({
      activationLink: null
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
