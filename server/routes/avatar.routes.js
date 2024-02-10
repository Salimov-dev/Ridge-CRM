import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router({ mergeParams: true });

router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const currentModuleUrl = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleUrl);
    const currentModuleDir = dirname(currentModulePath);

    const avatarFolderPath = path.join(
      currentModuleDir,
      `../../server/uploads/avatars/${userId}`
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
    } else {
      return res.status(404).json({ message: "Invalid avatar file format" });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message || "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/update/:userId", auth, async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const userId = req.user._id;

    const preview = req.body.src;
    const currentModuleUrl = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleUrl);
    const currentModuleDir = dirname(currentModulePath);
    const avatarFolderPath = path.join(
      currentModuleDir,
      `../../server/uploads/avatars/${userId}`
    );

    await fs.mkdir(avatarFolderPath, { recursive: true });

    const filename = `ava.png`;
    const avatarPath = path.join(avatarFolderPath, filename);
    const imageBuffer = Buffer.from(preview, "base64");

    await fs.writeFile(avatarPath, imageBuffer);

    res.status(200).json({ message: "Avatar updated successfully" });
  } catch (e) {
    res.status(500).json({
      message: e.message || "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const currentModuleUrl = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleUrl);
    const currentModuleDir = dirname(currentModulePath);
    const avatarFolderPath = path.join(
      currentModuleDir,
      `../../server/uploads/avatars/${userId}`
    );

    try {
      // Check if the avatar folder exists
      await fs.access(avatarFolderPath);

      // Remove the avatar folder
      await fs.rmdir(avatarFolderPath, { recursive: true });

      res.status(200).json({ message: "Avatar deleted successfully" });
    } catch (err) {
      if (err.code === "ENOENT") {
        // If the avatar folder doesn't exist, consider it as already deleted
        return res.status(404).json({ message: "Avatar not found" });
      } else {
        throw err;
      }
    }
  } catch (e) {
    res.status(500).json({
      message: e.message || "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
