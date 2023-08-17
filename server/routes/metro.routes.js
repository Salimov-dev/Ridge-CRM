import express from "express"
import Metro from "../models/Metro.js"

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    console.log("res", res);
    const list = await Metro.find();
    console.log("list Metro", list);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

export default router;
