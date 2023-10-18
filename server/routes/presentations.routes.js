import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import Presentation from "../models/Presentation.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await Presentation.find();

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

    const newPresentation = await Presentation.create({
      ...req.body,
      userId,
      company: company._id,
    });

    res.status(201).send(newPresentation);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:presentationId?/edit", auth, async (req, res) => {
  try {
    const { presentationId } = req.params;
    const updatedPresentation = await Presentation.findByIdAndUpdate(
      presentationId,
      req.body
    );
    res.send(updatedPresentation);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:presentationId?", auth, async (req, res) => {
  try {
    const { presentationId } = req.params;
    await Presentation.findByIdAndRemove(presentationId);

    return res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
