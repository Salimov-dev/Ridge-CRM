import express from "express";
import Contact from "../models/contact/Contact.js";
import auth from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { roleCurator, roleManager, roleObserver } from "../utils/user-roles.js";
import CompanyContact from "../models/company/CompanyContact.js";
import Company from "../models/company/Company.js";

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

// router.post("/create", auth, async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const newContact = await Contact.create({
//       ...req.body,
//       userId
//     });

//     // Обновляем список контактов в компании
//     const companyId = req.body.companyId; // Предположим, что у контакта есть companyId
//     if (companyId) {
//       const company = await Company.findByPk(companyId);
//       if (company) {
//         // Добавляем новый контакт в список контактов компании
//         await CompanyContact.create({
//           companyId: company._id,
//           contactId: newContact._id
//         });

//         // Отправляем успешный ответ
//         res.status(201).send(newContact);
//         return;
//       }
//     }

//     // Если компания не найдена или у контакта нет companyId
//     res.status(400).json({
//       message:
//         "Невозможно добавить контакт в компанию. Укажите корректный companyId."
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({
//       message: "На сервере произошла ошибка, попробуйте позже"
//     });
//   }
// });

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
    const userId = req.user._id;
    const { contactId } = req.params;

    // Находим контакт
    const existingContact = await Contact.findOne({
      where: {
        _id: contactId,
        userId: userId
      }
    });

    // Если контакт найден и принадлежит текущему пользователю, обновляем его
    if (existingContact) {
      await existingContact.update({
        ...req.body
      });

      // Получаем связанные компании для обновления
      const companiesToUpdate = await Company.findAll({
        where: {
          // Проверяем, есть ли companyId из contacts в массиве компаний
          _id: existingContact.companies.map((comp) => comp.company)
        }
      });

      // Собираем все обновления в массив
      const companyUpdates = [];

      // Обновляем список контактов в каждой компании
      for (const company of companiesToUpdate) {
        let contacts = company.dataValues.contacts || [];

        // Проверяем, есть ли уже такой контакт у компании
        const foundContactIndex = contacts.findIndex(
          (contact) => contact.contact === contactId
        );

        if (foundContactIndex === -1) {
          // Если контакт не найден, добавляем новый контакт в массив
          contacts.push({ contact: contactId });
        }

        // Сохраняем обновление для данной компании в массив
        companyUpdates.push({
          id: company._id,
          contacts: contacts
        });
      }

      // Выполняем все обновления компаний одновременно
      await Promise.all(
        companyUpdates.map(async (update) => {
          await Company.update(
            { contacts: update.contacts },
            { where: { _id: update.id } }
          );
        })
      );

      res.status(200).send(existingContact);
    } else {
      res.status(404).json({
        message: "Контакт не найден или у вас нет прав на его обновление"
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

// router.patch("/:contactId?/edit", auth, async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     if (!contactId) {
//       return res.status(400).json({
//         message: "Необходимо указать идентификатор контакта (contactId)."
//       });
//     }

//     const existingContact = await Contact.findByPk(contactId);

//     if (!existingContact) {
//       return res.status(404).json({
//         message: "Контакт не найден"
//       });
//     }

//     const updatedContact = await existingContact.update(req.body);

//     res.status(200).json(updatedContact);
//   } catch (e) {
//     res.status(500).json({
//       message: "На сервере произошла ошибка, попробуйте позже"
//     });
//   }
// });

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
