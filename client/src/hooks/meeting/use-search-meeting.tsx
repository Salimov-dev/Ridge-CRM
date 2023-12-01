import "dayjs/locale/ru";
import { useMemo } from "react";
import dayjs from "dayjs";
import getStartWeekDate from "../../utils/date/get-start-week-date";
import getEndWeekDate from "../../utils/date/get-end-week-date";

const useSearchMeeting = (meetings, data) => {
  const startWeek = getStartWeekDate();
  const endWeek = getEndWeekDate();

  const searchedMeetings = useMemo(() => {
    let array = meetings;

    if (data?.result) {
      array = array?.filter((task) =>
        task?.result?.toLowerCase().includes(data?.result?.toLowerCase())
      );
    }

    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }

    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers.includes(obj.userId));
    }

    if (data.selectedTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedTypes.includes(obj.meetingType)
      );
    }

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

export default useSearchMeeting;
