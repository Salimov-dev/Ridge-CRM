import express from "express";
import multer from "multer";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import fs from "fs";

const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: async (req, __, cb) => {
    const userId = req.user._id;
    const company = await Company.findOne({
      $or: [{ managers: userId }, { curators: userId }],
    });
    const companyId = company._id;

    cb(null, `uploads/${companyId}/avatars`);
  },
  filename: async (req, file, cb) => {
    try {
      const userId = req.user._id;
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${userId}.${fileExtension}`;

      cb(null, fileName);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage });

router.post("/", auth, upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.user._id;
    const company = await Company.findOne({
      $or: [{ managers: userId }, { curators: userId }],
    });
    const companyId = company._id;

    // const avatarFiles = await fs.readdir(avatarFolderPath);
    // console.log("avatarFiles", avatarFiles);
    // if (avatarFiles.length > 0) {
    //   // Если есть файлы в папке, удаляем их
    //   await Promise.all(avatarFiles.map(file => fs.unlink(`${avatarFolderPath}/${file}`)));
    // }

    res.json({
      url: `/uploads/${companyId}/avatars/${userId}.${req.file.originalname
        .split(".")
        .pop()}`,
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
