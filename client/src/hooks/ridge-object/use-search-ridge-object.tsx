import "dayjs/locale/ru";
import { useMemo } from "react";
import dayjs from "dayjs";
import getStartWeekDate from "../../utils/date/get-start-week-date";
import getEndWeekDate from "../../utils/date/get-end-week-date";

const useSearchRidgeObject = (meetings, data) => {
  const startWeek = getStartWeekDate();
  const endWeek = getEndWeekDate();

  const searchedMeetings = useMemo(() => {
    let array = meetings;

    if (data?.comment?.length) {
      array = array?.filter((obj) =>
        obj.comment.toLowerCase().includes(data.comment.toLowerCase())
      );
    }

    if (data?.contacts?.length) {
      array = array?.filter((obj) =>
        obj?.findedContacts?.toLowerCase().includes(data?.contacts?.toLowerCase())
      );
    }

    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }

    if (data.selectedMetro?.length) {
      array = array?.filter((obj) =>
        data.selectedMetro.includes(obj.location.metro)
      );
    }

     // Фильтр для выбранных районов и городов
     if (data.selectedDistricts?.length) {
      array = array?.filter((obj) =>
        data.selectedDistricts.includes(obj.location.district)
      );

      // Обновляем список выбранных городов на основе отфильтрованных районов
      const filteredCities = data.selectedDistricts?.reduce(
        (cities, district) => {
          return cities.concat(
            array
              ?.filter((obj) => obj.location?.district === district)
              .map((obj) => obj.location?.city)
          );
        },
        []
      );

      // Фильтруем города исходя из списка отфильтрованных городов
      if (data.selectedCities?.length) {
        array = array?.filter((obj) =>
          filteredCities?.includes(obj.location.city)
        );
      } else {
        array = array?.filter((obj) =>
          data.selectedDistricts?.includes(obj.location.district)
        );
      }
    } else if (data.selectedCities?.length) {
      array = array?.filter((obj) =>
        data.selectedCities?.includes(obj.location?.city)
      );
    }

    // date and time pickers
    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((item) => {
        const itemDate = dayjs(item.date);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((item) => dayjs(item.date) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((item) => dayjs(item?.date) <= endDate);
    }

    // Все актуальные
    if (data.meetingsActivity === "534gfsdtgfd3245tgdgfd") {
      array = array?.filter((meet) => meet?.isDone !== true);
    }
    // Актуальные на этой неделе
    if (data.meetingsActivity === "8734qfdsggb2534tgfdfs") {
      array = array?.filter(
        (meet) =>
          dayjs(meet.date).isBetween(startWeek, endWeek) &&
          meet?.isDone !== true
      );
    }
    // Проведенные на этой неделе
    if (data.meetingsActivity === "987645erasg1243tgfdsg3") {
      array = array?.filter(
        (meet) =>
          meet?.isDone === true &&
          dayjs(meet.date).isBetween(startWeek, endWeek)
      );
    }
    // Проведенные за всё время
    if (data.meetingsActivity === "87634gsdf23gfds3425r43") {
      array = array?.filter((meet) => meet?.isDone === true);
    }

    return array;
  }, [data, meetings]);

  return searchedMeetings;
};

export default useSearchRidgeObject;
