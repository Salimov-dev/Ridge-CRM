import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // const user = await User.findOne({ _id: userId });
    // const userRole = user.role;

    // if (userRole === "MANAGER") {
    //   const tasks = await Task.find({
    //     $or: [
    //       { userId: userId }, // Задачи, где userId равен текущему пользователю
    //       { managerId: userId }, // Задачи, где managerId равен id текущего пользователя
    //     ]
    //   });
    //   return res.status(200).send(tasks);
    // }

    const tasks = await Task.findAll({ where: { userId } });
    // const managers = await User.find({ curatorId: userId });
    // const managerIds = managers.map((manager) => manager._id);
    // const managerTasks = await Task.find({ userId: { $in: managerIds } });
    // const alltasks = [...tasks, ...managerTasks];

    return res.status(200).send(tasks);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const company = await Company.findOne({
    //   $or: [{ managers: userId }, { curators: userId }],
    // });

    const newTask = await Task.create({
      ...req.body,
      userId,
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
    if (!taskId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор задачи (taskId).",
      });
    }

    const existingTask = await Task.findByPk(taskId);

    if (!existingTask) {
      return res.status(404).json({
        message: "Встреча не найдена.",
      });
    }

    const updatedTask = await existingTask.update(req.body);
    res.send(updatedTask);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:taskId?", auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId).",
      });
    }

    const deletedTask = await Task.findByPk(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Объект не найден.",
      });
    }

    await deletedTask.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
