import express from "express";
import Meeting from "../models/Meeting.js";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import Task from "../models/Task.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Task.find();
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

router.patch("/:taskId?/edit", auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndUpdate(taskId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:taskId?", auth, async (req, res) => {
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