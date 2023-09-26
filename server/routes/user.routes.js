import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  console.log("req", req);
  try {
    const userId = req.user._id;
    console.log("req.user._id", req.user._id);
    console.log("userId", userId);
    const user = await User.findById(userId); // Найти пользователя по _id
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const userRole = req.user.role; // Получить роль пользователя

    if (userRole === "MANAGER") {
      return res.status(200).send([]);
    }
    const managerUsers = await User.find({ curatorId: { $in: userId } });
    const allUsers = [user, ...managerUsers];

    return res.status(200).send(allUsers);
  } catch (e) {
    console.log("e", e);
    console.log("e", e.message);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:userId/edit-manager", async (req, res) => {
  try {
    const userId = req.body._id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.send(updatedUser);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

export default router;
