import express from "express";
import Company from "../models/Company.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;
    const companies = await Company.findAll();

    // if (userRole.includes(roleManager)) {
    //   const companies = await Company.findAll({ where: { userId } });
    //   return res.status(200).send(companies);
    // }

    // if (userRole.includes(roleCurator) || userRole.includes(roleObserver)) {
    //   const companies = await Company.findAll({ where: { userId } });

    //   const curatorUsers = await User.findAll({ where: { curatorId: userId } });
    //   const curatorManagerIds = curatorUsers.map((user) => user._id);

    //   const curatorManagerscompanies = await Company.findAll({
    //     where: { userId: curatorManagerIds }
    //   });

    //   const userscompanies = [
    //     ...companies,
    //     ...curatorManagerscompanies.map((meet) => meet.dataValues)
    //   ];

    //   return res.status(200).send(userscompanies);
    // }

    // return res.status(200).send([]);
    return res.status(200).send(companies);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const newCompany = await Company.create({
      ...req.body,
      userId
    });

    res.status(201).send(newCompany);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:companyId?/edit", auth, async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор компании (companyId)."
      });
    }

    const existingCompany = await Company.findByPk(companyId);

    if (!existingCompany) {
      return res.status(404).json({
        message: "Компания не найдена."
      });
    }

    const updatedCompany = await existingCompany.update(req.body);

    res.status(200).json(updatedCompany);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:companyId?", auth, async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор компании (companyId)."
      });
    }

    const deletedCompany = await company.findByPk(companyId);

    if (!deletedCompany) {
      return res.status(404).json({
        message: "Компания не найдена."
      });
    }

    await deletedCompany.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
