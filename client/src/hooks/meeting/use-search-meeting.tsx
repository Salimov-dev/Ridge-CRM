import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useSelector } from "react-redux";
// interfaces
import { IMeeting } from "@interfaces/meeting/meeting.interface";
// store
import { getMeetingsList } from "@store/meeting/meetings.store";
// utils
import sortingByDateAndTime from "@utils/sort/sorting-by-date-and-time";

type IData = Record<string, string | string[] | null>;

interface IUseSearchMeeting {
  data: IData;
}

function isSearchQuery(searchQuery: string | string[]): searchQuery is string {
  if (typeof searchQuery === "string") {
    return true;
  } else if (Array.isArray(searchQuery)) {
    return true;
  } else {
    return false;
  }
}

const useSearchMeeting = ({ data }: IUseSearchMeeting) => {
  const meetings: IMeeting[] = useSelector(getMeetingsList());

  const searchedMeetings = useMemo(() => {
    let array = meetings;

    // НАЙТИ ПО РЕЗУЛЬТАТУ ВСТРЕЧИ
    if (data?.result) {
      const searchQuery = data.result;
      if (isSearchQuery(searchQuery)) {
        return (array = array?.filter((task) =>
          task?.result?.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      } else {
        return "";
      }
    }

    // ФИЛЬТРАЦИЯ ПО СТАТУСУ ВСТРЕЧИ
    if (data.selectedStatuses?.length) {
      const searchQuery = data.selectedStatuses;
      if (isSearchQuery(searchQuery)) {
        return (array = array?.filter((obj) =>
          searchQuery.includes(obj.status)
        ));
      } else {
        return [];
      }
    }

    // ФИЛЬТРАЦИЯ ПО МЕНЕДЖЕРУ, СОЗДАВШЕГО ВСТРЕЧУ
    if (data.selectedUsers?.length) {
      const searchQuery = data.selectedUsers;
      if (isSearchQuery(searchQuery)) {
        return (array = array?.filter((obj) =>
          searchQuery.includes(obj.userId)
        ));
      } else {
        return [];
      }
    }

    // ФИЛЬТРАЦИЯ ПО ТИПУ ВСТРЕЧИ
    if (data.selectedTypes?.length) {
      const searchQuery = data.selectedTypes;
      if (isSearchQuery(searchQuery)) {
        return (array = array?.filter((obj) => searchQuery.includes(obj.type)));
      } else {
        return [];
      }
    }

    // ФИЛЬТРАЦИЯ ПО ДАТЕ СОЗДАНИЯ ВСТРЕЧИ
    const startDate = dayjs(data.startDate as string);
    const endDate = dayjs(data.endDate as string).endOf("day");

    if (data.startDate && data.endDate) {
      array = array?.filter((meet) => {
        const meetCreatedDate = dayjs(meet.date);
        return (
          meetCreatedDate.isAfter(startDate) &&
          meetCreatedDate.isBefore(endDate)
        );
      });
    } else if (data.startDate) {
      array = array?.filter((meet) => dayjs(meet.date) >= startDate);
    } else if (data.endDate) {
      array = array?.filter((meet) => dayjs(meet?.date) <= endDate);
    }

    return array;
  }, [data, meetings]);

  const sortedMeetings = sortingByDateAndTime(searchedMeetings);

  return { searchedMeetings: sortedMeetings };
};

export default useSearchMeeting;
