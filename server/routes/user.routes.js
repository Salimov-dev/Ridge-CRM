import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import bcrypt from "bcryptjs";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";

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
      const userToSend = { ...user.dataValues };
      delete userToSend.password; // удаляем пароль
      return res.status(200).send([userToSend]);
    }

    // если пользователь Куратор или Наблюдатель
    if (userRole.includes(roleCurator) || userRole.includes(roleObserver)) {
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

router.patch("/:userId/update-user", auth, async (req, res) => {
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

router.patch("/:userId/update-teammate", auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const { color, role, isActive } = req.body;

    const addRoleToUser = (userRoles, roleId) => {
      if (!userRoles) {
        // Если массив ролей не определен, создаем новый массив с ролью
        return [roleId];
      }
      userRoles = [roleId];
      return userRoles;
    };

    // Находим пользователя в базе данных
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({
        message: "Пользователь не найдена."
      });
    }

    // Обновляем пользователя в базе данных
    const updatedUser = await existingUser.update(
      {
        color: color,
        role: addRoleToUser(existingUser?.role, role),
        isActive: isActive
      },
      { where: { _id: userId } }
    );

    res.status(200).json(updatedUser);
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
