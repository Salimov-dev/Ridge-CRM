import express from "express";
import Meeting from "../models/Meeting.js";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import RidgeTask from "../models/Ridge-Task.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role; // Получить роль пользователя

    if (userRole === "MANAGER") {
      // Если пользователь - менеджер, то показать только его объекты
      const tasks = await RidgeTask.find({ userId });
      return res.status(200).send(tasks);
    }

    // Найти объекты, принадлежащие текущему пользователю
    const tasks = await RidgeTask.find({ userId });

    // Найти менеджеров текущего пользователя
    const managers = await User.find({ curatorId: userId });

    // Создать массив идентификаторов менеджеров
    const managerIds = managers.map(manager => manager._id);

    // Найти объекты, принадлежащие менеджерам
    const managerTasks = await RidgeTask.find({ userId: { $in: managerIds } });

    // Объединить объекты текущего пользователя и объекты менеджеров
    const allTasks = [...tasks, ...managerTasks];

    return res.status(200).send(allTasks);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const company = await Company.findOne({
      $or: [{ managers: userId }, { curators: userId }],
    });

    const newTask = await RidgeTask.create({
      ...req.body,
      userId,
      company: company._id,
    });
    res.status(201).send(newTask);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:taskId?/edit", auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    await RidgeTask.findByIdAndUpdate(taskId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:taskId?", auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    await RidgeTask.findByIdAndRemove(taskId);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
