import "dayjs/locale/ru";
import { useMemo } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getObjectsList } from "@store/object/objects.store";
import { getCompaniesList } from "@store/company/company.store";

const useSearchContact = (contacts, data) => {
  const objects = useSelector(getObjectsList());
  const companies = useSelector(getCompaniesList());

  const searchedContacts = useMemo(() => {
    let array = contacts;

    if (data?.name?.length) {
      array = array?.filter((user) =>
        user.name.toLowerCase().includes(data.name.toLowerCase())
      );
    }

    // Найти по адресу объекта
    if (data?.address?.length) {
      const findedObjects = objects?.filter((obj) =>
        obj?.address?.toLowerCase()?.includes(data?.address.toLowerCase())
      );
      const objectIds = findedObjects?.map((obj) => obj._id);

      const result = array?.filter((cont) =>
        cont.objects.some((obj) => objectIds?.includes(obj.object))
      );

      return result;
    }

    // Найти по телефону
    if (data.phone?.length) {
      const findedContacts = contacts?.filter((cont) => {
        const findedPhones = cont.phones?.filter((phone) =>
          phone?.phone.includes(String(data?.phone))
        );
        // Возвращаем true, если есть совпадения
        return findedPhones.length > 0;
      });

      return findedContacts;
    }

    // выбор по компании
    if (data?.company?.length) {
      const findedCompanies = companies?.filter((comp) => {
        const findedNames = comp.name
          ?.toLowerCase()
          .includes(data?.company.toLowerCase());
        // Возвращаем true, если есть совпадения
        return findedNames; // Возвращаем булево значение, а не длину массива
      });

      // Получаем массив идентификаторов контактов
      const companyIds = findedCompanies?.map((comp) => comp._id);

      // Возвращаем только те объекты из array, у которых в companies есть id контактов из contactIds
      const result = array?.filter((obj) =>
        obj.companies.some((company) => companyIds?.includes(company.company))
      );

      return result;
    }

    // Найти по почте
    if (data.email?.length) {
      const findedContacts = contacts?.filter((cont) => {
        const findedEmails = cont.emails?.filter((email) =>
          email?.email.includes(String(data?.email))
        );
        // Возвращаем true, если есть совпадения
        return findedEmails.length > 0;
      });

      return findedContacts;
    }

    // Выбор по позиции
    if (data.selectedPositions?.length) {
      array = array?.filter((cont) =>
        data.selectedPositions?.includes(cont?.position)
      );
    }

    // Добавлены от и до
    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      array = array?.filter((obj) => {
        const objDate = dayjs(obj.created_at);
        return objDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((obj) => dayjs(obj.created_at) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((obj) => dayjs(obj?.created_at) <= endDate);
    }

    return array;
  }, [data, contacts]);

  return searchedContacts;
};

export default useSearchContact;
