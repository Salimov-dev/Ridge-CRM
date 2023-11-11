import express from "express";
import Company from "../models/Company.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import LastContact from "../models/Last-contact.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const userRole = user.role;

    if (userRole === "MANAGER") {
      const lastContacts = await LastContact.find({ userId });
      return res.status(200).send(lastContacts);
    }

    const lastContacts = await LastContact.find({ userId });
    const managers = await User.find({ curatorId: userId });
    const managerIds = managers.map((manager) => manager._id);
    const managerLastContacts = await LastContact.find({ userId: { $in: managerIds } });
    const allLastContacts = [...lastContacts, ...managerLastContacts];

    return res.status(200).send(allLastContacts);
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
