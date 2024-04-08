import express from "express";
import User from "../models/User.js";
import lic from "../middleware/license-account-type.middleware.js";
import auth from "../middleware/auth.middleware.js";
import LastContact from "../models/Last-contact.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;

    // если пользователь Менеджер
    if (userRole.includes(roleManager)) {
      const lastContacts = await LastContact.findAll({ where: { userId } });
      return res.status(200).send(lastContacts);
    }

    // если пользователь Наблюдатель
    if (userRole.includes(roleObserver)) {
      const lastContacts = await LastContact.findAll({ where: { userId } });
      const curatorId = user.curatorId;
      const curatorUsers = await User.findAll({ where: { curatorId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagerslastContacts = await LastContact.findAll({
        where: { userId: curatorManagerIds }
      });

      // Удалить последние контакты, которые уже принадлежат пользователю
      const filteredCuratorManagerslastContacts =
        curatorManagerslastContacts.filter((obj) => obj.userId !== userId);

      // Добавить последние контакты, где userId === curatorId
      const curatorlastContacts = await LastContact.findAll({
        where: { userId: curatorId }
      });

      const userslastContacts = [
        ...lastContacts,
        ...filteredCuratorManagerslastContacts.map((obj) => obj.dataValues),
        ...curatorlastContacts.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(userslastContacts);
    }

    // если пользователь Куратор
    if (userRole.includes(roleCurator)) {
      const lastContacts = await LastContact.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersLastContacts = await LastContact.findAll({
        where: { userId: curatorManagerIds }
      });

      const usersLastContacts = [
        ...lastContacts,
        ...curatorManagersLastContacts.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(usersLastContacts);
    }

    return res.status(200).send([]);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;
    const newLastContact = await LastContact.create({
      ...req.body,
      userId
    });

    res.status(201).send(newLastContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:lastContactId?/edit", auth, lic, async (req, res) => {
  try {
    const { lastContactId } = req.params;
    if (!lastContactId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор последнего контакта (lastContactId)."
      });
    }

    const existingLastContact = await LastContact.findByPk(lastContactId);

    if (!existingLastContact) {
      return res.status(404).json({
        message: "Последний контакт не найден."
      });
    }

    const updatedLastContact = await existingLastContact.update(req.body);

    res.status(200).json(updatedLastContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:lastContactId?", auth, lic, async (req, res) => {
  try {
    const { lastContactId } = req.params;
    if (!lastContactId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор последнего контакта (lastContactId)."
      });
    }

    const deletedLastContact = await LastContact.findByPk(lastContactId);

    if (!deletedLastContact) {
      return res.status(404).json({
        message: "Последний контакт не найден."
      });
    }

    await deletedLastContact.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
