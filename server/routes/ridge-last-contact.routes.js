import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import RidgeLastContact from "../models/Ridge-last-contact.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await RidgeLastContact.find();
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

    const newLastContact = await RidgeLastContact.create({
      ...req.body,
      userId,
      company: company._id,
    });
    res.status(201).send(newLastContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:ridgeLastContactId?/edit", auth, async (req, res) => {
  try {
    const  lastContactId  = req.body._id;
    await RidgeLastContact.findByIdAndUpdate(lastContactId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:lastContactId?", auth, async (req, res) => {
  try {
    const { lastContactId } = req.params;
    await RidgeLastContact.findByIdAndRemove(lastContactId);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
