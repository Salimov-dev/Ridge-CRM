import express from "express";
import { Op } from "sequelize";
import Object from "../models/Object.js";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import Company from "../models/company/Company.js";
import Contact from "../models/contact/Contact.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;

    // если пользователь Менеджер
    if (userRole.includes(roleManager)) {
      const objects = await Object.findAll({ where: { userId } });
      return res.status(200).send(objects);
    }

    // если пользователь Наблюдатель
    if (userRole.includes(roleObserver)) {
      const objects = await Object.findAll({ where: { userId } });
      const curatorId = user.curatorId;
      const curatorUsers = await User.findAll({ where: { curatorId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersObjects = await Object.findAll({
        where: { userId: curatorManagerIds }
      });

      // Удалить объекты, которые уже принадлежат пользователю
      const filteredCuratorManagersObjects = curatorManagersObjects.filter(
        (obj) => obj.userId !== userId
      );

      // Добавить объекты, где userId === curatorId
      const curatorObjects = await Object.findAll({
        where: { userId: curatorId }
      });

      const usersObjects = [
        ...objects,
        ...filteredCuratorManagersObjects.map((obj) => obj.dataValues),
        ...curatorObjects.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(usersObjects);
    }

    // если пользователь Куратор
    if (userRole.includes(roleCurator)) {
      const objects = await Object.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersObjects = await Object.findAll({
        where: { userId: curatorManagerIds }
      });

      const usersObjects = [
        ...objects,
        ...curatorManagersObjects.map((obj) => obj.dataValues)
      ];

      return res.status(200).send(usersObjects);
    }

    return res.status(200).send([]);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { companies, contacts } = req.body;

    const newObject = await Object.create({
      ...req.body,
      userId
    });

    const objectId = newObject._id;

    // Получаем связанные компании для обновления
    const companiesToUpdate = await Company.findAll({
      where: {
        // Проверяем, есть ли companyId из contacts в массиве компаний
        _id: companies.map((comp) => comp.company)
      }
    });

    // Получаем связанные контакты для обновления
    const contactsToUpdate = await Contact.findAll({
      where: {
        // Проверяем, есть ли contactId из contacts в массиве компаний
        _id: contacts.map((cont) => cont.contact)
      }
    });

    // Собираем все обновления в массив
    let companyUpdates = [];
    let contactUpdates = [];

    // Обновляем список объектов в каждой компании
    for (const company of companiesToUpdate) {
      let objects = company.dataValues.objects || [];

      // Проверяем, есть ли уже такой объект у компании
      const foundObjectIndex = objects.findIndex(
        (obj) => obj.object === objectId
      );

      if (foundObjectIndex === -1) {
        // Если объект не найден, добавляем новый объект в массив
        objects.push({ object: objectId });
      }

      // Сохраняем обновление для данной компании в массив
      companyUpdates.push(
        Company.update({ objects }, { where: { _id: company._id } })
      );
    }

    // Обновляем список объектов в каждом контакте
    for (const contact of contactsToUpdate) {
      let objects = contact.dataValues.objects || [];

      // Проверяем, есть ли уже такой объект у объекта
      const foundObjectIndex = objects.findIndex(
        (obj) => obj.object === objectId
      );

      if (foundObjectIndex === -1) {
        // Если объект не найден, добавляем новый объект в массив
        objects.push({ object: objectId });
      }

      // Сохраняем обновление для данного объекта в массив
      contactUpdates.push(
        Contact.update({ objects }, { where: { _id: contact._id } })
      );
    }

    // Выполняем все обновления компаний и контактов одновременно
    await Promise.all(companyUpdates);
    await Promise.all(contactUpdates);

    // Получаем обновленный список компаний
    const updatedCompanies = await Company.findAll({
      where: {
        _id: companies.map((comp) => comp.company)
      }
    });

    // Получаем обновленный список контактов
    const updatedContacts = await Contact.findAll({
      where: {
        _id: contacts.map((cont) => cont.contact)
      }
    });

    res.status(201).json({ newObject, updatedCompanies, updatedContacts });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже"
    });
  }
});

