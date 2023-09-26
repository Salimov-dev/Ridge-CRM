import express from "express";
import Meeting from "../models/Meeting.js";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const managerId = req.user.managerId;
    const user = await User.findOne({ _id: userId });
    const userRole = user.role;

    if (userRole === "MANAGER") {
      // Если пользователь - менеджер, то показать только его объекты
      const tasks = await Task.find({ userId });
      const curatorTasks = await Task.find({ managerId: userId });
      const allTasks = [...tasks, ...curatorTasks];

      return res.status(200).send(allTasks);
    } else {
      // Найти объекты, принадлежащие текущему пользователю
      const tasks = await Task.find({ userId });

      // Найти менеджеров текущего пользователя
      const managers = await User.find({ curatorId: userId });

      // Создать массив идентификаторов менеджеров
      const managerIds = managers.map((manager) => manager._id);

      // Найти объекты, принадлежащие менеджерам
      const managerTasks = await Task.find({ userId: { $in: managerIds } });

      // Объединить объекты текущего пользователя и объекты менеджеров
      const allTasks = [...tasks, ...managerTasks];

      return res.status(200).send(allTasks);
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const userId = req.user._id;
    const company = await Company.findOne({
      $or: [{ managers: userId }, { curators: userId }],
    });

    const newTask = await Task.create({
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

router.patch("/:taskId?/edit", async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndUpdate(taskId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:taskId?", async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndRemove(taskId);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
