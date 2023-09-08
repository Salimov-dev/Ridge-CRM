import express from "express";
import Meeting from "../models/Meeting.js";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import RidgeTask from "../models/Ridge-Task.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await RidgeTask.find();
    res.status(200).send(list);
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
