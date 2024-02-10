import express from "express";
import { Op } from "sequelize";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const userRole = user.role;

    const roleCurator = "69gfoep3944jgjdso345003";
    const roleManager = "69gfoep3944jgjdso345002";
    const roleObserver = "69dgp34954igfj345043001";

    if (userRole === roleManager) {
      const managerId = user.curatorId;

      const manager = await User.findByPk(managerId);
      if (!manager) {
        return res.status(404).json({ message: "Менеджер не найден" });
      }

      return res.status(200).send([user, manager]);
    }

    const managerUsers = await User.findAll({ where: { curatorId: userId } });
    const allUsers = [user, ...managerUsers];

    return res.status(200).send(allUsers);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже"
    });
  }
});

router.patch("/:userId/edit-manager", auth, async (req, res) => {
  try {
    const userId = req.params.userId; // Use params instead of body for the userId
    const updatedUser = await User.update(req.body, {
      where: { _id: userId },
      returning: true
    });

    if (!updatedUser[0]) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.send(updatedUser[1][0]);
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
    const userId = req.user._id; // Получаем идентификатор пользователя из токена аутентификации
    const { currentPassword, newPassword } = req.body;

    // Находим пользователя в базе данных
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Проверяем, соответствует ли текущий пароль, переданный в запросе, паролю в базе данных
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Текущий пароль введен неверно" });
    }

    // Хешируем новый пароль
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль пользователя в базе данных
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
