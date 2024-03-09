import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useMemo } from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// store
import { getMeetingsList } from "@store/meeting/meetings.store";
import { getTasksList } from "@store/task/tasks.store";
import { getLastContactsList } from "@store/last-contact/last-contact.store";
import { getContactsList } from "@store/contact/contact.store";
import { getCompaniesList } from "@store/company/company.store";

const useSearchObject = (objects, data) => {
  const meetings = useSelector(getMeetingsList());
  const tasks = useSelector(getTasksList());
  const lastContacts = useSelector(getLastContactsList());
  const contacts = useSelector(getContactsList());
  const companies = useSelector(getCompaniesList());

  const hasMeetings = (objectId) => {
    const objectsWithMeetings = meetings.filter(
      (meet) => meet?.objectId === objectId
    );
    const hasMeeting = objectsWithMeetings.length > 0;

    return hasMeeting;
  };

  const hasTasks = (objectId) => {
    const objectsWithTasks = tasks.filter(
      (task) => task?.objectId === objectId
    );
    const hasTasks = objectsWithTasks.length > 0;

    return hasTasks;
  };

  const hasLastContact = (objectId) => {
    const objectsWithLastContact = lastContacts.filter(
      (contact) => contact?.objectId === objectId
    );
    const hasLastContact = objectsWithLastContact.length > 0;

    return hasLastContact;
  };

  const searchedObjects = useMemo(() => {
    let array = objects;

    // выбор по адресу
    if (data?.address?.length) {
      array = array?.filter((obj) =>
        obj?.address?.toLowerCase()?.includes(data?.address.toLowerCase())
      );
    }

    // выбор по телефону
    if (data?.phone?.length) {
      const findedContacts = contacts?.filter((cont) => {
        const findedPhones = cont.phones?.filter((phone) =>
          phone?.phone.includes(String(data?.phone))
        );
        // Возвращаем true, если есть совпадения
        return findedPhones.length > 0;
      });

      // Получаем массив идентификаторов контактов
      const contactIds = findedContacts?.map((cont) => cont._id);

      // Возвращаем только те объекты из array, у которых в contacts есть id контактов из contactIds
      const result = array?.filter((obj) =>
        obj.contacts.some((contact) => contactIds?.includes(contact.contact))
      );

      return result;
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

    // выбор по имени
    if (data?.name?.length) {
      const findedContacts = contacts?.filter((cont) => {
        const findedNames = cont.name
          ?.toLowerCase()
          .includes(data?.name.toLowerCase());
        // Возвращаем true, если есть совпадения
        return findedNames; // Возвращаем булево значение, а не длину массива
      });

      // Получаем массив идентификаторов контактов
      const contactIds = findedContacts?.map((cont) => cont._id);

      // Возвращаем только те объекты из array, у которых в contacts есть id контактов из contactIds
      const result = array?.filter((obj) =>
        obj.contacts.some((contact) => contactIds?.includes(contact.contact))
      );

      return result;
    }

    // выбор по кадастровому
    if (data?.cadastralNumber?.length) {
      array = array?.filter((obj) =>
        obj.cadastralNumber.includes(data.cadastralNumber)
      );
    }

    // выбор по описанию
    if (data?.fullDescription?.length) {
      const searchTerm = data.fullDescription.toLowerCase();
      array = array?.filter((obj) =>
        obj.fullDescription.toLowerCase().includes(searchTerm)
      );
    }

    // object params
    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }

    // выбор по станции метро
    if (data.selectedMetro?.length) {
      array = array?.filter((obj) =>
        data.selectedMetro.includes(obj.location.metro)
      );
    }

    // выбор по менеджеру
    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers?.includes(obj?.userId));
    }

    // Текущий арендатор
    if (data.selectedCurrentRenters?.length) {
      array = array?.filter((obj) =>
        data.selectedCurrentRenters?.includes(obj?.currentRenters)
      );
    }
    // Тип недвижимости
    if (data.selectedEstateTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedEstateTypes?.includes(obj?.estateTypes)
      );
    }
    // Тип объекта
    if (data.selectedObjectTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedObjectTypes?.includes(obj?.objectTypes)
      );
    }
    // Расположение объекта
    if (data.selectedObjectProperties?.length) {
      array = array?.filter((obj) =>
        data.selectedObjectProperties?.includes(
          obj?.objectProperties || "undefined"
        )
      );
    }
    // Тип торговой площади
    if (data.selectedTradeArea?.length) {
      array = array?.filter((obj) =>
        data.selectedTradeArea?.includes(obj?.tradeArea || "undefined")
      );
    }

    // Фильтр для выбранных районов и городов
    if (data.selectedDistricts?.length) {
      array = array?.filter((obj) =>
        data.selectedDistricts.includes(obj.district)
      );

      // Обновляем список выбранных городов на основе отфильтрованных районов
      const filteredCities = data.selectedDistricts?.reduce(
        (cities, district) => {
          return cities.concat(
            array
              ?.filter((obj) => obj.district === district)
              .map((obj) => obj.city)
          );
        },
        []
      );

      // Фильтруем города исходя из списка отфильтрованных городов
      if (data.selectedCities?.length) {
        array = array?.filter((obj) => filteredCities?.includes(obj.city));
      } else {
        array = array?.filter((obj) =>
          data.selectedDistricts?.includes(obj.district)
        );
      }
    } else if (data.selectedCities?.length) {
      array = array?.filter((obj) => data.selectedCities?.includes(obj.city));
    }

    // выбор по времени добавления
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

    // c номером телефона
    if (data.objectActivity === "534gdfsg2356hgd213mnbv") {
      array = array?.filter((obj) => obj?.phone);
    }
    // без номера телефона
    if (data.objectActivity === "976hd324gfdsg324534543") {
      array = array?.filter((obj) => !obj?.phone);
    }
    // с задачами
    if (data.objectActivity === "gf87634gdsfgsdf345tgdf") {
      array = array?.filter((obj) => hasTasks(obj._id));
    }
    // без задач
    if (data.objectActivity === "93254435gdf354yrt54hgh") {
      array = array?.filter((obj) => !hasTasks(obj._id));
    }
    // со встречами
    if (data.objectActivity === "7653gfdsgsd23fgdsgdfg") {
      array = array?.filter((obj) => hasMeetings(obj._id));
    }
    // без встреч
    if (data.objectActivity === "95459gdj239t54jgh95445") {
      array = array?.filter((obj) => !hasMeetings(obj._id));
    }
    // с последним звонком
    if (data.objectActivity === "765gdf2345ytrhgfd2354") {
      array = array?.filter((obj) => hasLastContact(obj._id));
    }
    // без последнего звонка
    if (data.objectActivity === "5149gjgnvmzofhwey45568") {
      array = array?.filter((obj) => !hasLastContact(obj._id));
    }
    // без активности
    if (data.objectActivity === "hgfd235654hjf324543qre") {
      array = array?.filter(
        (obj) => !hasMeetings(obj._id) && !hasTasks(obj._id)
      );
    }
    // дублирующиеся адреса
    if (data.objectActivity === "01df84jgfdh2349gj39999") {
      const countList = array?.reduce(function (p, c) {
        const fullAddress = `${c.city}, ${c.address}`;
        p[fullAddress] = (p[fullAddress] || 0) + 1;
        return p;
      }, {});

      const result = array?.filter(function (obj) {
        const fullAddress = `${obj.city}, ${obj.address}`;
        return countList[fullAddress] > 1;
      });

      return result;
    }

    // Фильтр для "Звонок от 1 до 2 месяцев"
    if (data.objectActivity === "hgfd23560ogpa213jfdj3432") {
      const currentDate = dayjs();
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const lastContactsList = lastContacts?.filter(
          (contact) => contact.objectId === objectId
        );
        const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
        const lastContact = sortedLastContacts[0]?.date;

        if (!lastContact) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastContactDate = dayjs(lastContact);

        return lastContactDate.isBetween(
          currentDate.subtract(2, "months"),
          currentDate.subtract(1, "months")
        );
      });
    }

    // Фильтр для "Звонок от 2 до 3 месяцев"
    if (data.objectActivity === "hgfd23560ogpa213jfdj3511") {
      const currentDate = dayjs();
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const lastContactsList = lastContacts?.filter(
          (contact) => contact.objectId === objectId
        );
        const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
        const lastContact = sortedLastContacts[0]?.date;

        if (!lastContact) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastContactDate = dayjs(lastContact);

        return lastContactDate.isBetween(
          currentDate.subtract(3, "months"),
          currentDate.subtract(2, "months")
        );
      });
    }

    // Фильтр для "Звонок от 3 месяцев"
    if (data.objectActivity === "hgfd23560ogpa213jfdj0934") {
      const currentDate = dayjs();
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const lastContactsList = lastContacts?.filter(
          (contact) => contact.objectId === objectId
        );
        const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
        const lastContact = sortedLastContacts[0]?.date;

        if (!lastContact) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastContactDate = dayjs(lastContact);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 3 месяцев
        return lastContactDate.isBefore(currentDate.subtract(3, "months"));
      });
    }

    return array;
  }, [data, objects]);

  return searchedObjects;
};

export default useSearchObject;
