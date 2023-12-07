import multer from "multer";
import fs from "fs-extra"; // Use fs-extra for additional file system methods
import { extname } from "path";
import Company from "../models/Company.js";

const checkFileTypeMiddleware = (req, res, next) => {

  let userFolderPath;

  const storage = multer.diskStorage({
    destination: async (req, _, cb) => {
      try {
        const userId = req.user._id;
        const company = await Company.findOne({
          $or: [{ managers: userId }, { curators: userId }],
        });

        if (!company) {
          throw new Error("Company not found");
        }

        const companyId = company._id;

        const companyFolderPath = `uploads/${companyId}`;
        const avatarsFolderPath = `${companyFolderPath}/avatars`;
        userFolderPath = `${avatarsFolderPath}/${userId}`;

        await fs.emptyDir(userFolderPath);

        cb(null, userFolderPath);
      } catch (error) {
        cb(error);
      }
    },
    filename: async (req, file, cb) => {
      try {
        const fileExtension = extname(file.originalname);
        const fileName = `ava${fileExtension}`;

        cb(null, fileName);
      } catch (error) {
        cb(error);
      }
    },
  });

  const types = ["image/png", "image/jpeg", ["image/jpg"]];

  const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Неверный тип файла! Выберите только jpg или png"));
    }
  };
  const upload = multer({ storage, fileFilter });
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      if (err.message === "Неверный тип файла! Выберите только jpg или png") {
        return res.status(400).json({ message: err.message });
      }

      return res.status(500).json({
        message: err.message || "На сервере произошла ошибка, попробуйте позже",
      });
    }

    next();
  });
};

export default checkFileTypeMiddleware;
