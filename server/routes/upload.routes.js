import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import checkFileTypeMiddleware from "../middleware/check-file-type.middleware.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router({ mergeParams: true });

router.get("/avatar/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const company = await Company.findOne({
      $or: [{ managers: userId }, { curators: userId }],
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyId = company._id.toString();
    const currentModuleUrl = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleUrl);
    const currentModuleDir = dirname(currentModulePath);

    const avatarFolderPath = path.join(
      currentModuleDir,
      `../../server/uploads/${companyId}/avatars/${userId}`
    );

    let files;
    try {
      files = await fs.readdir(avatarFolderPath);
    } catch (err) {
      if (err.code === "ENOENT") {
        return res.send(null);
      } else {
        throw err;
      }
    }

    if (files.length === 0) {
      return res
        .status(404)
        .json({ data: null, message: "No avatar files found" });
    }

    const fileExtension = path.extname(files[0]).toLowerCase();

    if (fileExtension === ".png") {
      const avatarPathPNG = path.join(avatarFolderPath, "ava.png");
      res.sendFile(avatarPathPNG);
    } else if (fileExtension === ".jpg") {
      const avatarPathJPG = path.join(avatarFolderPath, "ava.jpg");
      res.sendFile(avatarPathJPG);
    } else if (fileExtension === ".jpeg") {
      const avatarPathJPEG = path.join(avatarFolderPath, "ava.jpeg");
      res.sendFile(avatarPathJPEG);
    } else {
      return res.status(404).json({ message: "Invalid avatar file format" });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message || "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/avatar", auth, checkFileTypeMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const company = await Company.findOne({
      $or: [{ managers: userId }, { curators: userId }],
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyId = company._id;

    res.json({
      url: `/uploads/${companyId}/avatars/${userId}/${req.file.filename}`,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message || "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

router.post("/avatar/update/:userId", auth, async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const userId = req.user._id;
    const company = await Company.findOne({
      $or: [{ managers: userId }, { curators: userId }],
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    console.log("start");

    const preview = req.body.preview;
    console.log("preview", preview);
    const stringParse = JSON.stringify(preview);

    // console.log("stringParse", stringParse);
    const stringWithoutSpaces = preview.replace(/\s/g, "");

    // console.log("stringWithoutSpaces", stringWithoutSpaces);
    console.log("typeof preview", typeof preview);
    console.log("typeof stringParse", typeof stringParse);

    const companyId = company._id;
    const currentModuleUrl = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleUrl);
    const currentModuleDir = dirname(currentModulePath);
    const avatarFolderPath = path.join(
      currentModuleDir,
      `../../server/uploads/${companyId}/avatars/${userId}`
    );
    await fs.mkdir(avatarFolderPath, { recursive: true });

    const filename = `ava.png`;
    const avatarPath = path.join(avatarFolderPath, filename);
    const imageBuffer = Buffer.from(preview, "base64");
    console.log("Decoded imageBuffer:", imageBuffer);

    await fs.writeFile(avatarPath, imageBuffer);

    res.status(200).json({ message: "Avatar updated successfully" });
  } catch (e) {
    res.status(500).json({
      message: e.message || "На сервере произошла ошибка, попробуйте позже",
    });
  }
});

export default router;
