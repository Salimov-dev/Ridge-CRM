import { getContactsList } from "@store/contact/contact.store";
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";
import { useSelector } from "react-redux";

const useUpdateCompany = (data, company, watch) => {
  const objectsList = useSelector(getObjectsList());
  const contactsList = useSelector(getContactsList());
  const currentUserId = useSelector(getCurrentUserId());

  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  // передаем новые добавленные и удаленные объекты
  const newObjects = watch("objects");
  const previousObjects = company?.objects;
  const companyObjects = company?.objects;
  const removedObjects = !isCurrentUserRoleManager
    ? companyObjects?.filter(
        (cont) => !newObjects.some((item) => item.object === cont.object)
      )
    : [];
  const addedObjects = newObjects?.filter(
    (newObject) =>
      !companyObjects?.some((obj) => obj.object === newObject.object)
  );

  // передаем новые добавленные и удаленные контакты
  const newContacts = watch("contacts");
  const previousContacts = company?.contacts;
  const companyContacts = company?.contacts;
  const removedContacts = !isCurrentUserRoleManager
    ? companyContacts?.filter(
        (cont) => !newContacts.some((item) => item.contact === cont.contact)
      )
    : [];
  const addedContacts = newContacts?.filter(
    (newContact) =>
      !companyContacts?.some((cont) => cont.contact === newContact.contact)
  );

  // находим контакты, созданные другими пользователями
  const othertUsersContacts = company?.contacts?.filter((cont) => {
    const contact = contactsList?.find((elem) => elem._id === cont.contact);

    if (contact === undefined) {
      return cont;
    } else {
      return null;
    }
  });

  // находим объекты, созданные другими пользователями
  const othertUsersObjects = company?.objects?.filter((obj) => {
    const object = objectsList?.find((elem) => elem._id === obj.object);

    if (object === undefined) {
      return obj;
    } else {
      return null;
    }
  });

  // фильтруем контакты только текущего менеджера, исключаем контакты других пользователей
  const currentUserContacts = data.contacts?.filter((cont) => {
    const findedContact = contactsList.find(
      (elem) => elem._id === cont.contact
    );

    if (findedContact?.userId === currentUserId) {
      return true;
    }
    return false;
  });

  // фильтруем объекты только текущего менеджера, исключаем объекты других пользователей
  const currentUserObjects = data.objects?.filter((cont) => {
    const findedObject = objectsList.find((elem) => elem._id === cont.object);

    if (findedObject?.userId === currentUserId) {
      return true;
    }
    return false;
  });

  return {
    currentUserContacts,
    currentUserObjects,
    othertUsersContacts,
    othertUsersObjects,
    previousObjects,
    removedObjects,
    addedObjects,
    previousContacts,
    removedContacts,
    addedContacts
  };
};

export default useUpdateCompany;
