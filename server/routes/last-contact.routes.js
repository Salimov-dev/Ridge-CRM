import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import LastContact from "../models/Last-contact.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await LastContact.find();
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

    const newLastContact = await LastContact.create({
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

router.patch("/:lastContactId?/edit", auth, async (req, res) => {
  try {
    const { lastContactId } = req.params;
    const updatedLastContact = await LastContact.findByIdAndUpdate(
      lastContactId,
      req.body
    );
    res.send(updatedLastContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:lastContactId?", auth, async (req, res) => {
  try {
    const { lastContactId } = req.params;
    await LastContact.findByIdAndRemove(lastContactId);

    return res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
