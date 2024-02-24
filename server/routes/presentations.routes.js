import express from "express";
import Company from "../models/company/Company.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import Presentation from "../models/Presentation.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const user = await User.findOne({ _id: userId });
    // const userRole = user.role;

    // if (userRole === "MANAGER") {
    //   const presentations = await Presentation.find({ userId });
    //   return res.status(200).send(presentations);
    // }

    const presentations = await Presentation.findAll({ where: { userId } });
    // const managers = await User.find({ curatorId: userId });
    // const managerIds = managers.map((manager) => manager._id);
    // const managerPresentations = await Presentation.find({ userId: { $in: managerIds } });
    // const allPresentations = [...presentations, ...managerPresentations];

    return res.status(200).send(presentations);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const company = await Company.findOne({
    //   $or: [{ managers: userId }, { curators: userId }],
    // });

    const newPresentation = await Presentation.create({
      ...req.body,
      userId
    });

    res.status(201).send(newPresentation);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:presentationId?/edit", auth, async (req, res) => {
  try {
    const { presentationId } = req.params;
    if (!presentationId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор презентации (presentationId)."
      });
    }

    const existingPresentation = await Presentation.findByPk(presentationId);

    if (!existingPresentation) {
      return res.status(404).json({
        message: "Презентация не найдена."
      });
    }

    const updatedPresentation = await existingPresentation.update(req.body);

    res.status(200).json(updatedPresentation);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:presentationId?", auth, async (req, res) => {
  try {
    const { presentationId } = req.params;
    if (!presentationId) {
      return res.status(400).json({
        message:
          "Необходимо указать идентификатор презентации (presentationId)."
      });
    }

    const deletedPresentation = await Meeting.findByPk(presentationId);

    if (!deletedPresentation) {
      return res.status(404).json({
        message: "Презентация не найдена."
      });
    }

    await deletedPresentation.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
