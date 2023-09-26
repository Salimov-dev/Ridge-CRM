import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import RidgeObject from "../models/Ridge-object.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const userRole = user.role;

    if (userRole === "MANAGER") {
      // Если пользователь - менеджер, то показать только его объекты
      const objects = await RidgeObject.find({ userId });
      return res.status(200).send(objects);
    }

    // Найти объекты, принадлежащие текущему пользователю
    const objects = await RidgeObject.find({ userId });

    // Найти менеджеров текущего пользователя
    const managers = await User.find({ curatorId: userId });

    // Создать массив идентификаторов менеджеров
    const managerIds = managers.map((manager) => manager._id);

    // Найти объекты, принадлежащие менеджерам
    const managerObjects = await RidgeObject.find({
      userId: { $in: managerIds },
    });

    // Объединить объекты текущего пользователя и объекты менеджеров
    const allObjects = [...objects, ...managerObjects];

    return res.status(200).send(allObjects);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.get("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;
    const editedObject = await RidgeObject.findById(objectId);
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
    await RidgeObject.findByIdAndUpdate(objectId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;
    await RidgeObject.findByIdAndRemove(objectId);
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

    const newObject = await RidgeObject.create({
      ...req.body,
      userId,
      company: company._id,
    });

    res.status(201).send(newObject);
  } catch (e) {
    res.status(500).json({
      message: "An error occurred on the server, please try again later",
    });
  }
});

export default router;
