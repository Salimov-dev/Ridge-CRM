import express from "express";
import { Op } from "sequelize";
import Object from "../models/Object.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
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

    if (userRole.includes(roleManager)) {
      const objects = await Object.findAll({ where: { userId } });
      return res.status(200).send(objects);
    }

    if (userRole.includes(roleCurator) || userRole.includes(roleObserver)) {
      const objects = await Object.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersObjects = await Object.findAll({
        where: { userId: curatorManagerIds }
      });

      const usersObjects = [
        ...objects,
        ...curatorManagersObjects.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(usersObjects);
    }

    return res.status(200).send([]);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const newObject = await Object.create({
      ...req.body,
      userId
    });

    res.status(201).json(newObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже"
    });
  }
});

router.get("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId)."
      });
    }

    const editedObject = await Object.findByPk(objectId);

    if (!editedObject) {
      return res.status(404).json({
        message: "Объект не найден."
      });
    }

    res.status(200).json(editedObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:objectId?/edit", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId)."
      });
    }

    const existingObject = await Object.findByPk(objectId);

    if (!existingObject) {
      return res.status(404).json({
        message: "Объект не найден."
      });
    }

    const updatedObject = await existingObject.update(req.body);

    res.status(200).json(updatedObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/update-multiple", auth, async (req, res) => {
  try {
    const { objectIds, userId } = req.body;

    if (!objectIds || !Array.isArray(objectIds) || objectIds.length === 0) {
      return res.status(400).json({
        message:
          "Необходимо предоставить действительные идентификаторы объектов (objectIds)."
      });
    }

    // Обновите объекты с соответствующими ID
    const toConnectObjectStatus = "64bvcpas34kszc21d2344876";
    await Object.update(
      { _id: { [Op.in]: objectIds } },
      {
        userId,
        status: toConnectObjectStatus
      }
    );

    // Найти и вернуть обновленные объекты
    const updatedObjects = await Object.findAll({
      where: { _id: { [Op.in]: objectIds } }
    });

    res.status(200).json(updatedObjects);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId)."
      });
    }

    const deletedObject = await Object.findByPk(objectId);

    if (!deletedObject) {
      return res.status(404).json({
        message: "Объект не найден."
      });
    }

    await deletedObject.destroy();

    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
