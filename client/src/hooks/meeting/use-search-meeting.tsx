import { useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const useSearchMeeting = ( meetings, data ) => {
  const searchedMeetings = useMemo(() => {
    let array = meetings;

    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }

    if (data.selectedUsers?.length) {
      array = array?.filter((obj) =>
        data.selectedUsers.includes(obj.userId)
      );
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

    return array;
  }, [data, meetings]);

  return searchedMeetings;
};

export default useSearchMeeting;
