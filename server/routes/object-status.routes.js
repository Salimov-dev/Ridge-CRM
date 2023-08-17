import express from "express"
import ObjectStatus from "../models/Object-status.js"
import auth from "../middleware/auth.middleware.js"

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await ObjectStatus.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