router.get("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId)."
      });
    }

    const editedObject = await Object.findByPk(objectId);

    if (!editedObject) {
      return res.status(404).json({
        message: "Объект не найден."
      });
    }

    res.status(200).json(editedObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:objectId?/edit", auth, async (req, res) => {
  try {
    const { objectId } = req.params;
    const { newData } = req.body;
    const companies = newData.companies;

    if (
      !req.body.previousCompanies ||
      !req.body.removedCompanies ||
      !req.body.addedCompanies
    ) {
      const updatedObject = await Object.update(newData, {
        where: { _id: objectId }
      });
      return res.send(updatedObject);
    }

    const previousCompanies = req.body.previousCompanies;
    const removedCompanies = req.body.removedCompanies;
    const addedCompanies = req.body.addedCompanies;
    const removedCompanyIds = removedCompanies.map(
      (company) => company.company
    );

    // Находим все компании, которые есть в массиве removedCompanyIds
    const companiesRemovedCompanies = await Company.findAll({
      where: {
        _id: removedCompanyIds
      }
    });

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId)."
      });
    }

    const existingObject = await Object.findByPk(objectId);

    if (!existingObject) {
      return res.status(404).json({
        message: "Объект не найден."
      });
    }

    // Получаем связанные компании для обновления
    const companiesToUpdate = await Company.findAll({
      where: {
        // Проверяем, есть ли companyId из contacts в массиве компаний
        _id: companies.map((comp) => comp.company)
      }
    });

    // Обновляем список объектов в каждой компании
    for (const company of companiesToUpdate) {
      let objects = company.dataValues.objects || [];

      // Проверяем, есть ли уже такой объект у компании
      const foundObjectIndex = objects.findIndex(
        (obj) => obj.object === objectId
      );

      if (foundObjectIndex === -1) {
        // Если объект не найден, добавляем новый объект в массив
        objects.push({ object: objectId });
      }

      // Сохраняем обновление для данной компании в массив
      await Company.update({ objects }, { where: { _id: company._id } });
    }

    // Удаление объекта из списков объектов в удаленных компаниях
    for (const company of companiesRemovedCompanies) {
      // Фильтрация массива объектов каждой компании
      const updatedObjects = company.objects.filter(
        (obj) => obj.object !== objectId
      );

      // Обновляем компанию с новым списком объектов
      await company.update({ objects: updatedObjects });
    }

    // Обновляем объект
    await existingObject.update(newData);

    // Получаем обновленный список компаний после обновления
    const updatedCompanies = await Company.findAll({
      where: {
        _id: companiesToUpdate.map((company) => company._id)
      }
    });

    // Добавляем в обновленные компании добавленные компании
    addedCompanies.forEach((addedCompany) => {
      const foundCompany = updatedCompanies.find(
        (company) => company._id === addedCompany.company
      );
      if (foundCompany) updatedCompanies.push(foundCompany);
    });

    const removedCompaniesList = await Company.findAll({
      where: {
        _id: removedCompanies.map((company) => company.company)
      }
    });

    // Добавляем удаленную компанию, если она была удалена из updatedCompanies
    removedCompaniesList.forEach((removedCompany) => {
      const foundCompany = updatedCompanies.find(
        (company) => company._id === removedCompany.company
      );
      if (!foundCompany) {
        updatedCompanies.push(removedCompany);
      }
    });

    res.status(200).json({
      updatedCompanies,
      previousCompanies
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/update-multiple", auth, async (req, res) => {
  try {
    const { objectIds, userId } = req.body;

    if (!objectIds || !Array.isArray(objectIds) || objectIds.length === 0) {
      return res.status(400).json({
        message:
          "Необходимо предоставить действительные идентификаторы объектов (objectIds)."
      });
    }

    // Обновите объекты с соответствующими ID
    const toConnectObjectStatus = "64bvcpas34kszc21d2344876"; // статус для объекта "Связаться"
    await Object.update(
      { userId, status: toConnectObjectStatus }, // параметры обновления
      { where: { _id: { [Op.in]: objectIds } } } // условия выборки
    );

    // Найти и вернуть обновленные объекты
    const updatedObjects = await Object.findAll({
      where: { _id: { [Op.in]: objectIds } }
    });

    res.status(200).json(updatedObjects);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:objectId?", auth, async (req, res) => {
  try {
    const { objectId } = req.params;

    if (!objectId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор объекта (objectId)."
      });
    }

    const deletedObject = await Object.findByPk(objectId);

    if (!deletedObject) {
      return res.status(404).json({
        message: "Объект не найден."
      });
    }

    await deletedObject.destroy();

    // Получаем связанные компании для обновления
    const companiesToUpdate = await Company.findAll({
      where: {
        // Проверяем, есть ли companyId из contacts в массиве компаний
        _id: companies.map((comp) => comp.company)
      }
    });

    // Собираем все обновления в массив
    let companyUpdates = [];

    // Обновляем список объектов в каждой компании
    for (const company of companiesToUpdate) {
      let objects = company.dataValues.objects || [];

      // Проверяем, есть ли уже такой объект у компании
      const foundObjectIndex = objects.findIndex(
        (obj) => obj.object === objectId
      );

      if (foundObjectIndex === -1) {
        // Если объект не найден, добавляем новый объект в массив
        objects.push({ object: objectId });
      }

      // Сохраняем обновление для данной компании в массив
      companyUpdates.push(
        Company.update({ objects }, { where: { _id: company._id } })
      );
    }

    // Выполняем все обновления компаний одновременно
    await Promise.all(companyUpdates);

    // Получаем обновленный список компаний
    const updatedCompanies = await Company.findAll({
      where: {
        _id: companies.map((comp) => comp.company)
      }
    });

    res.status(201).json(updatedCompanies);

    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
