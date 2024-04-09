import express from "express";
import Company from "../models/company/Company.js";
import lic from "../middleware/license-account-type.middleware.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import Object from "../models/Object.js";
import Contact from "../models/contact/Contact.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, lic, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const companies = await Company.findAll();

    return res.status(200).send(companies);
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
    const contacts = data.contacts; // Предполагается, что данные о контактах передаются в теле запроса
    const objects = data.objects; // Предполагается, что данные об объектах передаются в теле запроса

    const newCompany = await Company.create({
      ...req.body,
      userId
    });
    const newCompanyId = newCompany._id;

    // Обновляем у контактов добавленную новую компанию
    const contactsToUpdate = await Contact.findAll({
      where: {
        // Проверяем, есть ли contactId из contacts в массиве контактов
        _id: contacts.map((cont) => cont.contact)
      }
    });

    for (const contact of contactsToUpdate) {
      let companies = contact.dataValues.companies || [];

      // Проверяем, есть ли уже такая компания у контакта
      const foundCompanyIndex = companies.findIndex(
        (company) => company.company === newCompanyId
      );

      if (foundCompanyIndex === -1) {
        // Если компания не найдена, добавляем новую компанию в массив
        companies.push({ company: newCompanyId });
      }

      // Сохраняем обновление для данного контакта в базе данных
      await Contact.update({ companies }, { where: { _id: contact._id } });
    }

    // Обновляем у объектов добавленную новую компанию
    const objectsToUpdate = await Object.findAll({
      where: {
        // Проверяем, есть ли objectId из objects в массиве объектов
        _id: objects.map((obj) => obj.object)
      }
    });

    for (const object of objectsToUpdate) {
      let companies = object.dataValues.companies || [];

      // Проверяем, есть ли уже такая компания у объекта
      const foundCompanyIndex = companies.findIndex(
        (company) => company.company === newCompanyId
      );

      if (foundCompanyIndex === -1) {
        // Если компания не найдена, добавляем новую компанию в массив
        companies.push({ company: newCompanyId });
      }

      // Сохраняем обновление для данного объекта в базе данных
      await Object.update({ companies }, { where: { _id: object._id } });
    }

    // Получаем обновленный список контактов после обновления
    const updatedContacts = await Contact.findAll({
      where: {
        _id: contactsToUpdate.map((cont) => cont._id)
      }
    });

    // Получаем обновленный список объектов после обновления
    const updatedObjects = await Object.findAll({
      where: {
        _id: objectsToUpdate.map((obj) => obj._id)
      }
    });

    res.status(201).json({
      newCompany,
      updatedContacts,
      updatedObjects
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:companyId?/edit", auth, lic, async (req, res) => {
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

    //// РАБОТАЕМ С УДАЛЕННЫМИ И ДОБАВЛЕННЫМИ В КОМПАНИЮ КОНТАКТАМИ ///////
    const previousContacts = req.body.previousContacts;
    const removedContacts = req.body.removedContacts;
    const addedContacts = req.body.addedContacts;
    const removedContactIds = removedContacts.map((contact) => contact.contact);

    if (!previousContacts || !removedContacts || !addedContacts) {
      const updatedContact = await Contact.update(newData, {
        where: { _id: companyId }
      });
      return res.send(updatedContact);
    }

    // Находим все контакты, которые есть в массиве removedContactIds
    const contactsRemovedContacts = await Contact.findAll({
      where: {
        _id: removedContactIds
      }
    });

    // Получаем связанные контакты для обновления
    const contactsToUpdate = await Contact.findAll({
      where: {
        // Проверяем, есть ли контакты, которые были добавлены
        _id: addedContacts.map((cont) => cont.contact)
      }
    });

    // Обновляем список компаний у каждого контакта
    for (const contact of contactsToUpdate) {
      let companies = contact.dataValues.companies || [];

      // Проверяем, есть ли уже такая компания у контакта
      const foundCompanyIndex = companies.findIndex(
        (company) => company.company === companyId
      );

      if (foundCompanyIndex === -1) {
        // Если компания не найдена, добавляем новую компанию в массив
        companies.push({ company: companyId });
      }

      contact.companies = companies;

      // Сохраняем обновление для данного контакта
      await Contact.update({ companies }, { where: { _id: contact._id } });
    }

    // Удаление компании из списков компаний в удаленных контакта
    for (const contact of contactsRemovedContacts) {
      // Фильтрация массива компаний каждой объекты
      const updatedCompanies = contact.companies.filter(
        (comp) => comp.company !== companyId
      );

      // Обновляем компанию с новым списком компаний
      await contact.update({ companies: updatedCompanies });
    }

    const updatedContacts = await Contact.findAll({
      where: {
        _id: contactsToUpdate.map((cont) => cont._id) // Используйте свойство _id для поиска контактов
      }
    });

    // Добавляем в обновленные контакты добавленные компании
    addedContacts.forEach((addedContact) => {
      const foundContact = updatedContacts.find(
        (contact) => contact._id === addedContact.contact
      );
      if (foundContact) updatedContacts.push(foundContact);
    });

    const removedContactsList = await Contact.findAll({
      where: {
        _id: removedContacts.map((contact) => contact.contact)
      }
    });

    // Добавляем удаленную компанию, если она была удалена из updatedContacts
    removedContactsList.forEach((removedContact) => {
      const foundContact = updatedContacts.find(
        (contact) => contact._id === removedContact.contact
      );
      if (!foundContact) {
        updatedContacts.push(removedContact);
      }
    });

    const updatedContactsSet = new Set();
    const uniqueUpdatedContacts = [];

    // Фильтруем контакты и добавляем уникальные контакты в массив uniqueUpdatedContacts
    updatedContacts.forEach((cont) => {
      if (!updatedContactsSet.has(cont._id)) {
        uniqueUpdatedContacts.push(cont);
        updatedContactsSet.add(cont._id);
      }
    });

    res.status(200).json({
      updatedObjects: uniqueUpdatedObjects,
      updatedContacts: uniqueUpdatedContacts,
      previousObjects
    });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:companyId?", auth, lic, async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор компании (companyId)."
      });
    }

    const deletedCompany = await Company.findByPk(companyId);

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
