import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

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

    const updatedUser = await existingUser.update({
      isEmailActived: true
    });

    res.status(200).json({ message: "Почта успешно активирована, спасибо!" });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
