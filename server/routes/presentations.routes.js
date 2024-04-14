import express from "express";
import Company from "../models/company/Company.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import Presentation from "../models/Presentation.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import lic from "../middleware/license-account-type.middleware.js";

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
      const presentations = await Presentation.findAll({ where: { userId } });
      return res.status(200).send(presentations);
    }

    // если пользователь Наблюдатель
    if (userRole.includes(roleObserver)) {
      const presentations = await Presentation.findAll({ where: { userId } });
      const curatorId = user.curatorId;
      const curatorUsers = await User.findAll({ where: { curatorId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersPresentations = await Presentation.findAll({
        where: { userId: curatorManagerIds }
      });

      // Удалить объекты, которые уже принадлежат пользователю
      const filteredCuratorManagersPresentations =
        curatorManagersPresentations.filter((obj) => obj.userId !== userId);

      // Добавить объекты, где userId === curatorId
      const curatorPresentations = await Presentation.findAll({
        where: { userId: curatorId }
      });

      const usersPresentations = [
        ...presentations,
        ...filteredCuratorManagersPresentations.map((obj) => obj.dataValues),
        ...curatorPresentations.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(usersPresentations);
    }

    // если пользователь Куратор
    if (userRole.includes(roleCurator)) {
      const presentations = await Presentation.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersPresentations = await Presentation.findAll({
        where: { userId: curatorManagerIds }
      });

      const usersPresentations = [
        ...presentations,
        ...curatorManagersPresentations.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(usersPresentations);
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

    const newPresentation = await Presentation.create({
      ...req.body,
      userId
    });

    res.status(201).send(newPresentation);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:presentationId?/edit", auth, lic, async (req, res) => {
  try {
    const { presentationId } = req.params;
    if (!presentationId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор презентации (presentationId)."
      });
    }

    const existingPresentation = await Presentation.findByPk(presentationId);
    if (!existingPresentation) {
      return res.status(404).json({
        message: "Презентация не найдена."
      });
    }

    const updatedPresentation = await existingPresentation.update(req.body);

    res.status(200).json(updatedPresentation);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:presentationId?", auth, lic, async (req, res) => {
  try {
    const { presentationId } = req.params;
    if (!presentationId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор презентации (presentationId)."
      });
    }

    const deletedPresentation = await Presentation.findByPk(presentationId);

    if (!deletedPresentation) {
      return res.status(404).json({
        message: "Презентация не найдена."
      });
    }

    await deletedPresentation.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
