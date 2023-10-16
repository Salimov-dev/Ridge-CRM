import express from "express";
import Meeting from "../models/Meeting.js";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const userRole = user.role;

    if (userRole === "MANAGER") {
      const meetings = await Meeting.find({ userId });
      return res.status(200).send(meetings);
    }

    const meetings = await Meeting.find({ userId });
    const managers = await User.find({ curatorId: userId });
    const managerIds = managers.map((manager) => manager._id);
    const managerMeetings = await Meeting.find({ userId: { $in: managerIds } });
    const allMeetings = [...meetings, ...managerMeetings];

    return res.status(200).send(allMeetings);
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

    const newMeeting = await Meeting.create({
      ...req.body,
      userId,
      company: company._id,
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
    const updatedMeeting =  await Meeting.findByIdAndUpdate(meetingId, req.body);
    res.send(updatedMeeting);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.delete("/:meetingId?", auth, async (req, res) => {
  try {
    const { meetingId } = req.params;
    await Meeting.findByIdAndRemove(meetingId);
    
    return res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
