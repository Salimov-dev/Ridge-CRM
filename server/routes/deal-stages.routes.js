import express from "express"
import DealStage from "../models/Deal-stage.js"

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await DealStage.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
