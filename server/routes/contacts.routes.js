import express from "express";
import Contact from "../models/contact/Contact.js";
import lic from "../middleware/license-account-type.middleware.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import Object from "../models/Object.js";
import Company from "../models/company/Company.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const userRole = user.role;

    // если пользователь Менеджер
    if (userRole.includes(roleManager)) {
      const contacts = await Contact.findAll({ where: { userId } });
      return res.status(200).send(contacts);
    }

    // если пользователь Наблюдатель
    if (userRole.includes(roleObserver)) {
      const contacts = await Contact.findAll({ where: { userId } });
      const curatorId = user.curatorId;
      const curatorUsers = await User.findAll({ where: { curatorId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersContacts = await Contact.findAll({
        where: { userId: curatorManagerIds }
      });

      // Удалить объекты, которые уже принадлежат пользователю
      const filteredCuratorManagersContacts = curatorManagersContacts.filter(
        (obj) => obj.userId !== userId
      );

      // Добавить объекты, где userId === curatorId
      const curatorContacts = await Contact.findAll({
        where: { userId: curatorId }
      });

      const usersContacts = [
        ...contacts,
        ...filteredCuratorManagersContacts.map((cont) => cont.dataValues),
        ...curatorContacts.map((cont) => cont.dataValues)
      ];

      return res.status(200).send(usersContacts);
    }

    // если пользователь Куратор
    if (userRole.includes(roleCurator)) {
      const objects = await Contact.findAll({ where: { userId } });

      const curatorUsers = await User.findAll({ where: { curatorId: userId } });
      const curatorManagerIds = curatorUsers.map((user) => user._id);

      const curatorManagersObjects = await Contact.findAll({
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

router.post("/create", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;

    const data = req.body;
    const objects = data.objects;
    const companies = data.companies;

    const newContact = await Contact.create({
      ...req.body,
      userId
    });
    const newContactId = newContact._id;

    // обновляем у объектов добавленный новый контакт
    const objectsToUpdate = await Object.findAll({
      where: {
        // Проверяем, есть ли objectId из objects в массиве контактов
        _id: objects.map((obj) => obj.object)
      }
    });

    // Обновляем у компаний добавленный новый контакт
    const companiesToUpdate = await Company.findAll({
      where: {
        // Проверяем, есть ли contactId из companies в массиве контактов
        _id: companies.map((comp) => comp.company)
      }
    });

    for (const object of objectsToUpdate) {
      let contacts = object.dataValues.contacts || [];

      // Проверяем, есть ли уже такая компания у объекта
      const foundContactIndex = contacts.findIndex(
        (contact) => contact.contact === newContactId
      );

      if (foundContactIndex === -1) {
        // Если компания не найдена, добавляем новую контакт в массив
        contacts.push({ contact: newContactId });
      }

      // Сохраняем обновление для данной объекты в массив
      await Object.update({ contacts }, { where: { _id: object._id } });
    }

    for (const company of companiesToUpdate) {
      let contacts = company.dataValues.contacts || [];

      // Проверяем, есть ли уже такой контакт у компании
      const foundContactIndex = contacts.findIndex(
        (contact) => contact.contact === newContactId
      );

      if (foundContactIndex === -1) {
        // Если контакт не найден, добавляем новый контакт в массив
        contacts.push({ contact: newContactId });
      }

      // Сохраняем обновление для данной компании в базе данных
      await Company.update({ contacts }, { where: { _id: company._id } });
    }

    // Получаем обновленный список объектов после обновления
    const updatedObjects = await Object.findAll({
      where: {
        _id: objectsToUpdate.map((obj) => obj._id)
      }
    });

    // Получаем обновленный список компаний после обновления
    const updatedCompanies = await Company.findAll({
      where: {
        _id: companiesToUpdate.map((comp) => comp._id)
      }
    });

    res.status(201).json({
      newContact,
      updatedObjects,
      updatedCompanies
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:contactId?/edit", auth, lic, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { newData } = req.body;
    const objects = newData.objects;
    const companies = newData.companies;

    const previousObjects = req.body.previousObjects;
    const removedObjects = req.body.removedObjects;
    const addedObjects = req.body.addedObjects;

    const previousCompanies = req.body.previousCompanies;
    const removedCompanies = req.body.removedCompanies;
    const addedCompanies = req.body.addedCompanies;

    const removedObjectIds = removedObjects.map((object) => object.object);
    const removedCompaniesIds = removedCompanies.map((comp) => comp.company);

    if (
      !previousObjects ||
      !removedObjects ||
      !addedObjects ||
      !previousCompanies ||
      !removedCompanies ||
      !addedCompanies
    ) {
      const updatedContact = await Contact.update(newData, {
        where: { _id: contactId }
      });
      return res.send(updatedContact);
    }

    // Обновляем у объектов
    const objectsToUpdate = await Object.findAll({
      where: {
        _id: objects.map((obj) => obj.object)
      }
    });

    for (const object of objectsToUpdate) {
      let contacts = object.dataValues.contacts || [];
      const foundContactIndex = contacts.findIndex(
        (contact) => contact.contact === contactId
      );

      if (foundContactIndex === -1) {
        contacts.push({ contact: contactId });
      }

      await Object.update({ contacts }, { where: { _id: object._id } });
    }

    // Обновляем у компаний
    const companiesToUpdate = await Company.findAll({
      where: {
        _id: companies.map((comp) => comp.company)
      }
    });

    for (const company of companiesToUpdate) {
      let contacts = company.dataValues.contacts || [];
      const foundContactIndex = contacts.findIndex(
        (contact) => contact.contact === contactId
      );

      if (foundContactIndex === -1) {
        contacts.push({ contact: contactId });
      }

      await Company.update({ contacts }, { where: { _id: company._id } });
    }

    // Обновляем контакт
    await Contact.update(newData, { where: { _id: contactId } });

    // Получаем обновленные списки объектов и компаний после обновления
    const updatedObjects = await Object.findAll({
      where: {
        _id: objectsToUpdate.map((obj) => obj._id)
      }
    });

    const updatedCompanies = await Company.findAll({
      where: {
        _id: companiesToUpdate.map((comp) => comp._id)
      }
    });

    // Находим все объекты, которые есть в массиве removedObjectIds
    const objectsRemovedObjects = await Object.findAll({
      where: {
        _id: removedObjectIds
      }
    });

    const companiesRemovedCompanies = await Company.findAll({
      where: {
        _id: removedCompaniesIds
      }
    });

    // Удаление объектов из списков контактов в удаленных объектах
    for (const object of objectsRemovedObjects) {
      // Фильтрация массива контактов каждого объекта
      const updatedContacts = object.contacts.filter(
        (cont) => cont.contact !== contactId
      );

      // Обновляем объект с новым списком контактов
      await object.update({ contacts: updatedContacts });
    }

    // Удаление компаний из списков контактов в удаленных компаниях
    for (const company of companiesRemovedCompanies) {
      // Фильтрация массива контактов каждой компании
      const updatedContacts = company.contacts.filter(
        (cont) => cont.contact !== contactId
      );

      // Обновляем компанию с новым списком контактов
      await company.update({ contacts: updatedContacts });
    }

    res.status(200).json({
      updatedObjects,
      objectsRemovedObjects,
      updatedCompanies,
      companiesRemovedCompanies,
      previousObjects
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:contactId?", auth, lic, async (req, res) => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор контакта (contactId)."
      });
    }

    const deletedContact = await Contact.findByPk(contactId);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Контакт не найдена"
      });
    }

    await deletedContact.destroy();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

export default router;
