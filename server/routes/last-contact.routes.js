import express from "express";
import Company from "../models/Company.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import LastContact from "../models/Last-contact.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const user = await User.findOne({ _id: userId });
    // const userRole = user.role;

    // if (userRole === "MANAGER") {
    //   const lastContacts = await LastContact.find({ userId });
    //   return res.status(200).send(lastContacts);
    // }

    const lastContacts = await LastContact.findAll({ where: { userId } });
    // const managers = await User.find({ curatorId: userId });
    // const managerIds = managers.map((manager) => manager._id);
    // const managerLastContacts = await LastContact.find({ userId: { $in: managerIds } });
    // const allLastContacts = [...lastContacts, ...managerLastContacts];

    return res.status(200).send(lastContacts);
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

    const newLastContact = await LastContact.create({
      ...req.body,
      userId,
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
    if (!lastContactId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор последнего контакта (lastContactId).",
      });
    }

    const existingLastContact = await LastContact.findByPk(lastContactId);

    if (!existingLastContact) {
      return res.status(404).json({
        message: "Последний контакт не найден.",
      });
    }

    const updatedLastContact = await existingLastContact.update(req.body);

    res.status(200).json(updatedLastContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:lastContactId?", auth, async (req, res) => {
  try {
    const { lastContactId } = req.params;
    if (!lastContactId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор последнего контакта (objectId).",
      });
    }

    const deletedLastContact = await LastContact.findByPk(lastContactId);

    if (!deletedLastContact) {
      return res.status(404).json({
        message: "Последний контакт не найден.",
      });
    }

    await deletedLastContact.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
