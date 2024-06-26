import express from "express";
import auth from "../middleware/auth.middleware.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { Op } from "sequelize";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import lic from "../middleware/license-account-type.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;

    // если пользователь Менеджер
    if (userRole.includes(roleManager)) {
      const tasks = await Task.findAll({
        where: {
          [Op.or]: [{ userId }, { managerId: userId }]
        }
      });
      return res.status(200).send(tasks);
    }

    // если пользователь Наблюдатель
    if (userRole.includes(roleObserver)) {
      const tasks = await Task.findAll({ where: { userId } });
      const curatorId = user.curatorId;
      const curatorUsers = await User.findAll({ where: { curatorId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersTasks = await Task.findAll({
        where: { userId: curatorManagerIds }
      });

      // Удалить задачи, которые уже принадлежат пользователю
      const filteredCuratorManagersTasks = curatorManagersTasks.filter(
        (obj) => obj.userId !== userId
      );

      // Добавить задачи, где userId === curatorId
      const curatorTasks = await Task.findAll({
        where: { userId: curatorId }
      });

      const usersTasks = [
        ...tasks,
        ...filteredCuratorManagersTasks.map((task) => task.dataValues),
        ...curatorTasks.map((task) => task.dataValues)
      ];

      return res.status(200).send(usersTasks);
    }

    // если пользователь Куратор
    if (userRole.includes(roleCurator)) {
      const tasks = await Task.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersTasks = await Task.findAll({
        where: { userId: curatorManagerIds }
      });

      const usersTasks = [
        ...tasks,
        ...curatorManagersTasks.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(usersTasks);
    }

    return res.status(200).send([]);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;

    const newTask = await Task.create({
      ...req.body,
      userId
    });

    res.status(201).send(newTask);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:taskId?/edit", auth, lic, async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор задачи (taskId)."
      });
    }

    const existingTask = await Task.findByPk(taskId);

    if (!existingTask) {
      return res.status(404).json({
        message: "Встреча не найдена."
      });
    }

    const updatedTask = await existingTask.update(req.body);
    res.send(updatedTask);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:taskId?", auth, lic, async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (taskId)."
      });
    }

    const deletedTask = await Task.findByPk(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Объект не найден."
      });
    }

    await deletedTask.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
