import express from "express";
import Company from "../models/company/Company.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import Object from "../models/Object.js";

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
    const { newData } = req.body;
    const objects = newData.objects;

    const previousObjects = req.body.previousObjects;
    const removedObjects = req.body.removedObjects;
    const addedObjects = req.body.addedObjects;
    const removedObjectIds = removedObjects.map((object) => object.object);

    if (!previousObjects || !removedObjects || !addedObjects) {
      const updatedCompany = await Company.update(newData, {
        where: { _id: companyId }
      });
      return res.send(updatedCompany);
    }

    // Находим все объекты, которые есть в массиве removedObjectIds
    const objectsRemovedObjects = await Object.findAll({
      where: {
        _id: removedObjectIds
      }
    });

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

    // Получаем связанные объекты для обновления
    const objectsToUpdate = await Object.findAll({
      where: {
        // Проверяем, есть ли objectId из objects в массиве компаний
        _id: objects.map((obj) => obj.object)
      }
    });

    // Обновляем список компаний у каждого объекта
    for (const object of objectsToUpdate) {
      let companies = object.dataValues.companies || [];

      // Проверяем, есть ли уже такая компания у объекта
      const foundCompanyIndex = companies.findIndex(
        (company) => company.company === companyId
      );

      if (foundCompanyIndex === -1) {
        // Если компания не найдена, добавляем новую компанию в массив
        companies.push({ company: companyId });
      }

      // Сохраняем обновление для данной объекты в массив
      await Object.update({ companies }, { where: { _id: object._id } });
    }

    // Удаление компании из списков компаний в удаленных объектах
    for (const object of objectsRemovedObjects) {
      // Фильтрация массива компаний каждой объекты
      const updatedCompanies = object.companies.filter(
        (comp) => comp.company !== companyId
      );

      // Обновляем компанию с новым списком компаний
      await object.update({ companies: updatedCompanies });
    }

    // Обновляем компанию
    await existingCompany.update(newData);

    // Получаем обновленный список компаний после обновления
    const updatedObjects = await Object.findAll({
      where: {
        _id: objectsToUpdate.map((obj) => obj._id)
      }
    });

    // Добавляем в обновленные компании добавленные объекты
    addedObjects.forEach((addedObject) => {
      const foundObject = updatedObjects.find(
        (object) => object._id === addedObject.object
      );
      if (foundObject) updatedObjects.push(foundObject);
    });

    const removedObjectsList = await Object.findAll({
      where: {
        _id: removedObjects.map((object) => object.object)
      }
    });

    // Добавляем удаленную компанию, если она была удалена из updatedObjects
    removedObjectsList.forEach((removedObject) => {
      const foundObject = updatedObjects.find(
        (object) => object._id === removedObject.object
      );
      if (!foundObject) {
        updatedObjects.push(removedObject);
      }
    });

    const updatedObjectsSet = new Set();
    const uniqueUpdatedObjects = [];

    // Фильтруем объекты и добавляем уникальные объекты в массив uniqueUpdatedObjects
    updatedObjects.forEach((obj) => {
      if (!updatedObjectsSet.has(obj._id)) {
        uniqueUpdatedObjects.push(obj);
        updatedObjectsSet.add(obj._id);
      }
    });

    res.status(200).json({
      updatedObjects: uniqueUpdatedObjects,
      previousObjects
    });
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
