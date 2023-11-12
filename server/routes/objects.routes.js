import express from "express";
import Object from "../models/Object.js";
import Company from "../models/Company.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import mongoose from "mongoose";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });
    const userRole = user.role;

    if (userRole === "MANAGER") {
      // Если пользователь - менеджер, то показать только его объекты
      const objects = await Object.find({ userId });
      return res.status(200).send(objects);
    }

    // Найти объекты, принадлежащие текущему пользователю
    const objects = await Object.find({ userId });

    // Найти менеджеров текущего пользователя
    const managers = await User.find({ curatorId: userId });

    // Создать массив идентификаторов менеджеров
    const managerIds = managers.map((manager) => manager._id);

    // Найти объекты, принадлежащие менеджерам
    const managerObjects = await Object.find({ userId: { $in: managerIds } });

    // Объединить объекты текущего пользователя и объекты менеджеров
    const allObjects = [...objects, ...managerObjects];

    return res.status(200).send(allObjects);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.get("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;
    const editedObject = await Object.findById(objectId);
    res.status(200).send(editedObject);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:objectId?/edit", auth, async (req, res) => {
  try {
    const { objectId } = req.params;
    const updatedObject = await Object.findByIdAndUpdate(objectId, req.body);

    res.send(updatedObject);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/update-multiple", auth, async (req, res) => {
  try {
    const { objectIds, userId } = req.body;

    // Проверьте, что массив objectIds содержит действительные Object ID
    const validObjectIds = objectIds.map(
      (objectId) => new mongoose.Types.ObjectId(objectId)
    );

    // Обновите объекты с соответствующими ID
    const toConnectObjectStatus = "64bvcpas34kszc21d2344876";
    await Object.updateMany(
      { _id: { $in: validObjectIds } },
      { $set: { userId, status: toConnectObjectStatus } }
    );

    // Найти и вернуть обновленные объекты
    const updatedObjects = await Object.find({ _id: { $in: validObjectIds } });

    res.status(200).send(updatedObjects);
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
    await Object.findByIdAndRemove(objectId);
    return res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await Company.find({
      $or: [
        { managers: { $elemMatch: { $eq: userId } } },
        { curators: { $elemMatch: { $eq: userId } } },
      ],
    });

    const newObject = await Object.create({
      ...req.body,
      userId,
      company: companies[0]._id,
    });

    res.status(201).send(newObject);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

export default router;
