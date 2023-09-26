import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import Deal from "../models/Deal.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const userRole = user.role;

    if (userRole === "MANAGER") {
      // Если пользователь - менеджер, то показать только его объекты
      const deals = await Deal.find({ userId });
      return res.status(200).send(deals);
    }

    // Найти объекты, принадлежащие текущему пользователю
    const deals = await Deal.find({ userId });

    // Найти менеджеров текущего пользователя
    const managers = await User.find({ curatorId: userId });

    // Создать массив идентификаторов менеджеров
    const managerIds = managers.map((manager) => manager._id);

    // Найти объекты, принадлежащие менеджерам
    const managersDeals = await Deal.find({ userId: { $in: managerIds } });

    // Объединить объекты текущего пользователя и объекты менеджеров
    const allDeals = [...deals, ...managersDeals];

    return res.status(200).send(allDeals);
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

    const newDeal = await Deal.create({
      ...req.body,
      userId,
      company: company._id,
    });
    res.status(201).send(newDeal);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:dealId?/edit", auth, async (req, res) => {
  try {
    const { dealId } = req.params;
    await Deal.findByIdAndUpdate(dealId, req.body);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:dealId?", auth, async (req, res) => {
  try {
    const { dealId } = req.params;
    await Deal.findByIdAndRemove(dealId);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
