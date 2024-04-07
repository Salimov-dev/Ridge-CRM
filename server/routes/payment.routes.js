import express from "express";
import auth from "../middleware/auth.middleware.js";
import UserLicense from "../models/UserLicense.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import CryptoJS from "crypto-js";
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = process.env;

const { ROBO_SRC, ROBO_MERCHANT_LOGIN, ROBO_DESCRIPTION, ROBO_PASS_1 } =
  process.env;

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { amount } = req.body;

    const userId = req.user._id;
    const InvId = uuidv4();
    const InvIdNumber = parseInt(InvId.replace(/-/g, "").substr(0, 8), 16);

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

    await UserLicense.update(
      {
        balance: Sequelize.literal("balance + " + paymentSum),
        paymentAmount: null,
        paymentInvId: null
      },
      { where: { userId } }
    );

    const updatedLicense = await UserLicense.findOne({
      where: { userId }
    });

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

// router.get("/success", async (req, res) => {
//   try {
//     const paymentSum = Math.floor(parseFloat(req.query.OutSum));
//     const paymentInvId = req.query.InvId;

//     const userLicense = await UserLicense.findOne({
//       where: { paymentInvId }
//     });

//     if (!userLicense) {
//       return res.status(404).json({
//         message: "Лицензия пользователя не найдена."
//       });
//     }
//     const licensePaymentAmount = userLicense.paymentAmount;

//     if (paymentSum !== licensePaymentAmount) {
//       return res.status(404).json({
//         message: "Сумма оплаты не совпадает с заданной"
//       });
//     }

//     const userId = userLicense.userId;

//     await UserLicense.update(
//       {
//         balance: Sequelize.literal("balance + " + paymentSum),
//         paymentAmount: null,
//         paymentInvId: null
//       },
//       { where: { userId } }
//     );

//     const updatedLicense = await UserLicense.findOne({
//       where: { userId }
//     });
//     io.emit("updateUserLicense", updatedLicense);
//     io.emit("paymentSuccessed", updatedLicense);
//   } catch (e) {
//     console.error(e);
//     if (e instanceof Sequelize.ValidationError) {
//       const errorMessage = e.errors.map((error) => error.message).join(", ");
//       res.status(400).json({ error: { message: errorMessage } });
//     } else {
//       res.status(500).json({
//         message: "На сервере произошла ошибка. Попробуйте позже"
//       });
//     }
//   }
// });

// router.get("/fail", async (req, res) => {
//   try {
//     res.status(200).json("Оплата не прошла!");
//   } catch (e) {
//     console.error(e);
//     if (e instanceof Sequelize.ValidationError) {
//       const errorMessage = e.errors.map((error) => error.message).join(", ");
//       res.status(400).json({ error: { message: errorMessage } });
//     } else {
//       res.status(500).json({
//         message: "На сервере произошла ошибка. Попробуйте позже"
//       });
//     }
//   }
// });

export default router;