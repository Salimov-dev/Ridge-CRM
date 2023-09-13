import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import Deal from "../models/Deal.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Deal.find();
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

    const newDeal = await Deal.create({
      ...req.body,
      userId,
      company: company._id,
    });
    res.status(201).send(newDeal);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:dealId?/edit", auth, async (req, res) => {
  try {
    const { dealId } = req.params;
    await Deal.findByIdAndUpdate(dealId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:dealId?", auth, async (req, res) => {
  try {
    const { dealId } = req.params;
    await Deal.findByIdAndRemove(dealId);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
