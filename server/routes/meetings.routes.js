import express from "express";
import Meeting from "../models/Meeting.js";
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

    if (userRole.includes(roleManager)) {
      const meetings = await Meeting.findAll({ where: { userId } });
      return res.status(200).send(meetings);
    }

    if (userRole.includes(roleCurator) || userRole.includes(roleObserver)) {
      const meetings = await Meeting.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersMeetings = await Meeting.findAll({
        where: { userId: curatorManagerIds }
      });

      const usersMeetings = [
        ...meetings,
        ...curatorManagersMeetings.map((meet) => meet.dataValues)
      ];

      return res.status(200).send(usersMeetings);
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
    const newMeeting = await Meeting.create({
      ...req.body,
      userId
    });

    res.status(201).send(newMeeting);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:meetingId?/edit", auth, async (req, res) => {
  try {
    const { meetingId } = req.params;
    if (!meetingId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор встречи (meetingId)."
      });
    }

    const existingMeeting = await Meeting.findByPk(meetingId);

    if (!existingMeeting) {
      return res.status(404).json({
        message: "Встреча не найдена."
      });
    }

    const updatedMeeting = await existingMeeting.update(req.body);

    res.status(200).json(updatedMeeting);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:meetingId?", auth, async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор встречи (meetingId)."
      });
    }

    const deletedMeeting = await Meeting.findByPk(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({
        message: "Встреча не найдена."
      });
    }

    await deletedMeeting.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
