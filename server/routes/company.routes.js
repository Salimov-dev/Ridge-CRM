import express from "express"
import Company from "../models/Company.js"
import auth from "../middleware/auth.middleware.js"

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await Company.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
