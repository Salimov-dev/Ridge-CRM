import express from "express";
import { Op } from "sequelize";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("userId", userId);

    const user = await User.findByPk(userId); // Find user by primary key (_id)
    console.log("user.dataValues", user.dataValues);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // const userRole = user.role;

    // if (userRole === "MANAGER") {
    //   const managerId = user.curatorId;

    //   const manager = await User.findByPk(managerId);
    //   if (!manager) {
    //     console.log("Manager not found");
    //     return res.status(404).json({ message: "Менеджер не найден" });
    //   }

    //   return res.status(200).send([user, manager]);
    // }

    // const managerUsers = await User.findAll({ where: { curatorId: userId } });
    // const allUsers = [user, ...managerUsers];

    return res.status(200).send([user.dataValues]);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:userId/edit-manager", auth, async (req, res) => {
  try {
    const userId = req.params.userId; // Use params instead of body for the userId
    const updatedUser = await User.update(req.body, {
      where: { _id: userId },
      returning: true,
    });

    if (!updatedUser[0]) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.send(updatedUser[1][0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

export default router;
