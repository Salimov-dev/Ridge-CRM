import express from "express";
import Contact from "../models/contact/Contact.js";
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
    const contacts = await Contact.findAll();
    // if (userRole.includes(roleManager)) {
    //   const Contacts = await Contact.findAll({ where: { userId } });
    //   return res.status(200).send(Contacts);
    // }

    // if (userRole.includes(roleCurator) || userRole.includes(roleObserver)) {
    //   const Contacts = await Contact.findAll({ where: { userId } });

    //   const curatorUsers = await User.findAll({ where: { curatorId: userId } });
    //   const curatorManagerIds = curatorUsers.map((user) => user._id);

    //   const curatorManagersContacts = await Contact.findAll({
    //     where: { userId: curatorManagerIds }
    //   });

    //   const usersContacts = [
    //     ...Contacts,
    //     ...curatorManagersContacts.map((meet) => meet.dataValues)
    //   ];

    //   return res.status(200).send(usersContacts);
    // }

    return res.status(200).send(contacts);
    // return res.status(200).send([]);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const newContact = await Contact.create({
      ...req.body,
      userId
    });

    res.status(201).send(newContact);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.patch("/:contactId?/edit", auth, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { newData } = req.body;
    const objects = newData.objects;

    const previousObjects = req.body.previousObjects;
    const removedObjects = req.body.removedObjects;
    const addedObjects = req.body.addedObjects;
    const removedObjectIds = removedObjects.map((object) => object.object);

    if (!previousObjects || !removedObjects || !addedObjects) {
      const updatedContact = await Contact.update(newData, {
        where: { _id: contactId }
      });
      return res.send(updatedContact);
    }

    // Находим все объекты, которые есть в массиве removedObjectIds
    const objectsRemovedObjects = await Object.findAll({
      where: {
        _id: removedObjectIds
      }
    });

    if (!contactId) {
      return res.status(400).json({
        message: "Необходимо указать идентификатор контакта (contactId)."
      });
    }

    // Находим контакт
    const existingContact = await Contact.findByPk(contactId);

    if (!existingContact) {
      return res.status(404).json({
        message: "Контакт не найдена."
      });
    }

    // Получаем связанные объекты для обновления
    const objectsToUpdate = await Object.findAll({
      where: {
        // Проверяем, есть ли objectId из objects в массиве контактов
        _id: objects.map((obj) => obj.object)
      }
    });

    // Обновляем список контактов у каждого объекта
    for (const object of objectsToUpdate) {
      let contacts = object.dataValues.contacts || [];

      // Проверяем, есть ли уже такая компания у объекта
      const foundContactIndex = contacts.findIndex(
        (contact) => contact.contact === contactId
      );

      if (foundContactIndex === -1) {
        // Если компания не найдена, добавляем новую контакт в массив
        contacts.push({ contact: contactId });
      }

      // Сохраняем обновление для данной объекты в массив
      await Object.update({ contacts }, { where: { _id: object._id } });
    }

    // Удаление контакты из списков контактов в удаленных объектах
    for (const object of objectsRemovedObjects) {
      // Фильтрация массива контактов каждого объекта
      const updatedContacts = object.contacts.filter(
        (cont) => cont.contact !== contactId
      );

      // Обновляем контакт с новым списком контактов
      await object.update({ contacts: updatedContacts });
    }

    // Обновляем контакт
    await existingContact.update(newData);

    // Получаем обновленный список контактов после обновления
    const updatedObjects = await Object.findAll({
      where: {
        _id: objectsToUpdate.map((obj) => obj._id)
      }
    });

    // Добавляем в обновленные контакты добавленные объекты
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

    // Добавляем удаленный контакт, если она была удалена из updatedObjects
    removedObjectsList.forEach((removedObject) => {
      const foundObject = updatedObjects.find(
        (object) => object._id === removedObject.object
      );
      if (!foundObject) {
        updatedObjects.push(removedObject);
      }
    });

    const updatedContactsSet = new Set();
    const uniqueUpdatedContacts = [];

    // Фильтруем объекты и добавляем уникальные объекты в массив uniqueUpdatedContacts
    updatedObjects.forEach((obj) => {
      if (!updatedContactsSet.has(obj._id)) {
        uniqueUpdatedContacts.push(obj);
        updatedContactsSet.add(obj._id);
      }
    });

    res.status(200).json({
      updatedObjects: uniqueUpdatedContacts,
      previousObjects
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.delete("/:contactId?", auth, async (req, res) => {
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
