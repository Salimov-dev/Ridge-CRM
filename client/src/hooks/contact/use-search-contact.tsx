import "dayjs/locale/ru";
import { useMemo } from "react";
import dayjs from "dayjs";
import getStartWeekDate from "@utils/date/get-start-week-date";
import getEndWeekDate from "@utils/date/get-end-week-date";

const useSearchContact = (contacts, data) => {
  const startWeek = getStartWeekDate();
  const endWeek = getEndWeekDate();

  const searchedContacts = useMemo(() => {
    let array = contacts;

    // Найти по адресу объекта
    if (data?.result) {
      array = array?.filter((task) =>
        task?.result?.toLowerCase().includes(data?.result?.toLowerCase())
      );
    }

    // Найти по компании
    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }

    // Найти по почте
    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers.includes(obj.userId));
    }

    // Найти по телефону
    if (data.selectedTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedTypes.includes(obj.ContactType)
      );
    }

    // Выбор по позиции
    if (data.ContactsActivity === "534gfsdtgfd3245tgdgfd") {
      array = array?.filter((meet) => meet?.isDone !== true);
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
