import express from "express";
import Meeting from "../models/Meeting.js";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const user = await User.findByPk(userId);
    // const userRole = user.role;

    // if (userRole === "MANAGER") {
    //   const meetings = await Meeting.find({ userId });
    //   return res.status(200).send(meetings);
    // }

    const meetings = await Meeting.findAll({ where: { userId } });
    // const managers = await User.find({ curatorId: userId });
    // const managerIds = managers.map((manager) => manager._id);
    // const managerMeetings = await Meeting.find({ userId: { $in: managerIds } });
    // const allMeetings = [...meetings, ...managerMeetings];

    return res.status(200).send(meetings);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const company = await Company.findOne({
    //   $or: [{ managers: userId }, { curators: userId }],
    // });

    const newMeeting = await Meeting.create({
      ...req.body,
      userId,
    });

    res.status(201).send(newMeeting);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.patch("/:meetingId?/edit", auth, async (req, res) => {
  try {
    const { meetingId } = req.params;
    if (!meetingId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор встречи (meetingId).",
      });
    }

    const existingMeeting = await Meeting.findByPk(meetingId);

    if (!existingMeeting) {
      return res.status(404).json({
        message: "Встреча не найдена.",
      });
    }

    const updatedMeeting = await existingMeeting.update(req.body);

    res.status(200).json(updatedMeeting);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:meetingId?", auth, async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId).",
      });
    }

    const deletedMeeting = await Meeting.findByPk(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({
        message: "Объект не найден.",
      });
    }

    await deletedMeeting.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
