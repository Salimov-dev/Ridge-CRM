import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "dayjs/locale/ru";
import { getLastContactsList } from "../../store/last-contact/last-contact.store";

const useSearchObjectDatabase = (objects, data, period) => {
  const currentDate = dayjs();
  const lastContacts = useSelector(getLastContactsList());

  const searchedObjects = useMemo(() => {
    let array = objects;

    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers.includes(obj.userId));
    }

    // Фильтр для "Звонок от 1 до 2 месяцев"
    if (period === "fromOneMonthToTwo") {
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
    if (period === "fromTwoMonthToThree") {
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
    if (period === "fromThreeMonthAndMore") {
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

export default useSearchObjectDatabase;
