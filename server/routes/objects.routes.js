import express from "express";
import { Op } from "sequelize";
// models
import Object from "../models/Object.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByPk(userId);
    // const userRole = user.role;

    // if (userRole === "MANAGER") {
    //   // Если пользователь - менеджер, то показать только его объекты
    //   const objects = await ObjectModel.findAll({ where: { userId } });
    //   return res.status(200).json(objects);
    // }

    // Найти объекты, принадлежащие текущему пользователю
    const userObjects = await Object.findAll({ where: { userId } });

    // Найти менеджеров текущего пользователя
    // const managers = await User.findAll({ where: { curatorId: userId } });

    // Создать массив идентификаторов менеджеров
    // const managerIds = managers.map((manager) => manager._id);

    // Найти объекты, принадлежащие менеджерам
    // const managerObjects = await Object.findAll({
    //   where: { userId: { [Op.in]: managerIds } },
    // });

    // Объединить объекты текущего пользователя и объекты менеджеров
    // const allObjects = [...userObjects, ...managerObjects];

    return res.status(200).json(userObjects);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const companies = await CompanyModel.findAll({
    //   where: {
    //     [Op.or]: [
    //       { managers: { [Op.contains]: [userId] } },
    //       { curators: { [Op.contains]: [userId] } },
    //     ],
    //   },
    // });

    // if (!companies || companies.length === 0) {
    //   return res.status(403).json({
    //     message: "У вас нет прав доступа к созданию объекта для компании.",
    //   });
    // }

    const newObject = await Object.create({
      ...req.body,
      userId,
      // companyId: companies[0]._id,
    });

    res.status(201).json(newObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

router.get("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId).",
      });
    }

    const editedObject = await Object.findByPk(objectId);

    if (!editedObject) {
      return res.status(404).json({
        message: "Объект не найден.",
      });
    }

    res.status(200).json(editedObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:objectId?/edit", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId).",
      });
    }

    const existingObject = await Object.findByPk(objectId);

    if (!existingObject) {
      return res.status(404).json({
        message: "Объект не найден.",
      });
    }

    const updatedObject = await existingObject.update(req.body);

    res.status(200).json(updatedObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/update-multiple", auth, async (req, res) => {
  try {
    const { objectIds, userId } = req.body;

    if (!objectIds || !Array.isArray(objectIds) || objectIds.length === 0) {
      return res.status(400).json({
        message:
          "Необходимо предоставить действительные идентификаторы объектов (objectIds).",
      });
    }

    // Обновите объекты с соответствующими ID
    const toConnectObjectStatus = "64bvcpas34kszc21d2344876";
    await Object.update(
      { _id: { [Op.in]: objectIds } },
      {
        userId,
        status: toConnectObjectStatus,
      }
    );

    // Найти и вернуть обновленные объекты
    const updatedObjects = await Object.findAll({
      where: { _id: { [Op.in]: objectIds } },
    });

    res.status(200).json(updatedObjects);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId).",
      });
    }

    const deletedObject = await Object.findByPk(objectId);

    if (!deletedObject) {
      return res.status(404).json({
        message: "Объект не найден.",
      });
    }

    await deletedObject.destroy();

    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
