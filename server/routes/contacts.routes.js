import express from "express";
import Contact from "../models/contact/Contact.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;
    const contacts = await Contact.findAll();
    // if (userRole.includes(roleManager)) {
    //   const Contacts = await Contact.findAll({ where: { userId } });
    //   return res.status(200).send(Contacts);
    // }

    // if (userRole.includes(roleCurator) || userRole.includes(roleObserver)) {
    //   const Contacts = await Contact.findAll({ where: { userId } });

    //   const curatorUsers = await User.findAll({ where: { curatorId: userId } });
    //   const curatorManagerIds = curatorUsers.map((user) => user._id);

    //   const curatorManagersContacts = await Contact.findAll({
    //     where: { userId: curatorManagerIds }
    //   });

    //   const usersContacts = [
    //     ...Contacts,
    //     ...curatorManagersContacts.map((meet) => meet.dataValues)
    //   ];

    //   return res.status(200).send(usersContacts);
    // }

    return res.status(200).send(contacts);
    // return res.status(200).send([]);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const newContact = await Contact.create({
      ...req.body,
      userId
    });

    res.status(201).send(newContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:contactId?/edit", auth, async (req, res) => {
  try {
    const { contactId } = req.params;
    if (!contactId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор контакта (contactId)."
      });
    }

    const existingContact = await Contact.findByPk(contactId);

    if (!existingContact) {
      return res.status(404).json({
        message: "Контакт не найде"
      });
    }

    const updatedContact = await existingContact.update(req.body);

    res.status(200).json(updatedContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:contactId?", auth, async (req, res) => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор контакта (contactId)."
      });
    }

    const deletedContact = await Contact.findByPk(contactId);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Контакт не найдена"
      });
    }

    await deletedContact.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
